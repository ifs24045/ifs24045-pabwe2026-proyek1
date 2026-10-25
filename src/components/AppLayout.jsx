import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="app-layout">
      <nav className="navbar">
        <Link to="/dashboard" className="nav-brand">
          🎓 AkademiQ
        </Link>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/matakuliah">Mata Kuliah</Link>
          <Link to="/profil">Profil</Link>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default AppLayout;