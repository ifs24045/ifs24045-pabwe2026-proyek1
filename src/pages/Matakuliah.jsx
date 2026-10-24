import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Matakuliah = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [matakuliah, setMatakuliah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSemester, setFilterSemester] = useState("");

  useEffect(() => {
    fetchMatakuliah();
  }, [filterSemester]);

  const fetchMatakuliah = async () => {
    try {
      const res = await api.get(
        filterSemester ? `/api/matakuliah?semester=${filterSemester}` : "/api/matakuliah"
      );
      setMatakuliah(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus mata kuliah ini?")) return;
    try {
      await api.delete(`/api/matakuliah/${id}`);
      fetchMatakuliah();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  if (loading) return <main className="loading"><h1>Memuat...</h1></main>;

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
          <h2>Mata Kuliah</h2>
          <Link to="/matakuliah/tambah" className="btn-primary">
            + Tambah
          </Link>
        </div>

        <div className="filter-container">
          <label htmlFor="semester">Filter Semester:</label>
          <select
            id="semester"
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
          >
            <option value="">Semua Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>
        </div>

        {matakuliah.length === 0 ? (
          <p className="empty-state">Belum ada mata kuliah.</p>
        ) : (
          <table className="mk-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kode</th>
                <th>SKS</th>
                <th>Nilai</th>
                <th>Semester</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {matakuliah.map((mk) => (
                <tr key={mk.id}>
                  <td>{mk.nama}</td>
                  <td>{mk.kode}</td>
                  <td>{mk.sks}</td>
                  <td>{mk.nilai || "-"}</td>
                  <td>{mk.semester}</td>
                  <td>
                    <Link to={`/matakuliah/edit/${mk.id}`} className="btn-edit">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(mk.id)}
                      className="btn-delete"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Matakuliah;