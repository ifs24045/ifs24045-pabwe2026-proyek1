import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

const useMatakuliahForm = ({ mode, id }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    kode: "",
    sks: "",
    nilai: "",
    semester: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(mode === "edit");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "edit") {
        await api.put(`/api/matakuliah/${id}`, form);
      } else {
        await api.post("/api/matakuliah", form);
      }
      navigate("/matakuliah");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (mode === "edit"
            ? "Gagal mengupdate mata kuliah"
            : "Gagal menambahkan mata kuliah")
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, setForm, error, loading, setLoading, handleChange, handleSubmit };
};

export default useMatakuliahForm;