export default function MethodSelector({ onSelect }) {
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Select a Method</h2>
      <select
        onChange={handleChange}
        className="border p-2 rounded"
        defaultValue=""
      >
        <option value="" disabled>Select a method</option>
        <option value="jacobi">Jacobi / Gauss-Seidel</option>
        <option value="sor">SOR</option>
      </select>
    </div>
  );
}
