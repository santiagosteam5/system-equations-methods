import { useState } from 'react';
import { matrix } from 'mathjs';
import { SOR } from '../methods/SOR';
import { MatJacobiSeid } from '../methods/JacobiSeid';
import sorgif from '/miku1.gif';
import jacobiseidgif from '/miku2.gif';
import "../App.css";

export default function InputForm({ method, onSubmit }) {
  const [size, setSize] = useState(4); // default 4x4
  const [A, setA] = useState(generateMatrix(4));
  const [b, setB] = useState(Array(4).fill(0));
  const [x0, setX0] = useState(Array(4).fill(0));
  const [tol, setTol] = useState(5e-3);
  const [niter, setNiter] = useState(100);
  const [w, setW] = useState(1.1); // only for SOR
  const [newmethod, setMethod] = useState(''); // default method

  function generateMatrix(n) {
    return Array.from({ length: n }, () => Array(n).fill(0));
  }

  function updateA(i, j, val) {
    const updated = [...A];
    updated[i][j] = parseFloat(val);
    setA(updated);
  }

  function updateVector(vecSetter, vec, i, val) {
    const updated = [...vec];
    updated[i] = parseFloat(val);
    vecSetter(updated);
  }

  const handleSubmit = () => {
    const parsed = parseFloat(tol);
    if (!isNaN(parsed) && parsed >= 0) {
        setTol(parsed);
    } else {
        setTol(5e-3); // Reset to default if invalid input
    }
    let result;
    if (method === 'sor') {
        result = SOR(A, b, x0, tol, niter, w);
    } else {
        const isJacobi = newmethod === 'jacobi';
        result = MatJacobiSeid(x0, A, b, tol, niter, isJacobi ? 0 : 1);
    }
    
    onSubmit(result);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setSize(newSize);
    setA(generateMatrix(newSize));
    setB(Array(newSize).fill(0));
    setX0(Array(newSize).fill(0));
  };

  return (
    <div className="main-content">
        <div className="graph-container">
      <label>Matrix Size (2-7):</label>
      <select value={size} onChange={handleSizeChange}>
        {[...Array(6)].map((_, i) => (
          <option key={i} value={i + 2}>{i + 2}</option>
        ))}
      </select>

      <h3>Matrix A:</h3>
      {A.map((row, i) => (
        <div key={i}>
          {row.map((val, j) => (
            <input
              key={j}
              type="number"
              value={val}
              onChange={(e) => updateA(i, j, e.target.value)}
              style={{ width: '60px' }}
            />
          ))}
        </div>
      ))}

      <h3>Vector b:</h3>
      {b.map((val, i) => (
        <input
          key={i}
          type="number"
          value={val}
          onChange={(e) => updateVector(setB, b, i, e.target.value)}
          style={{ width: '60px' }}
        />
      ))}

      <h3>Initial Guess x₀:</h3>
      {x0.map((val, i) => (
        <input
          key={i}
          type="number"
          value={val}
          onChange={(e) => updateVector(setX0, x0, i, e.target.value)}
          style={{ width: '60px' }}
        />
      ))}

      <div>
        <br></br>
        <label>Tolerance: </label>
        <input
            type="text"
            value={tol}
            onChange={(e) => {
                const val = e.target.value;
                setTol(val);
            }}
        />

      </div>

      <div>
        <label>Max Iterations: </label>
        <input type="number" value={niter} onChange={(e) => setNiter(parseInt(e.target.value))} />
      </div>

      {method === 'sor' && (
        <div>
          <label>Relaxation Factor (ω): </label>
          <input type="number" step="0.1" value={w} onChange={(e) => setW(parseFloat(e.target.value))} />
        </div>
      )}

      {method === 'jacobi' && (
        <div>
          <label>Method: </label>
          <select onChange={(e) => setMethod(e.target.value)} value={newmethod}>
            <option value='' disabled>Select Method</option>
            <option value='jacobi'>Jacobi</option>
            <option value='gauss-seidel'>Gauss-Seidel</option>
          </select>
        </div>
      )}

      <br></br>
      <button onClick={handleSubmit}>Calculate</button>

      </div>
        <div className="gif-section">
      {method === 'sor' && (
        <div className="gif-container">
            <img src={sorgif} alt="Animación del método de SOR" className="method-gif" />
            <p className="gif-caption">Visualización del método de SOR</p>
        </div>)}

        {method === 'jacobi' && (
        <div className="gif-container">
            <img src={jacobiseidgif} alt="Animación del método de Jacobi" className="method-gif" />
            <p className="gif-caption">Visualización del método de Jacobi</p>
        </div>)}
        </div>
    </div>
  );
}
