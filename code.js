//Retrieve all necessary DOM elements as variables, for later uses :
const displayArea = document.querySelector("#displayArea");
const buttonsContainer = document.querySelector("#buttonsContainer");
const buttonClear = document.querySelector("#bClear");
const buttonUndo = document.querySelector("#bUndo");
const button1 = document.querySelector("#b1");
const button2 = document.querySelector("#b2");
const button3 = document.querySelector("#b3");
const button4 = document.querySelector("#b4");
const button5 = document.querySelector("#b5");
const button6 = document.querySelector("#b6");
const button7 = document.querySelector("#b7");
const button8 = document.querySelector("#b8");
const button9 = document.querySelector("#b9");
const button0 = document.querySelector("#b0");
const buttonDot = document.querySelector("#bDot");
const buttonDivide = document.querySelector("#bDivide");
const buttonMultiply = document.querySelector("#bMultiply");
const buttonSubstract = document.querySelector("#bSubstract");
const buttonAdd = document.querySelector("#bAdd");
const buttonEqual = document.querySelector("#bEqual");

function handleClick(me) {
    switch (me.target) {
        case button0: {
            tick("0");
            break;
        }
        case button1: {
            tick("1");
            break;
        }
        case button2: {
            tick("2");
            break;
        }
        case button3: {
            tick("3");
            break;
        }
        case button4: {
            tick("4");
            break;
        }
        case button5: {
            tick("5");
            break;
        }
        case button6: {
            tick("6");
            break;
        }
        case button7: {
            tick("7");
            break;
        }
        case button8: {
            tick("8");
            break;
        }
        case button9: {
            tick("9");
            break;
        }
        case buttonDivide: {
            tick(DIVIDE);
            break;
        }
        case buttonMultiply: {
            tick(MULTIPLY);
            break;
        }
        case buttonSubstract: {
            tick(SUBSTRACT);
            break;
        }
        case buttonAdd: {
            tick(ADD);
            break;
        }
        case buttonEqual: {
            tick(EQUAL);
            break;
        }
        case buttonDot: {
            if (!willSkipButtonDot) {
                tick(DOT);
            }
            break;
        }
        case buttonClear: {
            reset();
            break;
        }
        case buttonUndo: {
            undo();
            break;
        }
    }
};
buttonsContainer.addEventListener("click", handleClick);
function handleKey(ke) {
    switch (ke.key) {
        case "0": {
            tick("0");
            break;
        }
        case "1": {
            tick("1");
            break;
        }
        case "2": {
            tick("2");
            break;
        }
        case "3": {
            tick("3");
            break;
        }
        case "4": {
            tick("4");
            break;
        }
        case "5": {
            tick("5");
            break;
        }
        case "6": {
            tick("6");
            break;
        }
        case "7": {
            tick("7");
            break;
        }
        case "8": {
            tick("8");
            break;
        }
        case "9": {
            tick("9");
            break;
        }
        case "/": {
            tick(DIVIDE);
            break;
        }
        case "*": {
            tick(MULTIPLY);
            break;
        }
        case "-": {
            tick(SUBSTRACT);
            break;
        }
        case "+": {
            tick(ADD);
            break;
        }
        case "=": {
            tick(EQUAL);
            break;
        }
        case "Enter": {
            tick(EQUAL);
            break;
        }
        case ".": {
            if (!willSkipButtonDot) {
                tick(DOT);
            }
            break;
        }
        case "c": {
            reset();
            break;
        }
        case "u": {
            undo();
            break;
        }
    }
}
document.addEventListener("keyup", handleKey);

let willSkipButtonDot = false;
function turnButtonDotOn() {
    buttonDot.classList.remove("isDisable");
    willSkipButtonDot = false;
}
function turnButtonDotOff() {
    buttonDot.classList.add("isDisable");
    willSkipButtonDot = true;
}

//Operation logics :
function add(x, y) {
    return (x + y);
}
function substract(x, y) {
    return (x - y);
}
function multiply(x, y) {
    return (x * y);
}
function divide(x, y) {
    //Divide by zero check comes before calling this function.
    return (x / y);
}
let operand1 = "";
let operand2 = "";
let operation = undefined;
const ADD = "ADD";
const SUBSTRACT = "SUBSTRACT";
const MULTIPLY = "MULTIPLY";
const DIVIDE = "DIVIDE";
const EQUAL = "EQUAL";
const DOT = "DOT";

function clearOperandsAndOperands() {
    operand1 = "";
    operand2 = "";
    operation = undefined;
}
function applyOperation() {
    //The state machine makes sure everything is ok,
    //there must be no problem to apply operation
    //even divide by 0 is done before.
    switch (operation) {
        case ADD: {
            return (add(Number(operand1), Number(operand2)));
        }
        case SUBSTRACT: {
            return (substract(Number(operand1), Number(operand2)));
        }
        case MULTIPLY: {
            return (multiply(Number(operand1), Number(operand2)));
        }
        case DIVIDE: {
            return (divide(Number(operand1), Number(operand2)));
        }
    }
}

