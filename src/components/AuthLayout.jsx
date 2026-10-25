import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthLayout = ({ title, error, onSubmit, children, buttonLabel, footerText, footerLinkTo, footerLinkLabel }) => {
  return (
    <main className="auth-container">
      <div className="auth-box">
        <h1>NilaiKu</h1>
        <h2>{title}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={onSubmit}>
          {children}
          <button id="btn-submit" type="submit">
            {buttonLabel}
          </button>
        </form>
        <p>{footerText} <Link to={footerLinkTo}>{footerLinkLabel}</Link></p>
      </div>
    </main>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  footerText: PropTypes.string.isRequired,
  footerLinkTo: PropTypes.string.isRequired,
  footerLinkLabel: PropTypes.string.isRequired,
};

AuthLayout.defaultProps = {
  error: "",
};

export default AuthLayout;