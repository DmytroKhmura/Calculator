class Display {
  #id;
  #domElement;
  #symbolBuffer;

  constructor(id) {
    this.#id = id;
    this.#domElement = document.getElementById(id);
    this.#symbolBuffer = [];
  }

  get id() {
    return this.#id;
  }

  outputSymbol(symbol) {
    this.#symbolBuffer.push(symbol);
    this.#displaySymbols();
  }

  removeLastSymbol() {
    this.#symbolBuffer.pop();
    this.#displaySymbols();
  }

  #displaySymbols() {
    this.#domElement.textContent = this.#symbolBuffer.join("");
  }
}

const display = new Display("display");

class InputButton {
  #id;

  constructor(id, symbol) {
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
  new InputButton("op-left-bracket", "("),
  new InputButton("op-right-bracket", ")"),
  new InputButton("op-division", "/"),
  new InputButton("op-multiplication", "*"),
  new InputButton("op-subtraction", "-"),
  new InputButton("op-addition", "+"),
  new InputButton("op-power", "^"),
];

class CommandButton {
  #id;

  constructor(id, callback) {
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
  new CommandButton("cmd-calculate", () => {
    alert("Calculation in progress...");
  }),
];
