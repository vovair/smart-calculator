const operatorPriority = operator => {
  if (operator == "+" || operator == "-") return 2;
  if (operator == "*" || operator == "/") return 1;
  return 0;
};

const operatorComparator = (op1, op2) => {
  return operatorPriority(op1) - operatorPriority(op2);
};

const applyOperator = (x, y, operator) => {
  switch (operator) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    case "/":
      return x / y;
    case "^":
      return Math.pow(x, y);
  }
  return 0;
};

class SmartCalculator {
  constructor(initialValue) {
    this.values = [initialValue];
    this.operators = [];
  }

  suppress() {
    while (this.operators.length > 0) {
      const op = this.operators.pop();
      const v2 = this.values.pop();
      const v1 = this.values.pop();
      this.values.push(applyOperator(v1, v2, op));
    }
  }

  suppressPart(number, operator, allowEquality) {
    while (
      this.operators.length > 0 &&
      (allowEquality
        ? operatorComparator(operator, this.operators[this.operators.length - 1]) >= 0
        : operatorComparator(operator, this.operators[this.operators.length - 1]) > 0)
    ) {
      const op = this.operators.pop();
      const v2 = this.values.pop();
      const v1 = this.values.pop();
      this.values.push(applyOperator(v1, v2, op));
    }
    this.operators.push(operator);
    this.values.push(number);
    return this;
  }

  add(number) {
    this.suppress();
    this.values.push(number);
    this.operators.push("+");
    return this;
  }

  subtract(number) {
    this.suppress();
    this.values.push(number);
    this.operators.push("-");
    return this;
  }

  multiply(number) {
    return this.suppressPart(number, "*", true);
  }

  devide(number) {
    return this.suppressPart(number, "/", true);
  }

  pow(number) {
    return this.suppressPart(number, "^", false);
  }

  valueOf() {
    this.suppress();
    return this.values[0];
  }
}

module.exports = SmartCalculator;
