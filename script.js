"use strict";

const STR_DIGIT_0 = "0";
const STR_DIGIT_1 = "1";
const STR_DIGIT_2 = "2";
const STR_DIGIT_3 = "3";
const STR_DIGIT_4 = "4";
const STR_DIGIT_5 = "5";
const STR_DIGIT_6 = "6";
const STR_DIGIT_7 = "7";
const STR_DIGIT_8 = "8";
const STR_DIGIT_9 = "9";
const STR_DECIMAL_POINT = ".";
const STR_MINUS_SIGN = "-";
const STR_ADDITION = "+";
const STR_SUBTRACTION = "−";
const STR_MULTIPLICATION = "×";
const STR_DIVISION = "÷";
const STR_POWER = "<span>x<sup>y</sup></span>";

// ButtonCode /////////////////////////////////////////////////////////////////
const BTN_CODE_NUM_DIGIT_0 = 0;
const BTN_CODE_NUM_DIGIT_1 = 1;
const BTN_CODE_NUM_DIGIT_2 = 2;
const BTN_CODE_NUM_DIGIT_3 = 3;
const BTN_CODE_NUM_DIGIT_4 = 4;
const BTN_CODE_NUM_DIGIT_5 = 5;
const BTN_CODE_NUM_DIGIT_6 = 6;
const BTN_CODE_NUM_DIGIT_7 = 7;
const BTN_CODE_NUM_DIGIT_8 = 8;
const BTN_CODE_NUM_DIGIT_9 = 9;
const BTN_CODE_NUM_DECIMAL_POINT = 10;
const BTN_CODE_NUM_SIGN = 11;
const BTN_CODE_OP_ADDITION = 100;
const BTN_CODE_OP_SUBTRACTION = 101;
const BTN_CODE_OP_MULTIPLICATION = 102;
const BTN_CODE_OP_DIVISION = 103;
const BTN_CODE_OP_POWER = 104;
const BTN_CODE_CMD_CALCULATE = 200;
const BTN_CODE_CMD_CLEAR = 201;
const BTN_CODE_CMD_CLEAR_ENTRY = 202;

// NumberController ///////////////////////////////////////////////////////////
const MAX_NUM_INTEGER_PART_SIZE = 6;
const MAX_NUM_DECIMAL_PART_SIZE = 3;
const NUM_RADIX = 10;
const NUM_DECIMAL_PART_FACTOR = Math.pow(NUM_RADIX, MAX_NUM_DECIMAL_PART_SIZE);

const STR_DIGIT_MAP = [
  STR_DIGIT_0,
  STR_DIGIT_1,
  STR_DIGIT_2,
  STR_DIGIT_3,
  STR_DIGIT_4,
  STR_DIGIT_5,
  STR_DIGIT_6,
  STR_DIGIT_7,
  STR_DIGIT_8,
  STR_DIGIT_9,
];

class NumberController {
  #isMinusSignSet;
  #isDecimalPointSet;
  #integerPart;
  #decimalPart;

  constructor() {
    this.#isMinusSignSet = false;
    this.#isDecimalPointSet = false;
    this.#integerPart = [];
    this.#decimalPart = [];
  }

  clear() {
    this.#isMinusSignSet = false;
    this.#isDecimalPointSet = false;
    this.#integerPart.length = 0;
    this.#decimalPart.length = 0;
  }

  isEmpty() {
    return (
      !this.#isMinusSignSet &&
      !this.#isDecimalPointSet &&
      this.#integerPart.length === 0 &&
      this.#decimalPart.length === 0
    );
  }

  normalize() {
    for (let i = this.#decimalPart.length - 1; i >= 0; --i) {
      if (this.#decimalPart[i] === STR_DIGIT_0) {
        this.#decimalPart.pop();
      }
    }
    if (this.#decimalPart.length === 0) {
      this.#isDecimalPointSet = false;
    }
    if (
      this.#decimalPart.length === 0 &&
      this.#integerPart.length === 1 &&
      this.#integerPart[0] === STR_DIGIT_0
    ) {
      this.#integerPart.pop();
    }
    if (this.#integerPart.length === 0 && this.#decimalPart.length === 0) {
      this.#isMinusSignSet = false;
    }
  }

