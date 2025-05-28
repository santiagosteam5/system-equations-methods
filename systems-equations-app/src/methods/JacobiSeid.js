import {
  matrix, inv, multiply, add, subtract, norm, diag, zeros, size, clone, subset, index
} from 'mathjs';

// Jacobi = 0
// Gauss-Seidel = 1
export function MatJacobiSeid(x0, A, b, tol, niter, met) {
    let c = 0;
    let error = tol + 1;
    const n = A.length;

    A = matrix(A);
    b = matrix(b);
    x0 = matrix(x0);

    // Extrae matrices D, L y U
    const D = matrix(zeros([n, n]));
    const L = matrix(zeros([n, n]));
    const U = matrix(zeros([n, n]));

    for (let i = 0; i < n; i++) {
        D.set([i, i], A.get([i, i]));
        for (let j = 0; j < n; j++) {
            if (i > j) L.set([i, j], -A.get([i, j]));
            if (i < j) U.set([i, j], -A.get([i, j]));
        }
    }

    const E = [];          // Lista de errores por iteración
    const xHistory = [];   // Historial de soluciones

    while (error > tol && c < niter) {
        let T, C;

        if (met === 0) { // Jacobi
            T = multiply(inv(D), add(L, U));
            C = multiply(inv(D), b);
        } else if (met === 1) { // Gauss-Seidel
            T = multiply(inv(subtract(D, L)), U);
            C = multiply(inv(subtract(D, L)), b);
        } else {
            throw new Error("Método inválido: usa 0 para Jacobi o 1 para Gauss-Seidel.");
        }

        const x1 = add(multiply(T, x0), C);
        error = norm(subtract(x1, x0), 'inf');

        E.push(error);
        xHistory.push(x1.toArray());

        x0 = clone(x1);
        c++;
    }

    const resultTable = xHistory.map((x, i) => {
        const row = { Iter: i + 1, Error: E[i] };
        x.forEach((val, j) => {
            row[`x${j + 1}`] = val;
        });
        return row;
    });

    for (let i = 0; i < E.length; i++) {
        E[i] = E[i] * 1e-3; // Convert error to a more readable format
    }

    const result = {
        solution: x0.toArray(),
        iterations: c,
        error: E,
        tolerance: tol,
        table: resultTable
    };

    return result;
}