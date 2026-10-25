import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import api from "../utils/api";
import Profil from "./Profil";
import { renderWithProviders, loginAs } from "../test-utils";

vi.mock("../utils/api", () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const tampilkan = () =>
  renderWithProviders(
    <Routes>
      <Route path="/profil" element={<Profil />} />
      <Route path="/auth/login" element={<div>Halaman Login</div>} />
    </Routes>,
    { route: "/profil" }
  );

describe("Profil", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    loginAs();
  });

  it("menampilkan username dan mengisi nama dari server", async () => {
    api.get.mockResolvedValue({ data: { data: { nama: "Thimoty" } } });
    tampilkan();

    expect(await screen.findByDisplayValue("Thimoty")).toBeInTheDocument();
    expect(screen.getByText(/ifs24045/)).toBeInTheDocument();
    expect(screen.getByLabelText("Password Baru (Opsional)")).toHaveValue("");
  });

  it("tetap menampilkan form jika pengambilan profil gagal", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    api.get.mockRejectedValue(new Error("gagal"));
    tampilkan();

    expect(await screen.findByLabelText("Nama Lengkap")).toHaveValue("");
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("menyimpan perubahan profil", async () => {
    api.get.mockResolvedValue({ data: { data: { nama: "Thimoty" } } });
    api.put.mockResolvedValue({ data: {} });
    tampilkan();

    fireEvent.change(await screen.findByLabelText("Nama Lengkap"), {
      target: { value: "Thimoty G. Sianipar" },
    });
    fireEvent.change(screen.getByLabelText("Password Baru (Opsional)"), {
      target: { value: "passwordbaru" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Update Profil" }).closest("form")
    );

    expect(await screen.findByText("Profil berhasil diupdate!")).toBeInTheDocument();
    expect(api.put).toHaveBeenCalledWith("/api/profil", {
      nama: "Thimoty G. Sianipar",
      password: "passwordbaru",
    });
  });

  it("menampilkan pesan error dari server", async () => {
    api.get.mockResolvedValue({ data: { data: { nama: "Thimoty" } } });
    api.put.mockRejectedValue({
      response: { data: { message: "Nama tidak valid" } },
    });
    tampilkan();

    await screen.findByDisplayValue("Thimoty");
    fireEvent.submit(
      screen.getByRole("button", { name: "Update Profil" }).closest("form")
    );

    expect(await screen.findByText("Nama tidak valid")).toBeInTheDocument();
  });

  it("menampilkan pesan default jika server tidak merespons", async () => {
    api.get.mockResolvedValue({ data: { data: { nama: "Thimoty" } } });
    api.put.mockRejectedValue(new Error("Network Error"));
    tampilkan();

    await screen.findByDisplayValue("Thimoty");
    fireEvent.submit(
      screen.getByRole("button", { name: "Update Profil" }).closest("form")
    );

    expect(await screen.findByText("Gagal mengupdate profil")).toBeInTheDocument();
  });

  it("logout membuka halaman login", async () => {
    api.get.mockResolvedValue({ data: { data: { nama: "Thimoty" } } });
    tampilkan();

    fireEvent.click(await screen.findByRole("button", { name: "Logout" }));

    expect(await screen.findByText("Halaman Login")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBeNull();
  });
});