import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import MatakuliahForm from "../components/MatakuliahForm";
import useMatakuliahForm from "../utils/useMatakuliahForm";

const TambahMatakuliah = () => {
  const { form, error, loading, handleChange, handleSubmit } =
    useMatakuliahForm({ mode: "add" });

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