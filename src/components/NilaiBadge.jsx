import PropTypes from "prop-types";

const NilaiBadge = ({ nilai }) => {
  const getClass = (n) => {
    const map = { A: "badge-green", B: "badge-blue", C: "badge-yellow", D: "badge-red", E: "badge-red" };
    return map[n] || "badge-gray";
  };

  return (
    <span className={`badge ${getClass(nilai)}`}>
      {nilai || "-"}
    </span>
  );
};

NilaiBadge.propTypes = {
  nilai: PropTypes.string,
};

NilaiBadge.defaultProps = {
  nilai: null,
};

export default NilaiBadge;