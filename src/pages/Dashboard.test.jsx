import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import api from "../utils/api";
import Dashboard from "./Dashboard";
import { renderWithProviders, loginAs } from "../test-utils";

vi.mock("../utils/api", () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const daftarMk = [
  { id: 1, nama: "Pemrograman Web", kode: "IF301", sks: 3, nilai: "A", semester: 5 },
  { id: 2, nama: "Basis Data", kode: "IF302", sks: 3, nilai: null, semester: 4 },
];

const mockApi = (mk = daftarMk) => {
  api.get.mockImplementation((url) =>
    url === "/api/matakuliah/ipk"
      ? Promise.resolve({ data: { ipk: 3.5, total_sks: 6 } })
      : Promise.resolve({ data: { data: mk } })
  );
};

const tampilkan = () =>
  renderWithProviders(
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/auth/login" element={<div>Halaman Login</div>} />
    </Routes>,
    { route: "/dashboard" }
  );

describe("Dashboard", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    loginAs();
  });

  it("menampilkan sapaan, statistik, dan daftar mata kuliah", async () => {
    mockApi();
    tampilkan();

    expect(await screen.findByText("Pemrograman Web")).toBeInTheDocument();
    expect(await screen.findByText("Selamat datang, Thimoty!")).toBeInTheDocument();
    expect(screen.getByText("3.5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Basis Data")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("hanya menampilkan 5 mata kuliah terbaru", async () => {
    const banyak = Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      nama: `Mata Kuliah ${i + 1}`,
      kode: `IF${i + 1}`,
      sks: 3,
      nilai: "B",
      semester: 1,
    }));
    mockApi(banyak);
    tampilkan();

    expect(await screen.findByText("Mata Kuliah 1")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(6);
  });

  it("menampilkan pesan kosong jika belum ada mata kuliah", async () => {
    mockApi([]);
    tampilkan();

    expect(
      await screen.findByText("Belum ada mata kuliah. Tambahkan sekarang!")
    ).toBeInTheDocument();
  });

  it("tetap menampilkan halaman jika pengambilan data gagal", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    api.get.mockRejectedValue(new Error("gagal"));
    tampilkan();

    expect(
      await screen.findByText("Belum ada mata kuliah. Tambahkan sekarang!")
    ).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("logout menghapus sesi dan membuka halaman login", async () => {
    mockApi();
    tampilkan();

    fireEvent.click(await screen.findByRole("button", { name: "Logout" }));

    expect(await screen.findByText("Halaman Login")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBeNull();
  });
});