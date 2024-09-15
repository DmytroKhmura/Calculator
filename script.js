// Check //////////////////////////////////////////////////////////////////////
class Check {
  static checkId(id) {
    if (typeof id !== "string") throw new TypeError("Invalid <id> type.");
    if (id.length === 0) throw new RangeError("Invalid <id> value.");
  }

  static checkSymbol(symbol) {
    if (typeof symbol !== "string")
      throw new TypeError("Invalid <symbol> type.");
    if (symbol.length !== 1) throw new RangeError("Invalid <symbol> value.");
  }
}

// Display ////////////////////////////////////////////////////////////////////
class Display {
  #id;
  #domElement;
  #symbolBuffer;

  constructor(id) {
    Check.checkId(id);
    this.#id = id;
    this.#domElement = document.getElementById(id);
    this.#symbolBuffer = [];
  }

  get id() {
    return this.#id;
  }

  outputSymbol(symbol) {
    Check.checkSymbol(symbol);
    this.#symbolBuffer.push(symbol);
    this.#displaySymbols();
  }

  removeLastSymbol() {
    this.#symbolBuffer.pop();
    this.#displaySymbols();
  }

  clear() {
    while (this.#symbolBuffer.length > 0) {
      this.#symbolBuffer.pop();
    }
    this.#displaySymbols();
  }

  #displaySymbols() {
    this.#domElement.textContent = this.#symbolBuffer.join("");
  }
}

const display = new Display("display");

// InputButton ////////////////////////////////////////////////////////////////
class InputButton {
  #id;

  constructor(id, symbol) {
    Check.checkId(id);
    Check.checkSymbol(symbol);

    this.#id = id;
    document.getElementById(id).addEventListener("click", () => {
      display.outputSymbol(symbol);
    });
  }

  get id() {
    return this.#id;
  }
}

const inputButtons = [
  new InputButton("digit-0", "0"),
  new InputButton("digit-1", "1"),
  new InputButton("digit-2", "2"),
  new InputButton("digit-3", "3"),
  new InputButton("digit-4", "4"),
  new InputButton("digit-5", "5"),
  new InputButton("digit-6", "6"),
  new InputButton("digit-7", "7"),
  new InputButton("digit-8", "8"),
  new InputButton("digit-9", "9"),
  new InputButton("decimal-point", "."),
  new InputButton("sign", "±"),
  new InputButton("op-division", "/"),
  new InputButton("op-multiplication", "*"),
  new InputButton("op-subtraction", "-"),
  new InputButton("op-addition", "+"),
  new InputButton("op-power", "^"),
];

// CommandButton //////////////////////////////////////////////////////////////
class CommandButton {
  #id;

  constructor(id, callback) {
    Check.checkId(id);
    this.#id = id;
    document.getElementById(id).addEventListener("click", callback);
  }

  get id() {
    return this.#id;
  }
}

const commandButtons = [
  new CommandButton("cmd-clear-entry", () => {
    display.removeLastSymbol();
  }),
  new CommandButton("cmd-clear", () => {
    display.clear();
  }),
  new CommandButton("cmd-calculate", () => {
    alert("Calculation in progress...");
  }),
];
