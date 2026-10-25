import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../components/AppLayout";
import api from "../utils/api";

const Profil = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ nama: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = async () => {
    try {
      const res = await api.get("/api/profil");
      setForm({ nama: res.data.data.nama, password: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.put("/api/profil", form);
      setSuccess("Profil berhasil diupdate!");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengupdate profil");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="loading">
        <h1>Memuat...</h1>
      </main>
    );
  }

  return (
    <AppLayout>
      <h2>Profil Saya</h2>

      <div className="profil-info">
        <p>
          <strong>Username:</strong> {user?.username}
        </p>
      </div>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="success" role="status">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="nama">Nama Lengkap</label>
          <input
            id="nama"
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            autoComplete="name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password Baru (Opsional)</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Kosongkan jika tidak ingin mengubah"
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
           Update Profil
        </button>
      </form>
    </AppLayout>
  );
};

export default Profil;