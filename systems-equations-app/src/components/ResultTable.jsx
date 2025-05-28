export default function ResultTable({ data }) {
  let data1 = data;
  data = data.table; 
  if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
    return <p>No table data to display.</p>;
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Result Table</h2>
      <h3 className="text-lg mb-2">Es una aproximación de la solucion con una tolerancia de: {data1.tolerance}</h3>
    <table border="1">
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {Object.values(row).map((val, i) => (
              <td key={i}>{Array.isArray(val) ? val.join(', ') : val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
        <h3 className="text-lg mt-4">Solución final: {data1.solution.join(', ')}</h3>
        <h3 className="text-lg">Número de iteraciones: {data1.iterations}</h3>
        <h3 className="text-lg">Error final: {data1.error[data1.error.length - 1] * 1e-3}</h3>
    </div>
  );
}
