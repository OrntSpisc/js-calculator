//Selectors
const displayTop = document.querySelector('.small-display');
const displayBottom = document.querySelector('.big-display');
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const allClearButton = document.querySelector('#all-clear');
const equalButton = document.querySelector('#equal-btn');
const deleteButton = document.querySelector('#delete-btn');
const buttons = document.querySelectorAll('button');
//Calculator variables
let firstNumber = "";
let secondNumber = "";
let operator;
let operated = false;
//Display values
let topValue = "0";
let bottomValue = "";


allClearButton.addEventListener('click', function() {
    topValue = "0";
    bottomValue = "";
    displayTop.textContent = "0";
    displayBottom.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operated = false
});
numberButtons.forEach(button => button.addEventListener('click', e => numberButtonHandler(e)));
operatorButtons.forEach(button => button.addEventListener('click', e => operatorButtonHandler(e)));
equalButton.addEventListener('click', equalButtonHandler);
deleteButton.addEventListener('click', deleteButtonHandler);


//Buttons Handlers
function numberButtonHandler(e) {
    //If zero clean display first
    if (topValue === "0") {
        topValue = "";
    }
    topValue += e.target.id;
    displayTop.textContent = topValue;

    //Put the inputted number according to the operation status
    if (operated) {
        secondNumber += e.target.id;
    } else {
        firstNumber += e.target.id;
    }
}

function operatorButtonHandler(e) {
    operator = e.target.textContent;
    topValue += ` ${e.target.textContent} `;
    displayTop.textContent = topValue;
    operated = true;
}

function deleteButtonHandler() {
    let deleted = topValue.substring(0, topValue.length - 1);
    console.log(deleted);
    topValue = deleted;
    console.log(topValue);
    if (topValue == "") {
        topValue = "0";
    }
    displayTop.textContent = topValue;
}

function equalButtonHandler() {
    console.log("equal");
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);
    console.log(`${firstNumber}, ${secondNumber}, ${operator}`);
    bottomValue = operate(firstNumber, secondNumber, operator);
    firstNumber = bottomValue;
    secondNumber = "";
    operated = false;
    displayBottom.textContent = bottomValue;
}

//Operate function. Take first and second number and operate accordingly.
const operators = {
    '+': add,
    '-': subtract,
    '×': multiply,
    '÷': divide
}

function operate(num1, num2, operator) {
    console.log(operator);
    const operateFunction = operators[operator];
    console.log(operateFunction);
    console.log(operateFunction(num1, num2));
    return operateFunction(num1, num2);
}

///////////Operations/////////////

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

///////////////////////////////////

//Keybindings
window.addEventListener('keydown', keyboardHandler);

function keyboardHandler(e) {
    console.log(e.key);
    let clickedButton;
    if (e.key == 'c') {
        clickedButton = allClearButton;
    } else if (e.key == 'Backspace' || e.key == 'Delete') {
        clickedButton = deleteButton;
    } else if (e.key == 'Enter' || e.key == '=') {
        clickedButton = equalButton;
    } else {
        buttons.forEach(button => {
            if (button.id == e.key) {
                clickedButton = button;
            }
        });
    }
    if (clickedButton) {
        clickedButton.click();
        clickedButton.classList.add('active');
    }
}

window.addEventListener('keyup', function(e) {
    const buttonsActive = this.document.querySelectorAll('.active');
    buttonsActive.forEach(function(button) {
        button.classList.remove('active');
    })
})