//The calculator is implemented as a state machine.
const STATE_INPUTING_OPERAND1 = "SIO1";
const STATE_INPUTING_OPERAND2 = "SIO2";
let state = STATE_INPUTING_OPERAND1;
//Allow the result of a previous operation to be used as operand1 of the current operation.
//Reset le whole operand1 if the user enter a new number instead of an operation.
let isChainingOperation = false;
function tick(value) {
    switch (state) {
        case STATE_INPUTING_OPERAND1: {
            if (error) {
                clearError();
            }
            if (!isNaN(Number(value))) {
                if (isChainingOperation) {
                    operand1 = "";
                    isChainingOperation = false;
                }
                if (operand1 == "") {
                    operand1 = value;
                } else {
                    operand1 = operand1 + value;
                }
            }
            if (value == DOT) {
                if (isChainingOperation) {
                    operand1 = "";
                    isChainingOperation = false;
                }
                if (operand1 == "") {
                    operand1 = "0.";
                } else {
                    operand1 = operand1 + ".";
                }
                turnButtonDotOff();
            }
            if (operand1 != "") {
                if (value == ADD || value == SUBSTRACT || value == MULTIPLY || value == DIVIDE) {
                    operation = value;
                    if (willSkipButtonDot) {
                        turnButtonDotOn();
                    }
                    state = STATE_INPUTING_OPERAND2;
                }
            }
            break;
        }
        case STATE_INPUTING_OPERAND2: {
            if (!isNaN(Number(value))) {
                if (operand2 == "") {
                    operand2 = value;
                } else {
                    operand2 = operand2 + value;
                }
            }
            if (value == DOT) {
                if (operand2 == "") {
                    operand2 = "0.";
                } else {
                    operand2 = operand2 + ".";
                }
                turnButtonDotOff();
            }
            if (operand2 == "") {
                //Change the operation actually :
                if (value == ADD || value == SUBSTRACT || value == MULTIPLY || value == DIVIDE) {
                    operation = value;
                }
            } else {
                //Pressing operation button or equal will make operation to apply :
                if (value == ADD || value == SUBSTRACT || value == MULTIPLY || value == DIVIDE) {
                    if (operation == DIVIDE && Number(operand2) == 0) {
                        setError(ERROR_D_BY_0);
                        clearOperandsAndOperands();
                        state = STATE_INPUTING_OPERAND1;
                    } else {
                        let result = applyOperation();
                        clearOperandsAndOperands();
                        operand1 = result.toString();
                        operation = value;
                        state = STATE_INPUTING_OPERAND2;
                    }
                    if (operand1 != "" && Number.isInteger(Number(operand1))) {
                        if (willSkipButtonDot) {
                            turnButtonDotOn();
                        }
                    }
                }
                if (value == EQUAL) {
                    if (operation == DIVIDE && Number(operand2) == 0) {
                        setError(ERROR_D_BY_0);
                        clearOperandsAndOperands();
                    } else {
                        let result = applyOperation();
                        clearOperandsAndOperands();
                        operand1 = result.toString();
                        isChainingOperation = true;
                    }
                    if (willSkipButtonDot) {
                        turnButtonDotOn();
                    }
                    state = STATE_INPUTING_OPERAND1;
                }
            }
            break;
        }
    }
    displayExpression();
}
let error = undefined;
const ERROR_D_BY_0 = "Divide by zéro!";
function setError(message) {
    error = message;
}
function clearError(message) {
    error = undefined;
}
function hasError() {
    return ((error != undefined) ? true : false);
}
const NUMBER_OF_DECIMALS = 5;
function displayExpression() {
    let text = "";
    if (hasError()) {
        text = error;
    } else {
        if (operand1 != undefined) {
            text = text + operand1;
        }
        if (operation != undefined) {
            if (operation == ADD) {
                text = text + " + ";
            }
            if (operation == SUBSTRACT) {
                text = text + " - ";
            }
            if (operation == MULTIPLY) {
                text = text + " x ";
            }
            if (operation == DIVIDE) {
                text = text + " / ";
            }
        }
        if (operand2 != undefined) {
            text = text + operand2;
        }
    }
    displayArea.textContent = text;
}
function reset() {
    clearOperandsAndOperands();
    clearError();
    if (willSkipButtonDot) {
        turnButtonDotOn();
    }
    displayExpression();
    state = STATE_INPUTING_OPERAND1;
}
function undo() {
    switch (state) {
        case STATE_INPUTING_OPERAND1: {
            if (operand1 != "") {
                operand1 = operand1.slice(0, -1);
                if (willSkipButtonDot) {
                    if (Number.isInteger(Number(operand1)) && operand1.charAt(operand1.length - 1) != ".") {
                        turnButtonDotOn();
                    }
                }
            }
            break;
        }
        case STATE_INPUTING_OPERAND2: {
            if (operand2 != "") {
                operand2 = operand2.slice(0, -1);
                if (willSkipButtonDot) {
                    if (Number.isInteger(Number(operand2)) && operand1.charAt(operand1.length - 1) != ".") {
                        turnButtonDotOn();
                    }
                }
            } else if (operation != undefined) {
                operation = undefined;
                state = STATE_INPUTING_OPERAND1;
            }
            break;
        }
    }
    displayExpression();
}