  getString() {
    const sign = this.#isMinusSignSet ? STR_MINUS_SIGN : "";
    const decimalPoint = this.#isDecimalPointSet ? STR_DECIMAL_POINT : "";
    let integerPart = this.#integerPart.join("");
    if (integerPart === "") {
      integerPart = STR_DIGIT_0;
    }
    const decimalPart = this.#decimalPart.join("");
    return `${sign}${integerPart}${decimalPoint}${decimalPart}`;
  }

  getNumber() {
    return Number(this.getString());
  }

  setNumber(number) {
    this.clear();
    if (number < 0) {
      this.#isMinusSignSet = true;
      number = -number;
    }
    this.#isDecimalPointSet = true;
    let remain = number % 1;
    this.#convertInteger(Math.floor(number), this.#integerPart);
    this.#convertInteger(
      Math.round(remain * NUM_DECIMAL_PART_FACTOR),
      this.#decimalPart
    );
    this.normalize();
  }

  #convertInteger(number, part) {
    while (number > 0) {
      let remain = number % NUM_RADIX;
      number = (number - remain) / NUM_RADIX;
      part.push(STR_DIGIT_MAP[remain]);
    }
    part.reverse();
  }

  processButtonClick(btnCode) {
    switch (btnCode) {
      case BTN_CODE_NUM_DIGIT_0: {
        this.#pushDigit(STR_DIGIT_0);
        break;
      }
      case BTN_CODE_NUM_DIGIT_1: {
        this.#pushDigit(STR_DIGIT_1);
        break;
      }
      case BTN_CODE_NUM_DIGIT_2: {
        this.#pushDigit(STR_DIGIT_2);
        break;
      }
      case BTN_CODE_NUM_DIGIT_3: {
        this.#pushDigit(STR_DIGIT_3);
        break;
      }
      case BTN_CODE_NUM_DIGIT_4: {
        this.#pushDigit(STR_DIGIT_4);
        break;
      }
      case BTN_CODE_NUM_DIGIT_5: {
        this.#pushDigit(STR_DIGIT_5);
        break;
      }
      case BTN_CODE_NUM_DIGIT_6: {
        this.#pushDigit(STR_DIGIT_6);
        break;
      }
      case BTN_CODE_NUM_DIGIT_7: {
        this.#pushDigit(STR_DIGIT_7);
        break;
      }
      case BTN_CODE_NUM_DIGIT_8: {
        this.#pushDigit(STR_DIGIT_8);
        break;
      }
      case BTN_CODE_NUM_DIGIT_9: {
        this.#pushDigit(STR_DIGIT_9);
        break;
      }
      case BTN_CODE_NUM_DECIMAL_POINT: {
        if (!this.#isDecimalPointSet) {
          this.#isDecimalPointSet = true;
        }
        break;
      }
      case BTN_CODE_NUM_SIGN: {
        this.#isMinusSignSet = !this.#isMinusSignSet;
        break;
      }
      case BTN_CODE_CMD_CLEAR_ENTRY: {
        if (this.#decimalPart.length > 0) {
          this.#decimalPart.pop();
        } else if (this.#isDecimalPointSet) {
          this.#isDecimalPointSet = false;
        } else if (this.#integerPart.length > 0) {
          this.#integerPart.pop();
        } else if (this.#isMinusSignSet) {
          this.#isMinusSignSet = false;
        }
        break;
      }
    }
  }

  #pushDigit(digitStr) {
    if (!this.#isDecimalPointSet) {
      if (this.#integerPart.length === 0 && digitStr === STR_DIGIT_0) {
        return;
      }
      if (this.#integerPart.length < MAX_NUM_INTEGER_PART_SIZE) {
        this.#integerPart.push(digitStr);
      }
    } else {
      if (this.#decimalPart.length < MAX_NUM_DECIMAL_PART_SIZE) {
        this.#decimalPart.push(digitStr);
      }
    }
  }
}

