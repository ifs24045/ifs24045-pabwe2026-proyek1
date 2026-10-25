import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import MatakuliahForm from "../components/MatakuliahForm";
import api from "../utils/api";

const EditMatakuliah = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nama: "",
    kode: "",
    sks: "",
    nilai: "",
    semester: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatakuliah();
  }, []);

  const fetchMatakuliah = async () => {
    try {
      const res = await api.get("/api/matakuliah");
      const mk = res.data.data.find((m) => m.id === parseInt(id));
      if (mk) {
        setForm({
          nama: mk.nama,
          kode: mk.kode,
          sks: mk.sks,
          nilai: mk.nilai || "",
          semester: mk.semester,
        });
      }
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

    try {
      await api.put(`/api/matakuliah/${id}`, form);
      navigate("/matakuliah");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengupdate mata kuliah");
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
      <div className="section-header">
        <h2>Edit Mata Kuliah</h2>
        <Link to="/matakuliah" className="btn-secondary">
          Kembali
        </Link>
      </div>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <MatakuliahForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        labelSubmit="Update"
      />
    </AppLayout>
  );
};

export default EditMatakuliah;