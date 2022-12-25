//variables
let num = ""; //operands
let op = ""; //operators
let past = ""; //control variable for what operator does
console.log(op);
//dom elements
const result = document.querySelector(".result");
const pastResult = document.querySelector(".past-result");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const clear = document.querySelector(".button");
const equal = document.querySelector("[data-equal]");

clear.addEventListener("click", clearResult);
numbers.forEach((button) => button.addEventListener("click", makeNumber));
operators.forEach((button) => button.addEventListener("click", setOperator));
equal.onclick = () => equalFn();
function clearResult() {
  past = '';
  pastResult.textContent = '';
  result.textContent = "";
  num='';
  op = "";
}
function equalFn() {
  if(/^[0-9]+[+\-*/][0-9]+$/.test(past)){
    numArray = past.split(/[\+\-\*\/]/); // splits based on operators
    let calculation = applyOp(op, parseInt(numArray[0]), parseInt(numArray[1]));
    pastResult.textContent = numArray[0] + op + numArray[1] + "=";
    result.textContent = calculation;
    num='';
    op = "";
    past = calculation;
  }
  else
    return;//not correct past form
}

function makeNumber(e) {
  num += e.target.dataset.number;
  past += e.target.dataset.number;
  result.textContent = past;
  console.log(past);
}

function setOperator(e) {
  //when there is an op and past is of form 'number op'
  if (op != "" && /^[0-9]+[+\-*/]$/.test(past)) {
    return;
  }
  //when there is an op and past is of form 'num op num'
  else if (op != "" && /^[0-9]+[+\-*/][0-9]+$/.test(past)) {
    numArray = past.split(/[\+\-\*\/]/); // splits based on operators
    let calculation = applyOp(op, parseInt(numArray[0]), parseInt(numArray[1]));
    console.log(past);
    pastResult.textContent = numArray[0] + op + numArray[1] + "=";
    op = e.target.dataset.operator;
    result.textContent = calculation+op;
    past = calculation + op;
    num ='';
  } else if ((op === '')) {
    op = e.target.dataset.operator;
    result.textContent = num+op;
    past += op;
    num = "";
  }
  else
    return;// some edge case like putting operator first
}


function getInput(e) {
  if (Object.keys(e.target.dataset)[0] === "number") {
    //opPressed ? (number += button.dataset.number): (number2 +=button.dataset.number);
    result.textContent += e.target.dataset.number;
  } else {
    if (e.target.dataset.operator == "=") {
      displayStr = result.textContent;
      result.textContent = evaluate(displayStr);
      // total =operate(op, total, num);
      // opPressed = false;
    } else {
      result.textContent += e.target.dataset.operator;
    }
  }
}
// A utility method to apply an
// operator 'op' on operands 'a'
// and 'b'. Return the result.
function applyOp(op, a, b) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "**":
      return power(a, b);
    case "/":
      if (b == 0) {
        document.write(
          "Cannot divide by zero. Because it will be infinity or something"
        );
      }
      return divide(a, b);
    default:
      return "not an op";
  }
}
const add = function (a, b) {
  return a + b;
};

const multiply = function (a, b) {
  return a * b;
};

const subtract = function (a, b) {
  return a - b;
};

const power = function (a, b) {
  return Math.pow(a, b);
};
const divide = function (a, b) {
  return a / b;
};
const factorial = function (a) {
  if (a == 0) return 1;
  else return a * factorial(a - 1);
};
