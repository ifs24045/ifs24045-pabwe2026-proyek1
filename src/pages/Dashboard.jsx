import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [ipk, setIpk] = useState(0);
  const [totalSks, setTotalSks] = useState(0);
  const [matakuliah, setMatakuliah] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ipkRes, mkRes] = await Promise.all([
        api.get("/api/matakuliah/ipk"),
        api.get("/api/matakuliah"),
      ]);
      setIpk(ipkRes.data.ipk);
      setTotalSks(ipkRes.data.total_sks);
      setMatakuliah(mkRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        <h2>Selamat datang, {user?.nama}!</h2>

        <div className="stats-container">
          <div className="stat-card">
            <h3>IPK</h3>
            <p className="stat-value">{ipk}</p>
          </div>
          <div className="stat-card">
            <h3>Total SKS</h3>
            <p className="stat-value">{totalSks}</p>
          </div>
          <div className="stat-card">
            <h3>Total Mata Kuliah</h3>
            <p className="stat-value">{matakuliah.length}</p>
          </div>
        </div>

        <div className="recent-section">
          <div className="section-header">
            <h3>Mata Kuliah Terbaru</h3>
            <Link to="/matakuliah/tambah" className="btn-primary">
              + Tambah
            </Link>
          </div>
          {matakuliah.length === 0 ? (
            <p className="empty-state">Belum ada mata kuliah. Tambahkan sekarang!</p>
          ) : (
            <table className="mk-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Kode</th>
                  <th>SKS</th>
                  <th>Nilai</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {matakuliah.slice(0, 5).map((mk) => (
                  <tr key={mk.id}>
                    <td>{mk.nama}</td>
                    <td>{mk.kode}</td>
                    <td>{mk.sks}</td>
                    <td>{mk.nilai || "-"}</td>
                    <td>{mk.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;