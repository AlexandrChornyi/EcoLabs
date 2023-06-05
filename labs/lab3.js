export function lab3() {
    let M_x = Number(document.querySelector("#M_x").value);
    let x_ti = Number(document.querySelector("#x_ti").value);
    let D_x = Number(document.querySelector("#D_x").value);
    let t_u = Number(document.querySelector("#t_u").value);
    let t = Number(document.querySelector("#t").value);
    let k = Number(document.querySelector("#k").value);
    let xt_0 = Number(document.querySelector("#xt_0").value);

    let tMoment = tempMoment(xt_0, t_u);
    let nomDenom = numeratorDenominatorExtrapolation(t_u, t, x_ti, M_x);
    let stepwiseExtrp = stepwiseExtrapolation(t_u, t, x_ti, M_x);
    let corrl = correlation(D_x, xt_0 * t_u / t, k);
    let stochasticExtrp = stochasticExtrapolation(M_x, x_ti, D_x, t_u, t, k, xt_0);

    document.querySelector("#t-moment").innerHTML = tMoment;
    document.querySelector("#nominator").innerHTML = nomDenom.numerator;
    document.querySelector("#denominator").innerHTML = nomDenom.denominator;
    document.querySelector("#stepwise-extrp").innerHTML = stepwiseExtrp;
    document.querySelector("#corelation").innerHTML = corrl;
    document.querySelector("#stochastic-extrp").innerHTML = stochasticExtrp;

    createExtrapolationChart(t, xt_0, t_u, x_ti, M_x, D_x, k);

    function correlation(D_x, t, k) {
        return D_x * (1 - Math.pow(t, k));
    }

    function stochasticExtrapolation(m_x, x_ti, D_x, t_u, t, k, xt_0) {
        return correlation(D_x, (xt_0 * t_u / t), k) / correlation(D_x, 0, k) * (x_ti - m_x) + m_x;
    }

    function varianceForecastError(t_u, t) {
        return Math.exp(-1 * t_u / t);
    }

    function numeratorDenominatorExtrapolation(t_u, t, x_ti, m_x) {
        let a = varianceForecastError(t_u, t);
        let k = t_u / t;
        let numerator = (x_ti - m_x) * Math.pow(a, k);
        let denominator = 1 - Math.pow(a, k) + 0.12;
        return { numerator: numerator, denominator: denominator };
    }

    function tempMoment(xt_0, t_u) {
        return xt_0 * t_u;
    }

    function stepwiseExtrapolation(t_u, t, x_ti, m_x) {
        let obj = numeratorDenominatorExtrapolation(t_u, t, x_ti, m_x);
        return m_x + obj.numerator / obj.denominator;
    }

    function getArrStochasticForGrahp(t, xt_0, t_u, x_ti, m_x, D_x, k) {
        let i = 1;
        let arr = [0.0];
        let n = Number(t);
        while (i < n + 1) {
            let val = correlation(D_x, xt_0 * t_u / i, k) / correlation(D_x, 0, k) * (x_ti - m_x) + m_x;
            arr.push(val);
            i = i + 1;
        }
        return arr;
    }

    function getArrStepwiseForGraph(t_u, t, x_ti, M_x) {
        let i = 1;
        let arr = [0.0]
        let n = Number(t)
        let tt = t;
        while (i < n + 1) {
            tt = Number(i);
            arr.push(stepwiseExtrapolation(t_u, tt, x_ti, M_x));
            i = i + 1;
        }
        return arr;
    }

    function createExtrapolationChart(t, xt_0, t_u, x_ti, m_x, D_x, k) {
        let arrt = []
        let arrStochastic = []
        let arrStepwise = []
        let n = Number(t);
        let i = 0.0;
        while (i < n + 1) {
            arrt.push(i);
            i = i + 1;
        }
        arrStochastic = getArrStochasticForGrahp(t, xt_0, t_u, x_ti, m_x, D_x, k);
        arrStepwise = getArrStepwiseForGraph(t_u, t, x_ti, M_x);
        const ctx = document.querySelector("#lab3Chart");
        const data = {
            labels: arrt,
            datasets: [
                {
                    label: 'Stochastic',
                    data: arrStochastic,
                    borderColor: 'rgb(255, 205, 86)',
                    backgroundColor: 'rgba(255, 205, 86, 0.5)',
                },
                {
                    label: 'Stepwise',
                    data: arrStepwise,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                }
            ]
        };
        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgb(255, 255, 255)',
                            font: {
                                size: 18
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: { color: 'rgb(255, 255, 255)' },
                        grid: {
                            color: 'rgb(72, 72, 72)'
                        }
                    },
                    x: {
                        ticks: { color: 'rgb(255, 255, 255)' },
                        grid: {
                            color: 'rgb(72, 72, 72)'
                        }
                    }
                }
            }
        };
        new Chart(ctx, config);
    }
}