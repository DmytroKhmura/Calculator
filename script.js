// Symbols ////////////////////////////////////////////////////////////////////
const SMB_NUM_DIGIT_0 = "0";
const SMB_NUM_DIGIT_1 = "1";
const SMB_NUM_DIGIT_2 = "2";
const SMB_NUM_DIGIT_3 = "3";
const SMB_NUM_DIGIT_4 = "4";
const SMB_NUM_DIGIT_5 = "5";
const SMB_NUM_DIGIT_6 = "6";
const SMB_NUM_DIGIT_7 = "7";
const SMB_NUM_DIGIT_8 = "8";
const SMB_NUM_DIGIT_9 = "9";
const SMB_NUM_DECIMAL_POINT = ".";
const SMB_NUM_SIGN = "s";
const SMB_OP_ADDITION = "+";
const SMB_OP_SUTRACTION = "-";
const SMB_OP_MULTIPLICATION = "*";
const SMB_OP_DIVISION = "/";
const SMB_OP_POWER = "^";
const SMB_CMD_CLEAR = "c";
const SMB_CMD_CLEAR_ENTRY = "x";
const SMB_CMD_CALCULATE = " ";

// NumberController ///////////////////////////////////////////////////////////
const MAX_NUM_INTEGER_PART_SIZE = 6;
const MAX_NUM_DECIMAL_PART_SIZE = 3;

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

  getString() {
    const sign = this.#isMinusSignSet ? "-" : "";
    const decimalPoint = this.#isDecimalPointSet ? "." : "";
    const integerPart = this.#integerPart.join("");
    const decimalPart = this.#decimalPart.join("");
    return `${sign}${integerPart}${decimalPoint}${decimalPart}`;
  }

  putSymbol(symbol) {
    switch (symbol) {
      case SMB_NUM_DIGIT_0:
      case SMB_NUM_DIGIT_1:
      case SMB_NUM_DIGIT_2:
      case SMB_NUM_DIGIT_3:
      case SMB_NUM_DIGIT_4:
      case SMB_NUM_DIGIT_5:
      case SMB_NUM_DIGIT_6:
      case SMB_NUM_DIGIT_7:
      case SMB_NUM_DIGIT_8:
      case SMB_NUM_DIGIT_9: {
        if (!this.#isDecimalPointSet) {
          if (this.#integerPart.length < MAX_NUM_INTEGER_PART_SIZE) {
            this.#integerPart.push(symbol);
          }
        } else {
          if (this.#decimalPart.length < MAX_NUM_DECIMAL_PART_SIZE) {
            this.#decimalPart.push(symbol);
          }
        }
        break;
      }
      case SMB_NUM_DECIMAL_POINT: {
        if (!this.#isDecimalPointSet) {
          this.#isDecimalPointSet = true;
        }
        break;
      }
      case SMB_NUM_SIGN: {
        this.#isMinusSignSet = !this.#isMinusSignSet;
        break;
      }
      case SMB_CMD_CLEAR_ENTRY: {
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
}

// MainController /////////////////////////////////////////////////////////////
class MainController {
  #operator;
  #leftOperand;
  #rightOperand;

  constructor() {
    this.#operator = undefined;
    this.#leftOperand = new NumberController();
    this.#rightOperand = new NumberController();
  }

  clear() {
    this.#operator = undefined;
    this.#leftOperand.clear();
    this.#rightOperand.clear();
  }

  putSymbol(symbol) {
    switch (symbol) {
      case SMB_OP_ADDITION:
      case SMB_OP_SUTRACTION:
      case SMB_OP_MULTIPLICATION:
      case SMB_OP_SUTRACTION:
      case SMB_OP_POWER: {
        this.#operator = symbol;
        break;
      }
      case SMB_CMD_CLEAR: {
        this.clear();
        break;
      }
      case SMB_CMD_CLEAR_ENTRY: {
        this.#rightOperand.putSymbol(symbol);
        break;
      }
      case SMB_CMD_CALCULATE: {
        break;
      }
      default: {
        this.#rightOperand.putSymbol(symbol);
        break;
      }
    }
    document.getElementById("display").textContent =
      this.#rightOperand.getString();
  }
}

// Main ///////////////////////////////////////////////////////////////////////
const dataArr = [
  ["num-digit-0", SMB_NUM_DIGIT_0],
  ["num-digit-1", SMB_NUM_DIGIT_1],
  ["num-digit-2", SMB_NUM_DIGIT_2],
  ["num-digit-3", SMB_NUM_DIGIT_3],
  ["num-digit-4", SMB_NUM_DIGIT_4],
  ["num-digit-5", SMB_NUM_DIGIT_5],
  ["num-digit-6", SMB_NUM_DIGIT_6],
  ["num-digit-7", SMB_NUM_DIGIT_7],
  ["num-digit-8", SMB_NUM_DIGIT_8],
  ["num-digit-9", SMB_NUM_DIGIT_9],
  ["num-decimal-point", SMB_NUM_DECIMAL_POINT],
  ["num-sign", SMB_NUM_SIGN],
  ["op-addition", SMB_OP_ADDITION],
  ["op-subtraction", SMB_OP_SUTRACTION],
  ["op-multiplication", SMB_OP_MULTIPLICATION],
  ["op-division", SMB_OP_DIVISION],
  ["op-power", SMB_OP_POWER],
  ["cmd-clear", SMB_CMD_CLEAR],
  ["cmd-clear-entry", SMB_CMD_CLEAR_ENTRY],
  ["cmd-calculate", SMB_CMD_CALCULATE],
];

const main = () => {
  const controller = new MainController();
  for (const data of dataArr) {
    const [id, symbol] = data;
    if (!document.getElementById(id)) {
      console.log("False id");
    }
    document.getElementById(id).addEventListener("click", () => {
      controller.putSymbol(symbol);
    });
  }
};

main();
