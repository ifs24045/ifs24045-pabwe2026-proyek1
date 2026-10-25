import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

export const renderWithProviders = (ui, { route = "/" } = {}) =>
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthProvider>
  );

export const loginAs = (user = { username: "ifs24045", nama: "Thimoty" }) => {
  localStorage.setItem("token", "token-uji");
  localStorage.setItem("user", JSON.stringify(user));
};