import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import api from "../utils/api";
import EditMatakuliah from "./EditMatakuliah";
import { renderWithProviders, loginAs } from "../test-utils";

vi.mock("../utils/api", () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const daftarMk = [
  { id: 1, nama: "Pemrograman Web", kode: "IF301", sks: 3, nilai: "A", semester: 5 },
  { id: 2, nama: "Basis Data", kode: "IF302", sks: 3, nilai: null, semester: 4 },
];

const tampilkan = (id = 1) =>
  renderWithProviders(
    <Routes>
      <Route path="/matakuliah/edit/:id" element={<EditMatakuliah />} />
      <Route path="/matakuliah" element={<div>Halaman Daftar</div>} />
      <Route path="/auth/login" element={<div>Halaman Login</div>} />
    </Routes>,
    { route: `/matakuliah/edit/${id}` }
  );

describe("EditMatakuliah", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    loginAs();
  });

  it("mengisi form dengan data mata kuliah yang dipilih", async () => {
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    tampilkan(1);

    expect(await screen.findByDisplayValue("Pemrograman Web")).toBeInTheDocument();
    expect(screen.getByLabelText("Kode Mata Kuliah")).toHaveValue("IF301");
    expect(screen.getByLabelText("SKS")).toHaveValue(3);
    expect(screen.getByLabelText("Nilai (Opsional)")).toHaveValue("A");
    expect(screen.getByLabelText("Semester")).toHaveValue("5");
  });

  it("mengosongkan nilai jika mata kuliah belum bernilai", async () => {
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    tampilkan(2);

    expect(await screen.findByDisplayValue("Basis Data")).toBeInTheDocument();
    expect(screen.getByLabelText("Nilai (Opsional)")).toHaveValue("");
  });

  it("menampilkan form kosong jika id tidak ditemukan", async () => {
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    tampilkan(99);

    expect(await screen.findByLabelText("Nama Mata Kuliah")).toHaveValue("");
  });

  it("tetap menampilkan form jika pengambilan data gagal", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    api.get.mockRejectedValue(new Error("gagal"));
    tampilkan(1);

    expect(await screen.findByLabelText("Nama Mata Kuliah")).toHaveValue("");
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("menyimpan perubahan dan kembali ke daftar", async () => {
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    api.put.mockResolvedValue({ data: {} });
    tampilkan(1);

    fireEvent.change(await screen.findByLabelText("Nama Mata Kuliah"), {
      target: { value: "Pemrograman Web Lanjut" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Update" }).closest("form"));

    expect(await screen.findByText("Halaman Daftar")).toBeInTheDocument();
    expect(api.put).toHaveBeenCalledWith(
      "/api/matakuliah/1",
      expect.objectContaining({ nama: "Pemrograman Web Lanjut", kode: "IF301" })
    );
  });

  it("menampilkan pesan error dari server saat update gagal", async () => {
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    api.put.mockRejectedValue({
      response: { data: { message: "Data tidak valid" } },
    });
    tampilkan(1);

    await screen.findByDisplayValue("Pemrograman Web");
    fireEvent.submit(screen.getByRole("button", { name: "Update" }).closest("form"));

    expect(await screen.findByText("Data tidak valid")).toBeInTheDocument();
  });

  it("menampilkan pesan default jika server tidak merespons", async () => {
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    api.put.mockRejectedValue(new Error("Network Error"));
    tampilkan(1);

    await screen.findByDisplayValue("Pemrograman Web");
    fireEvent.submit(screen.getByRole("button", { name: "Update" }).closest("form"));

    expect(
      await screen.findByText("Gagal mengupdate mata kuliah")
    ).toBeInTheDocument();
  });

  it("logout membuka halaman login", async () => {
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    tampilkan(1);

    fireEvent.click(await screen.findByRole("button", { name: "Logout" }));

    expect(await screen.findByText("Halaman Login")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBeNull();
  });
});