import { lab1 } from "./labs/lab1.js";
import { lab2 } from "./labs/lab2.js";
import { lab3 } from "./labs/lab3.js";
import { lab4 } from "./labs/lab4.js";
import { lab5 } from "./labs/lab5.js";

const inputsLab1 = document.querySelectorAll("#lab1 > .inputs-container > .inputs-column > .input-holder > input");
const inputsLab2 = document.querySelectorAll("#lab2 > .inputs-container > .inputs-column > .input-holder > input");
const inputsLab3 = document.querySelectorAll("#lab3 > .inputs-container > .inputs-column > .input-holder > input");
const inputsLab4 = document.querySelectorAll("#lab4 > .inputs-container > .inputs-column > .input-holder > input");
const inputsLab5 = document.querySelectorAll("#lab5 > .inputs-container > .inputs-column > .input-holder > input");
const selectLab5 = document.querySelector("#lab5 > .inputs-container > .inputs-column > .input-holder > select");

for (let i = 0; i < inputsLab1.length; i++) {
    inputsLab1.item(i).addEventListener('input', lab1);
}

for (let i = 0; i < inputsLab2.length; i++) {
    inputsLab2.item(i).addEventListener('input', lab2);
}

for (let i = 0; i < inputsLab3.length; i++) {
    inputsLab3.item(i).addEventListener('input', lab3);
}

for (let i = 0; i < inputsLab3.length; i++) {
    inputsLab4.item(i).addEventListener('input', lab4);
}

for (let i = 0; i < inputsLab5.length; i++) {
    inputsLab5.item(i).addEventListener('input', lab5);
}
selectLab5.addEventListener("change", lab5);

lab1();
lab2();
lab5();
lab3();
lab4();
document.body.style.height = "100vh";