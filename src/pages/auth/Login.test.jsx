import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import api from "../../utils/api";
import Login from "./Login";
import { renderWithProviders } from "../../test-utils";

vi.mock("../../utils/api", () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const tampilkan = () =>
  renderWithProviders(
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<div>Halaman Register</div>} />
      <Route path="/dashboard" element={<div>Halaman Dashboard</div>} />
    </Routes>,
    { route: "/auth/login" }
  );

const isiDanKirim = (username, password) => {
  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: username },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: password },
  });
  fireEvent.submit(screen.getByRole("button", { name: "Login" }).closest("form"));
};

describe("Login", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("menampilkan form login", () => {
    tampilkan();
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Daftar" })).toHaveAttribute(
      "href",
      "/auth/register"
    );
  });

  it("login berhasil menyimpan sesi dan membuka dashboard", async () => {
    api.post.mockResolvedValue({
      data: { user: { username: "budi", nama: "Budi" }, token: "token-baru" },
    });
    tampilkan();
    isiDanKirim("budi", "rahasia");

    expect(await screen.findByText("Halaman Dashboard")).toBeInTheDocument();
    expect(api.post).toHaveBeenCalledWith("/api/auth/login", {
      username: "budi",
      password: "rahasia",
    });
    expect(localStorage.getItem("token")).toBe("token-baru");
  });

  it("menampilkan pesan error dari server saat login gagal", async () => {
    api.post.mockRejectedValue({
      response: { data: { message: "Username atau password salah" } },
    });
    tampilkan();
    isiDanKirim("budi", "salah");

    expect(
      await screen.findByText("Username atau password salah")
    ).toBeInTheDocument();
  });

  it("menampilkan pesan default jika server tidak merespons", async () => {
    api.post.mockRejectedValue(new Error("Network Error"));
    tampilkan();
    isiDanKirim("budi", "salah");

    expect(await screen.findByText("Login gagal")).toBeInTheDocument();
  });
});