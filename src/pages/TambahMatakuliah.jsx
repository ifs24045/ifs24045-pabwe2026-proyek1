import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import MatakuliahForm from "../components/MatakuliahForm";
import api from "../utils/api";

const TambahMatakuliah = () => {
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

  return (
    <AppLayout>
      <div className="section-header">
        <h2>Tambah Mata Kuliah</h2>
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
        labelSubmit="Simpan"
      />
    </AppLayout>
  );
};

export default TambahMatakuliah;