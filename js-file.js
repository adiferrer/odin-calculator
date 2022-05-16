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
    if (b == 0) return 'ERROR';
    return a / b;
}

// This function is called when the "=" button is clicked
function operate(a, b, operator) {
    if (operator == '+') return add(a, b);
    else if (operator == '-') return subtract(a, b);
    else if (operator == '&times;') return multiply(a, b);
    else if (operator == '&divide;') return divide(a, b);
}

const display = document.getElementById('input-box');
let firstValue = '';
let secondValue = '';
let solution = [];
let total;

const digitButtons = Array.from(document.querySelectorAll('.digits')).sort((a, b) => Number(a.textContent) > Number(b.textContent) ? 1 : -1);
for (let d = 0; d < digitButtons.length; d++) {
    digitButtons[d].addEventListener('click', () => {
        secondValue += d;
        if (display.textContent.length == 13) {
            display.textContent = display.textContent.substr(0, 13);  
        } else {
            display.textContent += d;
        }
    });
}

const operatorButtons = Array.from(document.querySelectorAll('.operators'));
for (let o = 0; o < operatorButtons.length; o++) {
    operatorButtons[o].addEventListener('click', () => {
        if (secondValue != '') {
            firstValue = secondValue;
            display.textContent = '';
        }
        
        for (let c = 0; c < operatorButtons.length; c++) {
            if (operatorButtons[c].classList.contains('operators-clicked')) {
                operatorButtons[c].classList.remove('operators-clicked');
                break;
            }
        }
        operatorButtons[o].classList.add('operators-clicked');
    })
}

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    display.textContent = '';
    displayValue = '';
})

// const