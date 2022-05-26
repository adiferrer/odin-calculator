// Below are the basic arithmetic functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return 'Math Error';
    return a / b;
}

// This function is called when the "=" button is clicked
function operate(a, b, operator) {
    if (operator === '+') return add(a, b);
    else if (operator === '-') return subtract(a, b);
    else if (operator === '×') return multiply(a, b);
    else if (operator === "÷") return divide(a, b);
}

const display = document.getElementById('input-box');
const digitButtons = Array.from(document.querySelectorAll('.digits'))
                          .sort((a, b) => Number(a.textContent) > Number(b.textContent) ? 1 : -1);
const operatorButtons = Array.from(document.querySelectorAll('.operators'));
const equalButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal-point');
let firstValue = '';
let secondValue = '';
let currentOperator = '';
let fullExpression = [];
let total = '';

for (let d = 0; d < digitButtons.length; d++) {
    digitButtons[d].addEventListener('click', () => {
        if (currentOperator == '') firstValue += d;
        else if (firstValue != '' && currentOperator != '' && fullExpression.indexOf('=') < 0) {
            if (secondValue == '') display.textContent = '';
            for (let c = 0; c < operatorButtons.length; c++) {
                if (operatorButtons[c].classList.contains('operators-clicked')) {
                    operatorButtons[c].classList.remove('operators-clicked');
                    break;
                }
            }
            secondValue += d;
            if (fullExpression.length % 2 != 0) fullExpression.push(currentOperator);
        } else if (fullExpression.indexOf('=') >= 0) {
            display.textContent = '';
            if (secondValue != '') {
                firstValue = '' + d;
                currentOperator = '';
                secondValue = '';
                fullExpression = [];
            } else {
                secondValue += d;
            }
        }

        // add code to make the 0 button work accordingly

        if (display.textContent.length == 13) {
            display.textContent = display.textContent.substr(0, 13);  
        } else {
            display.textContent += d;
        }
    });
}

// add code for the decimal point event listener
decimalButton.addEventListener('click', () => {
    if (display.textContent.indexOf('.') < 0) {
        if (currentOperator == '' && firstValue.indexOf('.') < 0) {
            if (firstValue == '') {
                firstValue += '0';
            } 
            firstValue += '.'; 
        } else if (currentOperator != '' && secondValue.indexOf('.') < 0) {
            if (secondValue == '') {
                secondValue += '0';
            }
            secondValue += '.'; 
        }
        display.textContent += '.';
    }
});

for (let o = 0; o < operatorButtons.length; o++) {
    operatorButtons[o].addEventListener('click', () => {
        for (let c = 0; c < operatorButtons.length; c++) {
            if (operatorButtons[c].classList.contains('operators-clicked')) {
                operatorButtons[c].classList.remove('operators-clicked');
                break;
            }
        }

        if (fullExpression.length == 0 && firstValue != '') fullExpression.push(Number(firstValue));
        else if (fullExpression.indexOf('=') < 0) {
            fullExpression.push(Number(secondValue));
            total = operate(Number(firstValue), Number(secondValue), currentOperator);
            firstValue = total;
            secondValue = '';
            display.textContent = String(total).substr(0, 13);
        } else if (fullExpression.lastIndexOf('=') == fullExpression.length - 2) secondValue = '';
        operatorButtons[o].classList.add('operators-clicked');
        if (firstValue != '') currentOperator = operatorButtons[o].textContent;
    });
}

equalButton.addEventListener('click', () => {
    if (secondValue != '') {
        if (fullExpression.indexOf('=') >= 0) {
            fullExpression.push(Number(firstValue));
            fullExpression.push(currentOperator);
        }
        total = operate(Number(firstValue), Number(secondValue), currentOperator);
        fullExpression.push(Number(secondValue));
        fullExpression.push('=');
        fullExpression.push(total);
        display.textContent = String(total).substr(0, 13);
        firstValue = total;
    }
});

clearButton.addEventListener('click', () => {
    const confirm = prompt('Are you sure? Y or N').toLowerCase(); 
    if (confirm == "yes" || confirm == 'y') {
        display.textContent = '';
        firstValue = '';
        currentOperator = '';
        secondValue = '';
        fullExpression = [];
    }
});