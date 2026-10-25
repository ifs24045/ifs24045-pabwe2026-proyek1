const NilaiBadge = ({ nilai }) => {
  const getClass = (nilai) => {
    if (!nilai) return "badge-gray";
    if (nilai === "A") return "badge-green";
    if (nilai === "B") return "badge-blue";
    if (nilai === "C") return "badge-yellow";
    return "badge-red";
  };

  return (
    <span className={`badge ${getClass(nilai)}`}>
      {nilai ?? "-"}
    </span>
  );
};

export default NilaiBadge;