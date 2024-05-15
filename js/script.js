/* Variable declarations */
const outputValue = document.querySelector("#output-value")
const numbers = document.querySelectorAll("input[type='button'][class='number']");
const operators = document.querySelectorAll("input[type='button'][class='operator']");
const del = document.querySelector("input[type='button'][class='delete special']");
const erase = document.querySelector("input[type='button'][class='erase special']");
const equal = document.querySelector("input[type='button'][class='equal special']");
const comma = document.querySelector("input[type='button'][class='comma']");


let currentInput = []; 
let [oldInput, operatorSelected] = [[0], ""];


/* Functions  */
function add(a, b) {
    return parseFloat(a) + parseFloat(b)
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b)
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b)
}

function divide(a, b) {
    return parseFloat(b) !== 0 ? parseFloat(a) / parseFloat(b) : "Good try !"
}

function power(a, b) {
    return parseFloat(a) ** parseFloat(b)
}

function showInputs() {
    let outputToShow = currentInput.join("");
    return currentInput.length === 0 ? outputValue.textContent = "0" : 
                                    outputValue.textContent = `${outputToShow}`
}


function clearOutput(){
    currentInput = [];
    oldInput = [];
    operatorSelected = "";
    showInputs();
}

function deleteOutput(){
    currentInput.pop();
    showInputs();
}

function assignOperator(operator) {
    operatorSelected = operator;
}

function operate(firstValue, operator, secondeValue) {
    firstValue = firstValue.join("");
    secondeValue = secondeValue.join("");
    switch(operator) {
        case "+":
            return add(firstValue,secondeValue);
            break;
        case "-": 
            return subtract(firstValue, secondeValue);
            break;
        case "x":
            return multiply(firstValue, secondeValue);
            break;
        case "/": 
            return divide(firstValue, secondeValue)
            break;
        case "exp": 
            return power(firstValue, secondeValue);
            break;
        default:
            alert("Error !")
    }
}



/* Code */
numbers.forEach(number => number.addEventListener("click", event => {
    if (currentInput.length < 20) {
        currentInput.push(event.target.value);
    }
    showInputs();
}
));

operators.forEach(operator => operator.addEventListener("click", event => {
    if (operatorSelected.length === 0) { 
        operatorSelected = event.target.value
    } 
    
    if (currentInput.length === 0) {
        currentInput = Array.from(String(operate(oldInput, operatorSelected, [0])), (number) => number);
        showInputs();
        oldInput = currentInput;
        currentInput = []; 
    } else {
        currentInput = Array.from(String(operate(oldInput, operatorSelected, currentInput)), (number) => number);
        showInputs();
        oldInput = currentInput;
        currentInput = []; 
    }   
    operatorSelected = event.target.value;
    /* urrentInput = Array.from(String(operate(oldInput, operatorSelected, currentInput)), (number) => number); */

}))

erase.addEventListener("click", clearOutput);
del.addEventListener("click", deleteOutput);
comma.addEventListener("click", event => {
    if (!currentInput.includes(".")) {
        currentInput.push(event.target.value);
        showInputs();
    }
})

equal.addEventListener("click", event => {
    currentInput = currentInput = Array.from(String(operate(oldInput, operatorSelected, currentInput)), (number) => number);
    showInputs();
    oldInput = currentInput;
    currentInput = [];
})

/* For debugging */ 

const allKeys = document.querySelectorAll("input");

allKeys.forEach(key => key.addEventListener("click", event => {
    console.log("current Input :", currentInput.join(""));
    console.log("last Input : ", oldInput.join(""));
    console.log("Operator selected :", operatorSelected);
}))

