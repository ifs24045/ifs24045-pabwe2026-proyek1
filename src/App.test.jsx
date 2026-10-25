import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import api from "./utils/api";
import App from "./App";
import { loginAs } from "./test-utils";

vi.mock("./utils/api", () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const buka = (path) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

describe("App routing", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    api.get.mockResolvedValue({ data: { ipk: 0, total_sks: 0, data: [] } });
  });

  it("menampilkan halaman landing di path /", () => {
    buka("/");
    expect(
      screen.getByText("Kelola Nilai & IPK Kamu dengan Mudah")
    ).toBeInTheDocument();
  });

  it("mengalihkan path tidak dikenal ke landing", async () => {
    buka("/halaman-tidak-ada");
    expect(
      await screen.findByText("Kelola Nilai & IPK Kamu dengan Mudah")
    ).toBeInTheDocument();
  });

  it("mengalihkan /dashboard ke login jika belum login", async () => {
    buka("/dashboard");
    expect(
      await screen.findByRole("heading", { name: "Login" })
    ).toBeInTheDocument();
  });

  it("mengalihkan /auth/login ke dashboard jika sudah login", async () => {
    loginAs();
    buka("/auth/login");
    expect(await screen.findByText("Mata Kuliah Terbaru")).toBeInTheDocument();
  });

  it("menampilkan halaman register jika belum login", async () => {
    buka("/auth/register");
    expect(
      await screen.findByRole("button", { name: "Daftar" })
    ).toBeInTheDocument();
  });
});