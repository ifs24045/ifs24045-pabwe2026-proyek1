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

export default NilaiBadge;