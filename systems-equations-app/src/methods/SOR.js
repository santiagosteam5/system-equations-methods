import { matrix, norm, subtract } from 'mathjs';

export function SOR(A, b, x0, tol, nIter, w) {
    const n = A.length;
    let c = 0;
    let error = tol + 1;

    A = matrix(A);
    b = matrix(b);
    x0 = matrix(x0);
    let x1 = x0.clone();

    const xHistory = [];
    const errorList = [];

    while (error > tol && c < nIter) {
        for (let i = 0; i < n; i++) {
            let sigma = 0;
            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    sigma += A.get([i, j]) * x1.get([j]);
                }
            }
            const newVal = (1 - w) * x0.get([i]) + (w / A.get([i, i])) * (b.get([i]) - sigma);
            x1.set([i], newVal);
        }

        error = norm(subtract(x1, x0), 'inf');
        x0 = x1.clone();
        c++;

        xHistory.push(x1.toArray());     // Store current solution vector
        errorList.push(error);           // Store error
    }

    // Build result table (array of objects for readability)
    const resultTable = xHistory.map((xVec, idx) => {
        const row = {
            Iter: idx + 1,
            Error: errorList[idx]
        };
        xVec.forEach((val, i) => {
            row[`x${i + 1}`] = val;
        });
        return row;
    });

    for (let i = 0; i < errorList.length; i++) {
        errorList[i] = errorList[i] * 1e-3; // Convert error to a more readable format
    }

    // Final result
    const result = {
        solution: x1.toArray(),
        iterations: c,
        error: errorList,
        tolerance: tol,
        table: resultTable
    };
    
    return result;
}