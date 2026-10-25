import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../components/AppLayout";
import NilaiBadge from "../components/NilaiBadge";
import api from "../utils/api";

const Dashboard = () => {
  const { user } = useAuth();
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

  if (loading) {
    return (
      <main className="loading">
        <h1>Memuat...</h1>
      </main>
    );
  }

  const persenIpk = Math.min(100, (Number(ipk) / 4) * 100);

  return (
    <AppLayout>
      <h2>Selamat datang, {user?.nama}!</h2>

      <div className="stats-container">
        <div className="stat-card">
          <h3>IPK</h3>
          <p className="stat-value">{ipk}</p>
          <div className="ipk-bar" aria-hidden="true">
            <span style={{ width: `${persenIpk}%` }} />
          </div>
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
          <section
            className="table-wrap"
            aria-label="Mata kuliah terbaru"
          >
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
                    <td>
                      <NilaiBadge nilai={mk.nilai} />
                    </td>
                    <td>{mk.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;