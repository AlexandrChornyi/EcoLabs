export function lab4() {
    let x1 = Number(document.querySelector("#x1").value);
    let x2 = Number(document.querySelector("#x2").value);
    let x3 = Number(document.querySelector("#x3").value);
    let x4 = Number(document.querySelector("#x4").value);
    let l = Number(document.querySelector("#l").value);
    let o1 = Number(document.querySelector("#o1").value);
    let o2 = Number(document.querySelector("#o2").value);
    let o3 = Number(document.querySelector("#o3").value);
    let o4 = Number(document.querySelector("#o4").value);
    let dx123 = Number(document.querySelector("#dx123").value);
    let dx4 = Number(document.querySelector("#dx4").value);


    let lj = x1 + x2 + x3 - x4;
    document.querySelector("#init-cond").innerHTML = ` ${lj} <= ${l} — ${fault_f([x1, x2, x3, x4], l)}`;
    document.querySelector("#eq1").innerHTML = ` 2 * ${o1} * Δq1 + λ = 0`;
    document.querySelector("#eq2").innerHTML = ` 2 * ${o2} * Δq1 + λ = 0`;
    document.querySelector("#eq3").innerHTML = ` 2 * ${o3} * Δq1 + λ = 0`;
    document.querySelector("#eq4").innerHTML = ` 2 * ${o4} * Δq1 + λ = 0`;
    document.querySelector("#eq5").innerHTML = ` Δq1 + Δq2 + Δq3 - Δq4 = ${l}`;

    let coeffs = lagrangeMultiplier(o1, o2, o3, o4, l);
    document.querySelector("#sys-solution").innerHTML = `λ = ${coeffs[4]},<br>Δq1 = ${coeffs[0]},<br>Δq2 = ${coeffs[1]},<br>Δq3 = ${coeffs[2]},<br>Δq4 = ${coeffs[3]}`;

    document.querySelector("#xeq1").innerHTML = ` x1(${coeffs[0]}) ≤ ${dx123} — ${fault_x123(coeffs[0], dx123)}`;
    document.querySelector("#xeq2").innerHTML = ` x1(${coeffs[1]}) ≤ ${dx123} — ${fault_x123(coeffs[1], dx123)}`;
    document.querySelector("#xeq3").innerHTML = ` x1(${coeffs[2]}) ≤ ${dx123} — ${fault_x123(coeffs[2], dx123)}`;
    document.querySelector("#xeq4").innerHTML = ` x1(${coeffs[3]}) ≤ ${dx123} — ${fault_x4(coeffs[3], dx4)}`;
    
    let revisedXs = revised(x1, x2, x3, x4, coeffs);
    document.querySelector("#revised-x").innerHTML = ` x1 = ${revisedXs[0]}, x2 = ${revisedXs[1]}, x3 = ${revisedXs[2]}, x4 = ${revisedXs[3]}`;

    lj = revisedXs[0] + revisedXs[1] + revisedXs[2] - revisedXs[3];
    document.querySelector("#revised-cond").innerHTML = ` ${lj} <= ${l} — ${fault_f(revisedXs, l)}`;

    function lagrangeMultiplier(o1, o2, o3, o4, l) {
        // Знаходимо значення коефіцієнта Лагранжа ll
        let ll = -(2 * o1 * o2 * o3 * o4 * l) / (2 * o1 * o2 * o3 + 2 * o1 * o2 * o4 + 2 * o1 * o3 * o4 + 2 * o2 * o3 * o4);

        // Знаходимо значення q1, q2, q3, q4
        let q1 = -ll / (2 * o1);
        let q2 = -ll / (2 * o2);
        let q3 = -ll / (2 * o3);
        let q4 = -ll / (2 * o4);
        return [q1, q2, q3, q4, ll];
    }

    function fault_f(xArr, l) {
        if (Math.abs(xArr[0] + xArr[1] + xArr[2] - xArr[3]) <= l) {
            return "умова виконується";
        } else {
            return "умова не виконується";
        }
    }

    function fault_x123(q, dx123) {
        if (Math.abs(q) <= dx123) {
            return "умова виконується";
        } else {
            return "умова не виконується";
        }
    }
    
    function fault_x4(q, dx4) {
        if (Math.abs(q) <= dx4) {
            return "умова виконується";
        } else {
            return "умова не виконується";
        }
    }

    function revised(x1, x2, x3, x4, coeffs) {
        return [
            x1 - coeffs[0],
            x2 - coeffs[1],
            x3 - coeffs[2],
            x4 - coeffs[3]
        ]
    }
}