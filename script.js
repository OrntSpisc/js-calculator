//Calculator variables
let firstNumber;
let secondNumber;
let operator;
//Display values
let topValue;
let bottomValue;



//Operate function. Take first and second number and operate accordingly.
function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            multiply(num1, num2);
            break;
        case '/':
            multiply(num1, num2);
            break;
        default:
            break;
    }
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