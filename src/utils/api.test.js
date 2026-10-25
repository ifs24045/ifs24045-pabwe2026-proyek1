import { describe, it, expect } from "vitest";
import api from "./api";

const jalankanInterceptor = (config) =>
  api.interceptors.request.handlers[0].fulfilled(config);

describe("api (axios instance)", () => {
  it("memiliki baseURL", () => {
    expect(api.defaults.baseURL).toBeTruthy();
  });

  it("menambahkan header Authorization jika token tersimpan", () => {
    localStorage.setItem("token", "abc123");
    const hasil = jalankanInterceptor({ headers: {} });
    expect(hasil.headers.Authorization).toBe("Bearer abc123");
  });

  it("tidak menambahkan header Authorization jika token kosong", () => {
    const hasil = jalankanInterceptor({ headers: {} });
    expect(hasil.headers.Authorization).toBeUndefined();
  });
});