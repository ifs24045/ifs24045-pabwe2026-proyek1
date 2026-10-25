import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "", nama: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/auth/register", form);
      navigate("/auth/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-box">
        <h1>NilaiKu</h1>
        <h2>Daftar</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nama">Nama Lengkap</label>
            <input
              id="nama"
              type="text"
              name="nama"
              autoComplete="name"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              required
            />
          </div>
          <button id="btn-submit" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Daftar"}
          </button>
        </form>
        <p>Sudah punya akun? <Link to="/auth/login">Login</Link></p>
      </div>
    </main>
  );
};

export default Register;