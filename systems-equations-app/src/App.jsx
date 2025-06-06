import { useState } from 'react';
import MethodSelector from './components/MethodSelector';
import InputForm from './components/InputForm';
import ResultTable from './components/ResultTable';
import "./App.css";

function App() {
  const [method, setMethod] = useState(null);
  const [result, setResult] = useState(null);

  const handleMethodChange = (selectedMethod) => {
    setMethod(selectedMethod);
    setResult(null); // Reset result if switching methods
  };

  return (
    <div className="app-container">
      <MethodSelector onSelect={handleMethodChange} />
      <br></br>
      {method && <InputForm method={method} onSubmit={setResult} />}
      <br></br>
      <div className="right-section">
      {result && <ResultTable data={result} />}
      </div>
      <br></br>
      <div className="button-group">
        <a href="https://aquinter10.github.io/proyecto-analisis-numerico/" className="button">Go back Home</a>
      </div>
    </div>
  );
}

export default App;
