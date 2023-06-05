import nj from 'https://cdn.jsdelivr.net/npm/@d4c/numjs/build/module/numjs.min.js';
export function lab2() {
    let TempXmax = Number(document.querySelector("#tempXmax").value);
    let TempXhyzm = Number(document.querySelector("#tempXhyzm").value);
    let PressXmax = Number(document.querySelector("#pressXmax").value);
    let PressXhyzm = Number(document.querySelector("#pressXhyzm").value);
    let length = 241
    let speed = 0.61
    let TempCorArr = [46, 42, 30, 18, 7, 1, 0]
    let PressCorArr = [23, 22, 15, 7, 2, 0]

    let RandProcArr = [76, 65, 93, 79, 74, 81, 74, 101, 92, 96, 101, 91, 100, 86, 91, 102, 92, 97, 82, 76, 
        87, 84, 93, 84, 90, 84, 97, 86, 78, 103, 87, 92, 87, 92, 98, 114, 108, 116, 93, 117, 110, 126, 113, 
        117, 113, 119, 99, 90, 93, 87, 85, 104, 63, 86, 101, 97, 100, 90, 112, 88, 111, 96, 100, 94, 106, 95, 
        84, 139, 99, 101, 95, 104, 86, 104, 93, 99, 94, 117, 93, 111, 106, 106, 94, 102, 106, 96, 111, 105, 112, 
        107, 110, 93, 97, 123, 93, 98, 92, 94, 70, 80, 71, 74, 67, 69, 64, 63, 0, 65, 0, 75, 0, 57, 0, 107, 0, 
        65, 0, 72, 0, 79, 0, 63, 63, 87, 73, 117, 102, 99, 105, 100, 139, 120, 122, 118, 123, 108, 116, 109, 
        116, 102, 95, 105, 109, 113, 103, 108, 114, 99, 108, 84, 103, 109, 105, 97, 104, 96, 87, 113, 108, 114, 
        87, 106, 89, 96, 84, 92, 107, 97, 95, 99, 93, 95, 77, 101, 92, 117, 101, 105, 101, 110, 74, 76, 68, 74, 
        66, 85, 80, 75, 82, 74, 92, 90, 91, 86, 104, 92, 102, 100, 108, 103, 109, 100, 105, 114, 112]

    let ordin = CalcOrdin();
    document.querySelector("#kxp").innerHTML = CalcKx(PressCorArr, PressXmax, PressXhyzm);
    document.querySelector("#pcorArr").innerHTML = PressCorArr;
    document.querySelector("#kxt").innerHTML = CalcKx(TempCorArr, TempXmax, TempXhyzm);
    document.querySelector("#tcorArr").innerHTML = TempCorArr;
    document.querySelector("#riseKx0").innerHTML = CalcRiseKx()[0];
    document.querySelector("#declineKx0").innerHTML = CalcDeclineKx()[0];
    document.querySelector("#riseKx1").innerHTML = CalcRiseKx()[1];
    document.querySelector("#declineKx1").innerHTML = CalcDeclineKx()[1];
    document.querySelector("#valSampStep").innerHTML = ValSampStep().toFixed(2);
    document.querySelector("#randProcArrL").innerHTML = RandProcArr.length;
    document.querySelector("#speed").innerHTML = speed;
    document.querySelector("#timeCrossN").innerHTML = TimeCrossN().toFixed(2);
    document.querySelector("#numCroosProc").innerHTML = NumCroosProc().toFixed(2);
    document.querySelector("#mxline").innerHTML = CalrMathExpectation(RandProcArr).toFixed(2);
    document.querySelector("#dispersion").innerHTML = calculateDispersion(RandProcArr).toFixed(2);
    document.querySelector("#ordin").innerHTML = ordin.slice(0, ordin.length / 2) + "</br>" + ordin.slice(ordin.length / 2);
    document.querySelector("#randCorrKx").innerHTML = CalcRandCorrKx().toFixed(2);
    document.querySelector("#tempKx").innerHTML = CalcKx(RandProcArr, TempXmax, TempXhyzm).toFixed(2);
    document.querySelector("#pressKx").innerHTML = CalcKx(RandProcArr, PressXmax, PressXhyzm).toFixed(2);
    document.querySelector("#sumSurPerAndArrT").innerHTML = CalSumSurPerAndArrT().t.toFixed(2);
    PlotCorrWithOrd(CalcCorrWithOrd());
    console.log(JSON.stringify(CalcCorrWithOrd()));

    function calculateDispersion(array) {
        const mean = array.reduce((acc, val) => acc + val, 0) / array.length;
        const squaredDifferences = array.map(val => Math.pow(val - mean, 2));
        const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / array.length;
        return variance;
    }

    function CalcKx(Arr, Max, Hyzm) {
        let Dx = calculateDispersion(Arr);
        return (2 * Dx - (Max ** 2 - Hyzm ** 2)) / 2;
    }

    function CalcRiseKx() {
        let ArrXmax = [];
        let ArrXhyzm = [];
        for (let i = 0; i < 1 - 0.001; i += 0.1) {
            ArrXmax.push(CalcKx(TempCorArr, i, TempXmax).toFixed(2));
            ArrXhyzm.push(CalcKx(TempCorArr, i, TempXhyzm).toFixed(2));
        }
        return [ArrXmax, ArrXhyzm];
    }

    function CalcDeclineKx() {
        let ArrXmax = [];
        let ArrXhyzm = [];
        for (let i = 1; i > 0.001; i -= 0.1) {
            ArrXmax.push(CalcKx(TempCorArr, i, TempXmax).toFixed(2));
            ArrXhyzm.push(CalcKx(TempCorArr, i, TempXhyzm).toFixed(2));
        }
        return [ArrXmax, ArrXhyzm];
    }

    function ValSampStep() {
        return 0.15 / NumCroosProc();
    }

    function NumCroosProc() {
        return RandProcArr.length / TimeCrossN()
    }

    function TimeCrossN() {
        return length / speed;
    }

    function CalrMathExpectation(array) {
        return nj.mean(array);
    }

    function linspace(start, stop, num = 50, endpoint = true) {
        if (num <= 1) {
            return [start];
        }
        const step = endpoint ? (stop - start) / (num - 1) : (stop - start) / num;
        const result = [];
        for (let i = 0; i < num; i++) {
            const value = start + step * i;
            result.push(value);
        }
        return result;
    }

    function CalcOrdin() {
        let num_points = RandProcArr.length;
        let num_time_points = Math.floor(num_points * ValSampStep());
        let time_point_indices = linspace(0, num_points - 1, num_time_points);
        let ordinVals = [];
        time_point_indices.forEach(element => {
            ordinVals.push(RandProcArr[Math.floor(element)]);
        });
        return ordinVals;
    }

    function CalcRandCorrKx() {
        let ArrX = RandProcArr;
        let J = Math.round(CalcJ());
        let N = ArrX.length;
        let sumKx = 0.0;
        let arrI = [];
        for (let i = 0; i < N - J; i++) {
            sumKx += ArrX[i] * ArrX[i + J];
            arrI.push(i);
        }
        return (1 / (N - J)) * sumKx;
    }

    function CalcJ() {
        return (nj.mean(CrossRandProc()) / CrossRandProc().length) * ValSampStep();
    }

    function CrossRandProc() {
        let resultArr = [];
        for (let i = 1; i < RandProcArr.length; i++) {
            resultArr.push(CalcKx(RandProcArr.slice(0, i), TempXmax, TempXhyzm));
        }
        return resultArr;
    }

    function CalcKx(Arr, Max, Hyzm) {
        let Dx = calculateDispersion(Arr);
        return (2 * Dx - (Max ** 2 - Hyzm ** 2)) / 2;
    }

    function CalSumSurPerAndArrT() {
        let t = ValSampStep();
        let ArrT = [];
        for (let i = 0; i < RandProcArr.length; i++) {
            ArrT.push(t.toFixed(2));
            t += ValSampStep()
        }
        return { t: t, ArrT: ArrT };
    }

    function CalcCorrWithOrd() {
        let deltaT = ValSampStep();
        let arr = RandProcArr;
        let step = Math.floor(1 / deltaT);
        let slice1 = [];
        for (let i = 0; i < arr.length; i += step) {
            slice1.push(arr[i]);
        }
        let slice2 = [];
        for (let i = 1; i < arr.length; i += step) {
            slice2.push(arr[i]);
        }
        return correlate(slice1, slice2);
    }

    function correlate(x, y) {
        const n = Math.max(x.length, y.length);
        const result = [];

        for (let lag = -n + 1; lag < n; lag++) {
            let sum = 0;

            for (let i = 0; i < n; i++) {
                const j = i - lag;
                if (j >= 0 && j < n) {
                    sum += (x[i] || 0) * (y[j] || 0);
                }
            }

            result.push(sum);
        }

        return result;
    }

    function PlotCorrWithOrd(CorArr) {
        let corrFuncPositive = CorArr;
        let time = nj.arange(CorArr.length).selection.data;

        const ctx = document.querySelector("#lab2Chart");
        const data = {
            labels: time,
            datasets: [
                {
                    label: 'Графік кореляційної функції випадкового процесу',
                    data: corrFuncPositive,
                    borderColor: 'rgb(255, 205, 86)',
                    backgroundColor: 'rgba(255, 205, 86, 0.5)',
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