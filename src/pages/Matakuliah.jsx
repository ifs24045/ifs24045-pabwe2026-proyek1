import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import NilaiBadge from "../components/NilaiBadge";
import { DAFTAR_SEMESTER } from "../constants";
import api from "../utils/api";

const Matakuliah = () => {
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

  if (loading) {
    return (
      <main className="loading">
        <h1>Memuat...</h1>
      </main>
    );
  }

  return (
    <AppLayout>
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
          {DAFTAR_SEMESTER.map((s) => (
            <option key={s} value={s}>
              Semester {s}
            </option>
          ))}
        </select>
      </div>

      {matakuliah.length === 0 ? (
        <p className="empty-state">Belum ada mata kuliah.</p>
      ) : (
        <div
          className="table-wrap"
          role="region"
          aria-label="Daftar mata kuliah"
          tabIndex={0}
        >
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
                  <td>
                    <NilaiBadge nilai={mk.nilai} />
                  </td>
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
        </div>
      )}
    </AppLayout>
  );
};

export default Matakuliah;