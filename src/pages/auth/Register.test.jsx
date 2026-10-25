import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import api from "../../utils/api";
import Register from "./Register";
import { renderWithProviders } from "../../test-utils";

vi.mock("../../utils/api", () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const tampilkan = () =>
  renderWithProviders(
    <Routes>
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<div>Halaman Login</div>} />
    </Routes>,
    { route: "/auth/register" }
  );

const isiDanKirim = () => {
  fireEvent.change(screen.getByLabelText("Nama Lengkap"), {
    target: { value: "Budi Santoso" },
  });
  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: "budi" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "rahasia" },
  });
  fireEvent.submit(screen.getByRole("button", { name: "Daftar" }).closest("form"));
};

describe("Register", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("menampilkan form registrasi", () => {
    tampilkan();
    expect(screen.getByRole("heading", { name: "Daftar" })).toBeInTheDocument();
    expect(screen.getByLabelText("Nama Lengkap")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "/auth/login"
    );
  });

  it("registrasi berhasil mengarahkan ke halaman login", async () => {
    api.post.mockResolvedValue({ data: { message: "Registrasi berhasil" } });
    tampilkan();
    isiDanKirim();

    expect(await screen.findByText("Halaman Login")).toBeInTheDocument();
    expect(api.post).toHaveBeenCalledWith("/api/auth/register", {
      nama: "Budi Santoso",
      username: "budi",
      password: "rahasia",
    });
  });

  it("menampilkan pesan error dari server", async () => {
    api.post.mockRejectedValue({
      response: { data: { message: "Username sudah digunakan" } },
    });
    tampilkan();
    isiDanKirim();

    expect(
      await screen.findByText("Username sudah digunakan")
    ).toBeInTheDocument();
  });

  it("menampilkan pesan default jika server tidak merespons", async () => {
    api.post.mockRejectedValue(new Error("Network Error"));
    tampilkan();
    isiDanKirim();

    expect(await screen.findByText("Registrasi gagal")).toBeInTheDocument();
  });
});