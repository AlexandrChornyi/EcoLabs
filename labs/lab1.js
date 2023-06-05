export function lab1() {
    document.body.style.height = "auto";
    const line = "<p class='text-warning'>-----------------------------------------------------------------</p>"
    let sensorDataBtn = document.querySelector("#sensors-data");
    let priorityChangeBtn = document.querySelector("#priority-changing");
    let exceededValuesBtn = document.querySelector("#exceeded-values");
    sensorDataBtn.addEventListener("click", printitemData);
    priorityChangeBtn.addEventListener("click", changePriority);
    exceededValuesBtn.addEventListener("click", printOverLimitData);

    let output = document.querySelector("#lab1-output");
    output.innerHTML = "";

    let n = Number(document.querySelector("#s-counts").value);
    let Timing = Number(document.querySelector("#survey-period").value) * 1000;
    let sp1 = Number(document.querySelector("#exam-per1-1").value);
    let sp2 = Number(document.querySelector("#exam-per1-2").value);
    let sp3 = Number(document.querySelector("#exam-per1-3").value);
    let sp4 = Number(document.querySelector("#exam-per1-4").value);
    let sp5 = Number(document.querySelector("#exam-per1-5").value);
    let sensorPriority = [sp1, sp2, sp3, sp4, sp5];
    let in1 = Number(document.querySelector("#exam-per2-1").value);
    let in2 = Number(document.querySelector("#exam-per2-2").value);
    let in3 = Number(document.querySelector("#exam-per2-3").value);
    let in4 = Number(document.querySelector("#exam-per2-4").value);
    let in5 = Number(document.querySelector("#exam-per2-5").value);
    let intervals = [in1, in2, in3, in4, in5];
    let upLimit = new Array();
    let lowLimit = new Array();
    let buffer = new Array();
    let itemData = new Array();
    let limitData = new Array();
    let dataSet = new Array();
    let timeData = new Array();

    let lowerLimitArray = 30;
    let upperLimitArray = 60;

    let testByPriority = false;
    let testByInterval = false;

    class Sensor {
        constructor(label, data, priority, interval, overLimitData, timeData) {
            this.label = label;
            this.data = data;
            this.priority = priority;
            this.interval = interval;
            this.overLimitData = overLimitData;
            this.timeData = timeData;
        }

        testItem() {
            const itemIndex = this.label.slice(7, 8) - 1;
            const itemValue = getRandNumb(
                lowLimit[itemIndex] - buffer[itemIndex],
                upLimit[itemIndex] + buffer[itemIndex],
            );
            let sensorStr = `<span class="text-primary"> ${itemIndex + 1}-го </span>`;
            let valueStr = "";
            if (itemValue < lowLimit[itemIndex] || itemValue > upLimit[itemIndex]) {
                valueStr = `<span class="text-danger"> ${itemValue} </span>`;
            } else {
                valueStr = `<span class="text-success"> ${itemValue} </span>`;
            }
            output.innerHTML += `<p> Тестування ${sensorStr} сенсора... Значення: ${valueStr} </p>`;
            if (itemValue < lowLimit[itemIndex] || itemValue > upLimit[itemIndex]) {
                output.innerHTML += `<p class="text-danger">Значення Сенсора ${itemIndex + 1} поза допустимим лімітом в [${lowLimit[itemIndex]}; ${upLimit[itemIndex]}]!</p>`;
                limitData[itemIndex].push(itemValue);
                timeData[itemIndex].push(getTime());
            }
            itemData[itemIndex].push(itemValue);
        }
    }

    InitializeOptions();

    if (testByInterval === true) {
        testItemAllSensors();
    } else {
        setInterval(testItemAllSensors, Timing);
    }
    function InitializeOptions() {
        for (let i = 0; i < n; i++) {
            const label = `Sensor ${i + 1}`;
            const dataValues = itemData[i];
            const priority = sensorPriority[i];
            const interval = intervals[i];
            const overLimitData = limitData[i];
            const sensor = new Sensor(label, dataValues, priority, interval, overLimitData);

            dataSet.push(sensor);
            upLimit[i] = upperLimitArray;
            lowLimit[i] = lowerLimitArray;
            buffer[i] = 0.5;
            itemData[i] = [];
            limitData[i] = [];
            timeData[i] = [];
        }
    }

    function testItemAllSensors() {
        if (testByPriority) {
            let sensorstestByPriority = dataSet.slice().sort((a, b) => a.priority - b.priority);
            for (let i = 0; i < n; i++) {
                sensorstestByPriority[i].testItem();
            }
        } else if (testByInterval) {
            for (let i = 0; i < n; i++) {
                setInterval(() => dataSet[i].testItem(), dataSet[i].interval * 1000);
            }
        } else {
            for (let i = 0; i < n; i++) {
                dataSet[i].testItem();
            }
        }
    }

    function getRandNumb(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getTime() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let timeString = `${hours}:${minutes}:${seconds}`;
        return timeString;
    }

    function printitemData() {
        output.innerHTML += line;
        for (let i = 0; i < n; i++) {
            let valuesStr = "";
            for (let j = 0; j < itemData[i].length; j++) {
                valuesStr += isOverLimitStr(itemData[i][j]) + ", ";
            }
            let sensorStr = `<span class="text-info">${i + 1}</span>`;
            output.innerHTML += `<p class="text-warning"> Дані сенсора ${sensorStr}: ${valuesStr.slice(0, valuesStr.length - 2)} </p>`;
        }
        output.innerHTML += line;
    }

    function printOverLimitData() {
        output.innerHTML += line;
        for (let i = 0; i < n; i++) {
            let valuesStr = "";
            let sensorStr = `<span class="text-info">${i + 1}</span>`;
            for (let j = 0; j < limitData[i].length; j++) {
                let valueStr = `<span class="text-danger"> ${limitData[i][j]} </span>`;
                let timeStr = `<span style="color: violet"> ${timeData[i][j]} </span>`;
                valuesStr += `<p> [${valueStr}]  в ${timeStr} </p>`;
            }
            if (valuesStr === "") {
                output.innerHTML += `<p class="text-success"> Значення сенсора ${sensorStr} не перевищували ліміт </p>`;
            } else {
                output.innerHTML += `<p class="text-danger"> Значення поза лімітом сенсора ${sensorStr}: </p>`;
                output.innerHTML += valuesStr;
            }
        }
        output.innerHTML += line;
    }

    function changePriority() {
        testByPriority = !testByPriority;
        output.innerHTML += '<p class="text-warning"> Пріорітет змінено </p>';
    }

    function isOverLimitStr(value) {
        let valueStr = "";
        if (value < lowerLimitArray || value > upperLimitArray) {
            valueStr = `<span class="text-danger"> ${value} </span>`;
        } else {
            valueStr = `<span class="text-success"> ${value} </span>`;
        }
        return valueStr;
    }

}