// ExpressionController ///////////////////////////////////////////////////////
class ExpressionController {
  #operatorStr;
  #operation;
  #isLeftOperandSet;
  #leftOperand;
  #rightOperand;

  constructor() {
    this.#operatorStr = "";
    this.#operation = null;
    this.#isLeftOperandSet = false;
    this.#leftOperand = new NumberController();
    this.#rightOperand = new NumberController();
  }

  clear() {
    this.#operatorStr = "";
    this.#operation = null;
    this.#isLeftOperandSet = false;
    this.#leftOperand.clear();
    this.#rightOperand.clear();
  }

  getOperatorString() {
    return this.#operatorStr;
  }

  getLeftOperandString() {
    return this.#isLeftOperandSet ? this.#leftOperand.getString() : "";
  }

  getRightOperandString() {
    return this.#rightOperand.getString();
  }

  processButtonClick(btnCode) {
    switch (btnCode) {
      case BTN_CODE_OP_ADDITION: {
        this.#pushOperator(STR_ADDITION, ExpressionController.#addition);
        break;
      }
      case BTN_CODE_OP_SUBTRACTION: {
        this.#pushOperator(STR_SUBTRACTION, ExpressionController.#subtraction);
        break;
      }
      case BTN_CODE_OP_MULTIPLICATION: {
        this.#pushOperator(
          STR_MULTIPLICATION,
          ExpressionController.#multiplication
        );
        break;
      }
      case BTN_CODE_OP_DIVISION: {
        this.#pushOperator(STR_DIVISION, ExpressionController.#division);
        break;
      }
      case BTN_CODE_OP_POWER: {
        this.#pushOperator(STR_POWER, ExpressionController.#power);
        break;
      }
      case BTN_CODE_CMD_CLEAR: {
        this.clear();
        break;
      }
      case BTN_CODE_CMD_CLEAR_ENTRY: {
        if (!this.#rightOperand.isEmpty()) {
          this.#rightOperand.processButtonClick(btnCode);
        } else if (this.#operatorStr !== "") {
          this.#operatorStr = "";
          this.#operation = null;
          this.#swapOperands();
          this.#isLeftOperandSet = false;
        }
        break;
      }
      case BTN_CODE_CMD_CALCULATE: {
        if (this.#isLeftOperandSet) {
          const left = this.#leftOperand.getNumber();
          const right = this.#rightOperand.getNumber();
          const result = this.#operation(left, right);
          this.clear();
          this.#rightOperand.setNumber(result);
        }
        break;
      }
      default: {
        this.#rightOperand.processButtonClick(btnCode);
        break;
      }
    }
  }

  #pushOperator(operatorStr, operation) {
    if (!this.#isLeftOperandSet) {
      this.#swapOperands();
      this.#leftOperand.normalize();
      this.#isLeftOperandSet = true;
    }
    this.#operatorStr = operatorStr;
    this.#operation = operation;
  }

  #swapOperands() {
    let tmp = this.#leftOperand;
    this.#leftOperand = this.#rightOperand;
    this.#rightOperand = tmp;
  }

  static #addition(x, y) {
    return x + y;
  }

  static #subtraction(x, y) {
    return x - y;
  }

  static #multiplication(x, y) {
    return x * y;
  }

  static #division(x, y) {
    return x / y;
  }

  static #power(x, y) {
    return Math.pow(x, y);
  }
}

