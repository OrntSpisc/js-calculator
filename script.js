//
//
// Warning messy code!!!
// Read with safety gears and always follow the protocols!!!
//
//

//Selectors
const displayTop = document.querySelector('.small-display');
const displayBottom = document.querySelector('.big-display');
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const allClearButton = document.querySelector('#all-clear');
const equalButton = document.querySelector('#equal-btn');
const deleteButton = document.querySelector('#delete-btn');
const buttons = document.querySelectorAll('button');
const percentButton = document.querySelector('.percent-btn');
const decimalButton = document.querySelector('.decimal-btn');
//Calculator variables
let firstNumber = "";
let secondNumber = "";
let pastFirstNumber = "";
let pastSecondNumber = "";
let operator;
let operated = false;
let canAddOperator = true;
let canAddDecimal = true;
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
    operator = null;
});
numberButtons.forEach(button => button.addEventListener('click', e => numberButtonHandler(e)));
operatorButtons.forEach(button => button.addEventListener('click', e => operatorButtonHandler(e)));
equalButton.addEventListener('click', equalButtonHandler);
deleteButton.addEventListener('click', deleteButtonHandler);
percentButton.addEventListener('click', percentButtonHandler);
decimalButton.addEventListener('click', decimalButtonHandler);


//Buttons Handlers
function numberButtonHandler(e) {
    //If zero clean display first
    if (displayTop.textContent === "0") {
        displayTop.textContent = "";
    }
    displayTop.textContent += e.target.id;
    canAddOperator = true;
    //Put the inputted number according to the operation status
    if (operated) {
        secondNumber == 0 ? secondNumber = "" : null;
        secondNumber += `${e.target.id}`;
    } else {
        secondNumber == 0 ? secondNumber = "" : null;
        firstNumber += `${e.target.id}`;
    }
    console.log(`${firstNumber}, ${secondNumber}, ${operator}`);

}

function operatorButtonHandler(e) {
    if (canAddOperator) {
        if (!operated) {
            firstNumber = parseFloat(displayTop.textContent);
        } else {
            pastFirstNumber = firstNumber;
            pastSecondNumber = secondNumber;
            firstNumber = equalButtonHandler();
            secondNumber = 0;
        }
        displayTop.textContent += ` ${e.target.textContent} `;
        operator = e.target.textContent;
        operated = true;
        canAddOperator = false;
        canAddDecimal = true;
    }
    console.log(`${firstNumber}, ${secondNumber}, ${operator}`);

}

function deleteButtonHandler() {
    if (!firstNumber) {
        return;
    }
    let newString = displayTop.textContent.substring(0, displayTop.textContent.length - 1);
    const deletedChar = displayTop.textContent.charAt(displayTop.textContent.length - 1);
    newString = newString.trimEnd();
    console.log(newString);
    if (newString == "") {
        newString = "0";
    }
    const keys = Object.keys(operators);

    
    displayTop.textContent = newString;
    if (!operated) {
        firstNumber = firstNumber.substring(0, firstNumber.length - 1);
    } else {
        secondNumber = secondNumber.toString().substring(0, secondNumber.length - 1);
        if (keys.includes(deletedChar)) {
            firstNumber = pastFirstNumber;
            secondNumber = pastSecondNumber;
            if (!Object.keys(operators).some(v => newString.includes(v))) {
                operated = false;
                firstNumber = displayTop.textContent;
                secondNumber = "";
            }
        }
    }
    equalButtonHandler();
}

function decimalButtonHandler() {
    if (canAddDecimal) {
        displayTop.textContent += "."
        if (!operated) {
            firstNumber += ".";
            console.log(firstNumber);
        } else {
            secondNumber += ".";
            console.log(secondNumber);
        }
        canAddDecimal = false;
    }
}

function percentButtonHandler() {
    const splitted = displayTop.textContent.split(" ");
    const percentedNumber = splitted.slice(-1);
    percentedNumber[0] = `${parseFloat(percentedNumber) / 100}`;
    splitted[splitted.length - 1] = percentedNumber;

    displayTop.textContent = splitted.join(" ");
    
}

function equalButtonHandler() {
    console.log(`${firstNumber}, ${secondNumber}, ${operator}`);
    firstNumber == "" ? firstNumber = 0 : null;
    secondNumber == "" ? secondNumber = 0 : null;
    let result = firstNumber;
    if (operator) {
        result = operate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
    }
    displayBottom.textContent = result;
    console.log(`${firstNumber}, ${secondNumber}, ${operator}`);
    return result;
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