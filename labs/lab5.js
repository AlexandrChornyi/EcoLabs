export function lab5() {
    let _kfacp = Number(document.querySelector("#kfacp").value);
    let _kmaxacp = Number(document.querySelector("#kmaxacp").value);
    let _fmax = Number(document.querySelector("#fmax").value);
    let _p0 = Number(document.querySelector("#p0").value);
    let _kpacp = Number(document.querySelector("#kpacp").value);
    let _koacp = Number(document.querySelector("#koacp").value);
    let _y1max = Number(document.querySelector("#y1max").value);
    let _ymax = Number(document.querySelector("#ymax").value);
    let _pmax = Number(document.querySelector("#pmax").value);
    let _sensorType = Number(document.querySelector("#sensor-type").value);

    let P = _kpacp / _kmaxacp * _pmax;
    let Knp = _y1max / _ymax;
    let O = calculateTemperature(_y1max / (_kmaxacp * Knp) * _koacp, _sensorType);
    let pg = calculateDensity(O, P);
    let Kp = Math.sqrt(pg / _p0);
    let F = calculateExpenses(Kp);
    
    document.querySelector("#P").innerHTML = P;
    document.querySelector("#Knp").innerHTML = Knp;
    document.querySelector("#O").innerHTML = O;
    document.querySelector("#pg").innerHTML = pg;
    document.querySelector("#Kp").innerHTML = Kp;
    document.querySelector("#F").innerHTML = F;

    function calculateTemperature(y, sensorType) {
        switch (sensorType) {
            case 1:
                return 3.01 + (13.75 * y) - (0.03 * Math.pow(y, 2));
            case 2:
                return 4.87 + (23.6 * y) - (0.0011 * Math.pow(y, 2));
            case 3:
                return (4.99 * y) + (0.0054 * Math.pow(y, 2)) - 41.25;
            case 4:
                return (2.34 * y) + (0.0011 * Math.pow(y, 2)) - 241.3;
            default:
                return 3.01 + (13.75 * y) - (0.03 * Math.pow(y, 2));
        }
    }

    function calculateDensity(O, P) {
        return 1.2 - (0.013 * O) + (0.72 * P) + (0.36 * Math.pow(10, -4) * Math.pow(O, 2)) + (0.24 * Math.pow(10, -2) * Math.pow(P, 2)) - (0.14 * Math.pow(10, -2) * O * P);
    }

    function calculateExpenses(Kp) {
        return Math.sqrt(_kfacp / _kmaxacp) * _fmax * Kp;
    }
}