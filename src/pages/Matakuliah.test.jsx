import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import api from "../utils/api";
import Matakuliah from "./Matakuliah";
import { renderWithProviders, loginAs } from "../test-utils";

vi.mock("../utils/api", () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const daftarMk = [
  { id: 1, nama: "Pemrograman Web", kode: "IF301", sks: 3, nilai: "A", semester: 5 },
  { id: 2, nama: "Basis Data", kode: "IF302", sks: 3, nilai: null, semester: 4 },
];

const tampilkan = () =>
  renderWithProviders(
    <Routes>
      <Route path="/matakuliah" element={<Matakuliah />} />
      <Route path="/auth/login" element={<div>Halaman Login</div>} />
    </Routes>,
    { route: "/matakuliah" }
  );

describe("Matakuliah", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    loginAs();
  });

  it("menampilkan daftar mata kuliah", async () => {
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    tampilkan();

    expect(await screen.findByText("Pemrograman Web")).toBeInTheDocument();
    expect(screen.getByText("IF302")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Edit" })[0]).toHaveAttribute(
      "href",
      "/matakuliah/edit/1"
    );
  });

  it("menampilkan pesan kosong jika belum ada data", async () => {
    api.get.mockResolvedValue({ data: { data: [] } });
    tampilkan();

    expect(
      await screen.findByText("Belum ada mata kuliah.")
    ).toBeInTheDocument();
  });

  it("tetap menampilkan halaman jika pengambilan data gagal", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    api.get.mockRejectedValue(new Error("gagal"));
    tampilkan();

    expect(
      await screen.findByText("Belum ada mata kuliah.")
    ).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("memfilter berdasarkan semester", async () => {
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    tampilkan();

    fireEvent.change(await screen.findByLabelText("Filter Semester:"), {
      target: { value: "2" },
    });

    await waitFor(() =>
      expect(api.get).toHaveBeenCalledWith("/api/matakuliah?semester=2")
    );
  });

  it("menghapus mata kuliah setelah dikonfirmasi", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    api.delete.mockResolvedValue({});
    tampilkan();

    fireEvent.click((await screen.findAllByRole("button", { name: "Hapus" }))[0]);

    await waitFor(() =>
      expect(api.delete).toHaveBeenCalledWith("/api/matakuliah/1")
    );
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2));
  });

  it("tidak menghapus jika konfirmasi dibatalkan", async () => {
    vi.stubGlobal("confirm", vi.fn(() => false));
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    tampilkan();

    fireEvent.click((await screen.findAllByRole("button", { name: "Hapus" }))[0]);

    expect(api.delete).not.toHaveBeenCalled();
  });

  it("menangani kegagalan saat menghapus", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("confirm", vi.fn(() => true));
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    api.delete.mockRejectedValue(new Error("gagal hapus"));
    tampilkan();

    fireEvent.click((await screen.findAllByRole("button", { name: "Hapus" }))[0]);

    await waitFor(() => expect(spy).toHaveBeenCalled());
    spy.mockRestore();
  });

  it("logout membuka halaman login", async () => {
    api.get.mockResolvedValue({ data: { data: daftarMk } });
    tampilkan();

    fireEvent.click(await screen.findByRole("button", { name: "Logout" }));

    expect(await screen.findByText("Halaman Login")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBeNull();
  });
});