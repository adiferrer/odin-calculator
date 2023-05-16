const display = document.getElementById('input-box');
const digitButtons = Array.from(document.querySelectorAll('.digits')).sort(
  (a, b) => (Number(a.textContent) > Number(b.textContent) ? 1 : -1),
);
const operatorButtons = Array.from(document.querySelectorAll('.operators'));
const equalButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('delete');
const decimalButton = document.getElementById('decimal-point');
let previousValue = '';
let currentValue = '';
let currentOperator = '';
let fullExpression = [];
let total = '';

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
  if (operator === '-') return subtract(a, b);
  if (operator === '×') return multiply(a, b);
  if (operator === '÷') return divide(a, b);
}

function removeTransition() {
  for (op of operatorButtons) {
    if (op.classList.contains('operators-clicked')) {
      op.classList.remove('operators-clicked');
      break;
    }
  }
}

digitButtons.forEach((digit) => digit.addEventListener('click', () => {
  const d = digit.textContent;

  if (currentOperator == '') previousValue += d;
  else if (previousValue != '' && fullExpression.indexOf('=') < 0) {
    if (currentValue == '') display.textContent = '';

    currentValue += d;
    if (fullExpression.length % 2 != 0) fullExpression.push(currentOperator);
  }

  if (fullExpression.indexOf('=') >= 0) {
    display.textContent = '';
    if (currentValue != '') {
      previousValue = `${d}`;
      currentOperator = '';
      currentValue = '';
      fullExpression = [];
    } else {
      currentValue += d;
    }
  }

  if (display.textContent == '0') {
    if (d == 0) document.getElementById('zero').disabled = true;
    else {
      document.getElementById('zero').disabled = false;
      display.textContent = `${d}`;
    }
  } else if (display.textContent.length == 13) {
    display.textContent = display.textContent.substr(0, 13);
  } else {
    display.textContent += d;
  }
}));

decimalButton.addEventListener('click', () => {
  if (display.textContent.indexOf('.') < 0) {
    if (currentOperator == '' && previousValue.indexOf('.') < 0) {
      if (previousValue == '') {
        previousValue += '0';
      }
      previousValue += '.';
    } else if (currentOperator != '' && currentValue.indexOf('.') < 0) {
      if (currentValue == '') {
        currentValue += '0';
      }
      currentValue += '.';
    }
    display.textContent += '.';
  }
});

operatorButtons.forEach((operator) => operator.addEventListener('click', () => {
  removeTransition();

  if (fullExpression.length == 0 && previousValue != '') { fullExpression.push(Number(previousValue)); } else if (fullExpression.lastIndexOf('=') < 0) {
    fullExpression.push(Number(currentValue));
    total = operate(
      Number(previousValue),
      Number(currentValue),
      currentOperator,
    );
    previousValue = total;
    currentValue = '';
    display.textContent = String(total).substr(0, 13);
  } else if (fullExpression.lastIndexOf('=') == fullExpression.length - 2) { currentValue = ''; }
  operator.classList.add('operators-clicked');
  if (previousValue != '') currentOperator = operator.textContent;
}));

equalButton.addEventListener('click', () => {
  removeTransition();

  if (currentValue != '') {
    if (fullExpression.indexOf('=') >= 0) {
      fullExpression.push(Number(previousValue));
      fullExpression.push(currentOperator);
    }
    total = operate(
      Number(previousValue),
      Number(currentValue),
      currentOperator,
    );
    fullExpression.push(Number(currentValue));
    fullExpression.push('=');
    fullExpression.push(total);
    display.textContent = String(total).substr(0, 13);
    previousValue = total;
  }
});

clearButton.addEventListener('click', () => {
  const confirm = prompt('Are you sure? Y or N').toLowerCase();
  if (confirm == 'yes' || confirm == 'y') {
    display.textContent = '';
    previousValue = '';
    currentOperator = '';
    currentValue = '';
    fullExpression = [];
  }
});

// backspaceButton.addEventListener('click', () => {
//     const currentContent = display.textContent;
//     display.textContent = currentContent.slice(0, currentContent.length-2);
// })
