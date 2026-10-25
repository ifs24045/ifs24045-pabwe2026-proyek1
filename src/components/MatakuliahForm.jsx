import PropTypes from "prop-types";
import { DAFTAR_SEMESTER } from "../constants";

const DAFTAR_NILAI = ["A", "B", "C", "D", "E"];

const MatakuliahForm = ({ form, onChange, onSubmit, loading, labelSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="mk-form">
      <div className="form-group">
        <label htmlFor="nama">Nama Mata Kuliah</label>
        <input
          id="nama"
          name="nama"
          type="text"
          value={form.nama}
          onChange={onChange}
          required
          placeholder="Contoh: Pemrograman Web"
        />
      </div>

      <div className="form-group">
        <label htmlFor="kode">Kode Mata Kuliah</label>
        <input
          id="kode"
          name="kode"
          type="text"
          value={form.kode}
          onChange={onChange}
          required
          placeholder="Contoh: IF301"
        />
      </div>

      <div className="form-group">
        <label htmlFor="sks">SKS</label>
        <input
          id="sks"
          name="sks"
          type="number"
          value={form.sks}
          onChange={onChange}
          required
          min={1}
          max={6}
        />
      </div>

      <div className="form-group">
        <label htmlFor="nilai">Nilai (Opsional)</label>
        <select id="nilai" name="nilai" value={form.nilai} onChange={onChange}>
          <option value="">-- Belum Ada Nilai --</option>
          {DAFTAR_NILAI.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="semester">Semester</label>
        <select
          id="semester"
          name="semester"
          value={form.semester}
          onChange={onChange}
          required
        >
          <option value="">-- Pilih Semester --</option>
          {DAFTAR_SEMESTER.map((s) => (
            <option key={s} value={String(s)}>Semester {s}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Menyimpan..." : labelSubmit}
      </button>
    </form>
  );
};

MatakuliahForm.propTypes = {
  form: PropTypes.shape({
    nama: PropTypes.string.isRequired,
    kode: PropTypes.string.isRequired,
    sks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nilai: PropTypes.string,
    semester: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  labelSubmit: PropTypes.string.isRequired,
};

export default MatakuliahForm;