import PropTypes from "prop-types";

const NilaiBadge = ({ nilai }) => {
  const getClass = (nilai) => {
    const map = { A: "badge-green", B: "badge-blue", C: "badge-yellow", D: "badge-red", E: "badge-red" };
    return map[nilai] || "badge-gray";
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