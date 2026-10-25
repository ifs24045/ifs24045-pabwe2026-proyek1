import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import Landing from "./Landing";
import { renderWithProviders } from "../test-utils";

describe("Landing", () => {
  it("menampilkan judul dan deskripsi aplikasi", () => {
    renderWithProviders(<Landing />);
    expect(
      screen.getByText("Kelola Nilai & IPK Kamu dengan Mudah")
    ).toBeInTheDocument();
    expect(screen.getByText("📚 Catat Nilai")).toBeInTheDocument();
    expect(screen.getByText("📊 Hitung IPK")).toBeInTheDocument();
    expect(screen.getByText("📈 Pantau Progress")).toBeInTheDocument();
  });

  it("memiliki tautan ke halaman login dan register", () => {
    renderWithProviders(<Landing />);
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "/auth/login"
    );
    const tautanDaftar = screen.getAllByRole("link", { name: "Daftar" });
    expect(tautanDaftar[0]).toHaveAttribute("href", "/auth/register");
    expect(
      screen.getByRole("link", { name: "Mulai Sekarang" })
    ).toHaveAttribute("href", "/auth/register");
  });

  it("menampilkan footer", () => {
    renderWithProviders(<Landing />);
    expect(screen.getByText(/2026 NilaiKu/)).toBeInTheDocument();
  });
});