//variables
let displayStr = "";

//dom elements
const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".button-container > .button");
const clear = document.querySelector(".button");

clear.addEventListener("click", clearResult);
buttons.forEach((button) => button.addEventListener("click", getInput));

function clearResult() {
  result.textContent = "";
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

function evaluate(expression) {
  let tokens = expression.split("");
  let values = [];
  let ops = [];
  for (let i = 0; i < tokens.length; i++) {
    // Current token is a number,
    // push it to stack for numbers
    if (tokens[i] >= "0" && tokens[i] <= "9") {
      let sbuf = "";
      // There may be more than
      // one digits in number
      while (i < tokens.length && tokens[i] >= "0" && tokens[i] <= "9") {
        sbuf = sbuf + tokens[i++];
      }
      values.push(parseInt(sbuf, 10));
      // Right now the i points to
      // the character next to the digit,
      // since the for loop also increases
      // the i, we would skip one
      //  token position; we need to
      // decrease the value of i by 1 to
      // correct the offset.
      i--;
    }
    // Current token is an opening
    // brace, push it to 'ops'
    else if (tokens[i] == "(") {
      ops.push(tokens[i]);
    }
    // Closing brace encountered,
    // solve entire brace
    else if (tokens[i] == ")") {
      while (ops[ops.length - 1] != "(") {
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
      }
      ops.pop();
    }
    // Current token is an operator.
    else if (
      tokens[i] == "+" ||
      tokens[i] == "-" ||
      tokens[i] == "*" ||
      tokens[i] == "/"
    ) {
      // While top of 'ops' has same
      // or greater precedence to current
      // token, which is an operator.
      // Apply operator on top of 'ops'
      // to top two elements in values stack
      while (ops.length > 0 && hasPrecedence(tokens[i], ops[ops.length - 1])) {
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
      }
      // Push current token to 'ops'.
      ops.push(tokens[i]);
    }
  }
  // Entire expression has been
  // parsed at this point, apply remaining
  // ops to remaining values
  while (ops.length > 0) {
    values.push(applyOp(ops.pop(), values.pop(), values.pop()));
  }
  // Top of 'values' contains
  // result, return it
  return values.pop();
}
// Returns true if 'op2' has
// higher or same precedence as 'op1',
// otherwise returns false.
function hasPrecedence(op1, op2) {
  if (op2 == "(" || op2 == ")") {
    return false;
  }
  if ((op1 == "*" || op1 == "/") && (op2 == "+" || op2 == "-")) {
    return false;
  } else {
    return true;
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
        document.write("Cannot divide by zero");
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
  return a/b;
};
const factorial = function (a) {
  if (a == 0) return 1;
  else return a * factorial(a - 1);
};