// Calculator /////////////////////////////////////////////////////////////////
class Calculator {
  constructor() {
    const btnInfos = [
      ["btn-num-digit-0", BTN_CODE_NUM_DIGIT_0],
      ["btn-num-digit-1", BTN_CODE_NUM_DIGIT_1],
      ["btn-num-digit-2", BTN_CODE_NUM_DIGIT_2],
      ["btn-num-digit-3", BTN_CODE_NUM_DIGIT_3],
      ["btn-num-digit-4", BTN_CODE_NUM_DIGIT_4],
      ["btn-num-digit-5", BTN_CODE_NUM_DIGIT_5],
      ["btn-num-digit-6", BTN_CODE_NUM_DIGIT_6],
      ["btn-num-digit-7", BTN_CODE_NUM_DIGIT_7],
      ["btn-num-digit-8", BTN_CODE_NUM_DIGIT_8],
      ["btn-num-digit-9", BTN_CODE_NUM_DIGIT_9],
      ["btn-num-decimal-point", BTN_CODE_NUM_DECIMAL_POINT],
      ["btn-num-sign", BTN_CODE_NUM_SIGN],
      ["btn-op-addition", BTN_CODE_OP_ADDITION],
      ["btn-op-subtraction", BTN_CODE_OP_SUBTRACTION],
      ["btn-op-multiplication", BTN_CODE_OP_MULTIPLICATION],
      ["btn-op-division", BTN_CODE_OP_DIVISION],
      ["btn-op-power", BTN_CODE_OP_POWER],
      ["btn-cmd-calculate", BTN_CODE_CMD_CALCULATE],
      ["btn-cmd-clear", BTN_CODE_CMD_CLEAR],
      ["btn-cmd-clear-entry", BTN_CODE_CMD_CLEAR_ENTRY],
    ];

    const exprCtrl = new ExpressionController();
    for (const btnInfo of btnInfos) {
      const [btnId, btnCode] = btnInfo;
      document.getElementById(btnId).addEventListener("click", () => {
        exprCtrl.processButtonClick(btnCode);
        document.getElementById("disp-operator").innerHTML =
          exprCtrl.getOperatorString();
        document.getElementById("disp-left-operand").textContent =
          exprCtrl.getLeftOperandString();
        document.getElementById("disp-right-operand").textContent =
          exprCtrl.getRightOperandString();
      });
    }
  }
}

// Main ///////////////////////////////////////////////////////////////////////
// const main = () => {
//   const dataArr = [
//     ["btn-num-digit-0", BTN_CODE_NUM_DIGIT_0],
//     ["btn-num-digit-1", BTN_CODE_NUM_DIGIT_1],
//     ["btn-num-digit-2", BTN_CODE_NUM_DIGIT_2],
//     ["btn-num-digit-3", BTN_CODE_NUM_DIGIT_3],
//     ["btn-num-digit-4", BTN_CODE_NUM_DIGIT_4],
//     ["btn-num-digit-5", BTN_CODE_NUM_DIGIT_5],
//     ["btn-num-digit-6", BTN_CODE_NUM_DIGIT_6],
//     ["btn-num-digit-7", BTN_CODE_NUM_DIGIT_7],
//     ["btn-num-digit-8", BTN_CODE_NUM_DIGIT_8],
//     ["btn-num-digit-9", BTN_CODE_NUM_DIGIT_9],
//     ["btn-num-decimal-point", BTN_CODE_NUM_DECIMAL_POINT],
//     ["btn-num-sign", BTN_CODE_NUM_SIGN],
//     ["btn-op-addition", BTN_CODE_OP_ADDITION],
//     ["btn-op-subtraction", BTN_CODE_OP_SUBTRACTION],
//     ["btn-op-multiplication", BTN_CODE_OP_MULTIPLICATION],
//     ["btn-op-division", BTN_CODE_OP_DIVISION],
//     ["btn-op-power", BTN_CODE_OP_POWER],
//     ["btn-cmd-calculate", BTN_CODE_CMD_CALCULATE],
//     ["btn-cmd-clear", BTN_CODE_CMD_CLEAR],
//     ["btn-cmd-clear-entry", BTN_CODE_CMD_CLEAR_ENTRY],
//   ];

//   const exprCtrl = new ExpressionController();
//   for (const data of dataArr) {
//     const [id, btnCode] = data;
//     if (!document.getElementById(id)) {
//       console.log("False id");
//     }
//     document.getElementById(id).addEventListener("click", () => {
//       exprCtrl.processButtonClick(btnCode);
//       document.getElementById("disp-operator").innerHTML =
//         exprCtrl.getOperatorString();
//       document.getElementById("disp-left-operand").textContent =
//         exprCtrl.getLeftOperandString();
//       document.getElementById("disp-right-operand").textContent =
//         exprCtrl.getRightOperandString();
//     });
//   }
// };

// main();

const calculator = new Calculator();
