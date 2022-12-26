//variables
let num = ""; //only function is to make +/- work...
let op = ""; //operators
let past = ""; //program is based on this to perform calculations
let pastArray = [];
//dom elements
const result = document.querySelector(".result");
const pastResult = document.querySelector(".past-result");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const clear = document.querySelector(".button");
const equal = document.querySelector("[data-equal]");
const changeSign = document.querySelector("#changeSign");

changeSign.onclick = () => {
  if(num ==''){
    return; 
  }
  else{
    num = '-'+num;
    past = num;
    result.textContent = past;
  }
}
clear.addEventListener("click", clearResult);
numbers.forEach((button) => button.addEventListener("click", makeNumber));
operators.forEach((button) => button.addEventListener("click", setOperator));
equal.onclick = () => equalFn();
function clearResult() {
  past = "";
  pastResult.textContent = "";
  result.textContent = "";
  num = "";
  op = "";
}
function extractNumbers(str) {
  // Use a regular expression to match the first number
  const re = /^-?[0-9]+(\.[0-9]+)?/;
  const match = str.match(re);
  if (match) {
    // If the regular expression matches, parse the number as a float
    const num1 = parseFloat(match[0]);
    // Use a regular expression to match the operator
    const re2 = /[+\-*/%^]/;
    const match2 = str.substring(match[0].length).match(re2);
    if (match2) {
      // If the regular expression matches, extract the operator
      const op = match2[0];
      // Use a regular expression to match the second number
      const re3 = /-?[0-9]+(\.[0-9]+)?$/;
      const match3 = str
        .substring(match[0].length + match2[0].length)
        .match(re3);
      if (match3) {
        // If the regular expression matches, parse the number as a float
        const num2 = parseFloat(match3[0]);

        return [num1, op, num2]
      }
    }
  }
}
//returns true if its of form numOpnum
function numOpNum(past) {
  return /^-?[0-9]+(\.[0-9]+)?[+\-*/%^]-?[0-9]+(\.[0-9]+)?$/.test(past);
}
function equalFn() {
  if (numOpNum(past)) {
    pastArray = extractNumbers(past); // splits based on operators
    console.log(past);
    console.log(pastArray);
    let calculation = applyOp(pastArray[1], parseFloat(pastArray[0]), parseFloat(pastArray[2]));
    pastResult.textContent = pastArray[0] + op + pastArray[2] + "=";
    result.textContent = calculation;
    num = calculation;
    op = "";
    past = calculation;
  } else return; //not correct past form
}

function makeNumber(e) {
  num += e.target.dataset.number;
  past += e.target.dataset.number;
  result.textContent = past;
  console.log(past);
}

function setOperator(e) {
  //when there is an op and past is of form 'number op'
  if (op != "" && /^-?[0-9]+(\.[0-9]+)?[+\-*/%^]$/.test(past)) {
    return;
  }
  //when there is an op and past is of form 'num op num'
  else if (op != "" && numOpNum(past)) {
    pastArray = extractNumbers(past); // splits based on operators
    let calculation = applyOp(pastArray[1], parseFloat(pastArray[0]), parseFloat(pastArray[2]));
    console.log(past);
    console.log(pastArray);
    console.log(calculation);
    pastResult.textContent = pastArray[0] + op + pastArray[2] + "=";
    op = e.target.dataset.operator;
    result.textContent = calculation + op;
    past = calculation + op;
    num = calculation;
  } else if (op === "") {
    op = e.target.dataset.operator;
    past += op;
    result.textContent = past;
    num = "";
  } else console.log("hey");
  return; // some edge case like putting operator first
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
    case "^":
      return power(a, b);
    case '%':
      return a % b;
    case "/":
      if (b == 0) {
        result.textContent ="Cannot divide by zero. Because it will be infinity or something";
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
