let no = document.querySelectorAll(".no:not(.decimal)");
let decimal = document.querySelector(".decimal");
let input = document.querySelector(".input");

let firstNumber;
let selectedOperator;
let secondNumber;
let result;

no.forEach(function (button) {

    button.addEventListener("click", function (e) {
        input.textContent += e.target.innerText;
       
    });
        
});

decimal.addEventListener("click", function () {
    let numbers = selectedOperator
        ? input.textContent.split(selectedOperator)
        : [input.textContent];

    let currentNumber = numbers[numbers.length - 1];

    if (currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "") {
        input.textContent += "0.";
    } else {
        input.textContent += ".";
    }
});

let operator = document.querySelectorAll(".operator");

operator.forEach(function (button) {
    button.addEventListener("click", function (e) {

        if (input.textContent === "") {
            return;
        }

        if (selectedOperator !== undefined && input.textContent.includes(selectedOperator)) {
            calculate();
        }

        firstNumber = parseFloat(input.textContent);
        selectedOperator = e.target.innerText;

        input.textContent += e.target.innerText;
    });
});

let last = document.querySelector(".last");

last.addEventListener("click", function () {
    input.textContent = input.textContent.slice(0, -1);
});

let clear = document.querySelector(".clear");

clear.addEventListener("click", function () {
    input.textContent = "";
    firstNumber = undefined;
    selectedOperator = undefined;
    secondNumber = undefined;
    result = undefined;
});

function calculate() {

    let numbers = input.textContent.split(selectedOperator);

    secondNumber = parseFloat(numbers[1]);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        return;
    }

    if (secondNumber === 0 && selectedOperator === "/") {
        alert("Error: Division by zero");
        input.textContent = "";
        firstNumber = undefined;
        selectedOperator = undefined;
        secondNumber = undefined;
        return;
    }

    switch (selectedOperator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "x":
            result = firstNumber * secondNumber;
            break;

        case "/":
            result = firstNumber / secondNumber;
            break;
    }

    input.textContent = result;
    firstNumber = result;
}

let evaluate = document.querySelector(".evaluate");

evaluate.addEventListener("click", calculate);