
function operate(op, a, b){
    switch (op){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '**':
            return power(a,b);
        case '/':
            return divide(a,b);
        default:
            return "not an op";
    }
}
const add = function(a,b) {
	return a+b;
};

const multiply = function(a,b) {
    return a*b;
};

const subtract = function(a,b) {
	return a-b;
};

const power = function(a, b) {
	return Math.pow(a,b);
};
const divide = function(a,b){
    return a/b;
}
const factorial = function(a) {
	if(a ==0)
    return 1;
  else
    return a* factorial(a-1);
};