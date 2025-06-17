//Retrieve all necessary DOM elements as variables, for later uses :
const displayArea = document.querySelector("#displayArea");
const buttonsContainer = document.querySelector("#buttonsContainer");
const buttonClear = document.querySelector("#bClear");
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
            console.log("not here ???");
            tick(ADD);
            break;
        }
        case buttonEqual: {
            tick(EQUAL);
            break;
        }
        case buttonClear: {
            reset();
            break;
        }
    }
};
buttonsContainer.addEventListener("click", handleClick);

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

function tick(value) {
    switch (state) {
        case STATE_INPUTING_OPERAND1: {
            if(error) {
                clearError();
            }
            if (!isNaN(Number(value))) {
                if (operand1 == "") {
                    operand1 = value;
                } else {
                    operand1 = operand1 + value;
                }
            }
            if (operand1 != "") {
                if (value == ADD | value == SUBSTRACT | value == MULTIPLY | value == DIVIDE) {
                    operation = value;
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
            if (operand2 == "") {
                //Change the operation actually :
                if (value == ADD | value == SUBSTRACT | value == MULTIPLY | value == DIVIDE) {
                    operation = value;
                }
            } else {
                //Pressing operation button or equal will make operation to apply :
                if (value == ADD | value == SUBSTRACT | value == MULTIPLY | value == DIVIDE) {
                    if (operation == DIVIDE && Number(operand2) == 0) {
                        setError(ERROR_D_BY_0);
                        clearOperandsAndOperands();
                        state = STATE_INPUTING_OPERAND1;
                        
                    } else {
                        let result = applyOperation();
                        clearOperandsAndOperands();
                        operand1 = result;
                        operation = value;
                        state = STATE_INPUTING_OPERAND2;
                    }
                }
                if (value == EQUAL) {
                    if (operation == DIVIDE && Number(operand2) == 0) {
                        setError(ERROR_D_BY_0);
                        clearOperandsAndOperands();
                    } else {
                        let result = applyOperation();
                        clearOperandsAndOperands();
                        operand1 = result;
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
    displayExpression();
    state = STATE_INPUTING_OPERAND1;
}