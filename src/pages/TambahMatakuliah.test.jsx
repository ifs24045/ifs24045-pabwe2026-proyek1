import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import api from "../utils/api";
import TambahMatakuliah from "./TambahMatakuliah";
import { renderWithProviders, loginAs } from "../test-utils";

vi.mock("../utils/api", () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const tampilkan = () =>
  renderWithProviders(
    <Routes>
      <Route path="/matakuliah/tambah" element={<TambahMatakuliah />} />
      <Route path="/matakuliah" element={<div>Halaman Daftar</div>} />
      <Route path="/auth/login" element={<div>Halaman Login</div>} />
    </Routes>,
    { route: "/matakuliah/tambah" }
  );

const isiDanKirim = () => {
  fireEvent.change(screen.getByLabelText("Nama Mata Kuliah"), {
    target: { value: "Pemrograman Web" },
  });
  fireEvent.change(screen.getByLabelText("Kode Mata Kuliah"), {
    target: { value: "IF301" },
  });
  fireEvent.change(screen.getByLabelText("SKS"), { target: { value: "3" } });
  fireEvent.change(screen.getByLabelText("Nilai (Opsional)"), {
    target: { value: "A" },
  });
  fireEvent.change(screen.getByLabelText("Semester"), {
    target: { value: "5" },
  });
  fireEvent.submit(screen.getByRole("button", { name: "Simpan" }).closest("form"));
};

describe("TambahMatakuliah", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    loginAs();
  });

  it("menampilkan form tambah mata kuliah", () => {
    tampilkan();
    expect(
      screen.getByRole("heading", { name: "Tambah Mata Kuliah" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nama Mata Kuliah")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Kembali" })).toHaveAttribute(
      "href",
      "/matakuliah"
    );
  });

  it("menyimpan mata kuliah dan kembali ke daftar", async () => {
    api.post.mockResolvedValue({ data: {} });
    tampilkan();
    isiDanKirim();

    expect(await screen.findByText("Halaman Daftar")).toBeInTheDocument();
    expect(api.post).toHaveBeenCalledWith("/api/matakuliah", {
      nama: "Pemrograman Web",
      kode: "IF301",
      sks: "3",
      nilai: "A",
      semester: "5",
    });
  });

  it("menampilkan pesan error dari server", async () => {
    api.post.mockRejectedValue({
      response: { data: { message: "Kode sudah ada" } },
    });
    tampilkan();
    isiDanKirim();

    expect(await screen.findByText("Kode sudah ada")).toBeInTheDocument();
  });

  it("menampilkan pesan default jika server tidak merespons", async () => {
    api.post.mockRejectedValue(new Error("Network Error"));
    tampilkan();
    isiDanKirim();

    expect(
      await screen.findByText("Gagal menambahkan mata kuliah")
    ).toBeInTheDocument();
  });

  it("logout membuka halaman login", async () => {
    tampilkan();
    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(await screen.findByText("Halaman Login")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBeNull();
  });
});