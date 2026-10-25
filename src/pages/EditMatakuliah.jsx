import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import MatakuliahForm from "../components/MatakuliahForm";
import useMatakuliahForm from "../utils/useMatakuliahForm";
import api from "../utils/api";

const EditMatakuliah = () => {
  const { id } = useParams();
  const { form, setForm, error, loading, setLoading, handleChange, handleSubmit } =
    useMatakuliahForm({ mode: "edit", id });

  useEffect(() => {
    const fetchMatakuliah = async () => {
      try {
        const res = await api.get("/api/matakuliah");
        const mk = res.data.data.find((m) => m.id === Number.parseInt(id));
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

    fetchMatakuliah();
  }, []);

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