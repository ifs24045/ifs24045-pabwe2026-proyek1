import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const TambahMatakuliah = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    kode: "",
    sks: "",
    nilai: "",
    semester: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/matakuliah", form);
      navigate("/matakuliah");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambahkan mata kuliah");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="app-container">
      <nav className="app-nav">
        <h1>NilaiKu</h1>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/matakuliah">Mata Kuliah</Link>
          <Link to="/profil">Profil</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="app-main">
        <div className="section-header">
          <h2>Tambah Mata Kuliah</h2>
          <Link to="/matakuliah" className="btn-secondary">
            Kembali
          </Link>
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="nama">Nama Mata Kuliah</label>
            <input
              id="nama"
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Contoh: Pemrograman Web"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="kode">Kode Mata Kuliah</label>
            <input
              id="kode"
              type="text"
              name="kode"
              value={form.kode}
              onChange={handleChange}
              placeholder="Contoh: IF301"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sks">SKS</label>
            <input
              id="sks"
              type="number"
              name="sks"
              value={form.sks}
              onChange={handleChange}
              placeholder="Contoh: 3"
              min="1"
              max="6"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nilai">Nilai (Opsional)</label>
            <select id="nilai" name="nilai" value={form.nilai} onChange={handleChange}>
              <option value="">Belum ada nilai</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="semester">Semester</label>
            <select id="semester" name="semester" value={form.semester} onChange={handleChange} required>
              <option value="">Pilih Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default TambahMatakuliah;