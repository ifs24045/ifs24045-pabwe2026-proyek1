import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <h1>NilaiKu</h1>
        <div>
          <Link to="/auth/login">Login</Link>
          <Link to="/auth/register">Daftar</Link>
        </div>
      </nav>

      <main className="landing-hero">
        <h2>Kelola Nilai & IPK Kamu dengan Mudah</h2>
        <p>
          NilaiKu membantu kamu mencatat nilai mata kuliah, menghitung IPK,
          dan memantau perkembangan akademik per semester.
        </p>
        <Link to="/auth/register" className="btn-primary">
          Mulai Sekarang
        </Link>
      </main>

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

      <footer className="landing-footer">
        <p>&copy; 2026 NilaiKu — Thimoty Geraldino Sianipar</p>
      </footer>
    </div>
  );
};

export default Landing;