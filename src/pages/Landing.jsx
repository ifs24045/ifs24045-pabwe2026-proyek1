import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-container">
      <nav className="landing-nav" aria-label="Navigasi utama">
        <h1>NilaiKu</h1>
        <div>
          <Link to="/auth/login">Login</Link>
          <Link to="/auth/register">Daftar</Link>
        </div>
      </nav>

      <main className="landing-main">
        <section className="landing-hero">
          <h2>Kelola Nilai & IPK Kamu dengan Mudah</h2>
          <p>
            NilaiKu membantu kamu mencatat nilai mata kuliah, menghitung IPK,
            dan memantau perkembangan akademik per semester.
          </p>
          <Link to="/auth/register" className="btn-primary">
            Mulai Sekarang
          </Link>
        </section>

        <section className="landing-features">
          <div className="feature-card">
            <h3>📚 Catat Nilai</h3>
            <p>Input nilai mata kuliah per semester dengan mudah</p>
          </div>
          <div className="feature-card">
            <h3>📊 Hitung IPK</h3>
            <p>IPK dihitung otomatis berdasarkan nilai yang kamu input</p>
          </div>
          <div className="feature-card">
            <h3>📈 Pantau Progress</h3>
            <p>Lihat perkembangan akademik kamu dari semester ke semester</p>
          </div>
        </section>

        <section className="landing-steps" aria-labelledby="judul-langkah">
          <h2 id="judul-langkah">Cara Kerjanya</h2>
          <ol>
            <li>
              <strong>Daftar</strong>
              <span>Buat akun gratis dalam hitungan detik.</span>
            </li>
            <li>
              <strong>Isi nilai</strong>
              <span>Tambahkan mata kuliah beserta SKS dan nilainya.</span>
            </li>
            <li>
              <strong>Pantau IPK</strong>
              <span>Lihat IPK dan total SKS langsung di dashboard.</span>
            </li>
          </ol>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2026 NilaiKu — Thimoty Geraldino Sianipar</p>
      </footer>
    </div>
  );
};

export default Landing;