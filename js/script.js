/* Variable declarations */
const inputsSection = document.querySelector("#output-value")
const numbers = document.querySelectorAll("input[type='button'][class='number']");
const operators = document.querySelectorAll("input[type='button'][class='operator']");
const del = document.querySelector("input[type='button'][class='delete special']");
const erase = document.querySelector("input[type='button'][class='erase special']");
const equal = document.querySelector("input[type='button'][class='equal special']");
const comma = document.querySelector("input[type='button'][class='comma']");
const negative = document.querySelector("input[type='button'][class='negative']");

//let a = ["1","3"] 
let currentInput = []; 
let totalInputs = [];
let activeOperator = "";



/* Functions  */
function add(a, b) {
    // a & b are strings 
    let round = roundFloats(a, b); //give 10 ** number of decimals to round to. 
    return Array.from(
        String(
        Math.round((parseFloat(a) + parseFloat(b)) * round) / round) // To return an array, transform float to string (String method) //Math.round((Calculations * round)/round) is to round floats.
    )
}

function subtract(a, b) {
    let round = roundFloats(a, b);
    return Array.from(
        String(
        Math.round((parseFloat(a) - parseFloat(b))* round) / round)
    )
}

function multiply(a, b) {
    let round = roundFloats(a, b);
    return Array.from(
        String(
        Math.round((parseFloat(a) * parseFloat(b)) * round) / round)
    )
}

function divide(a, b) {
    let round = roundFloats(a, b);
    return parseFloat(b) !== 0 ? 
    Array.from(String(Math.round((parseFloat(a) / parseFloat(b)) * round) / round)) : Array.from("Good try !")
}

function power(a, b) {
    return Array.from(
        String(parseFloat(a) ** parseFloat(b)))
}

function operations(firstValue, operator, secondeValue) {
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

function operate(firstValue, operator, secondValue) {

    if (totalInputs.length === 0) {
        totalInputs = currentInput;
        currentInput = []; 
    } else if (activeOperator === "" || currentInput.length === 0) {
        return
    } else {
        totalInputs = operations(firstValue, operator, secondValue);
        currentInput = [];
    }
}

function updateDisplay(inputsToDisplay) {
    let inputsToString = inputsToDisplay.join("");
    inputsToDisplay.length === 0 ? inputsSection.textContent = "0" : 
                                    inputsSection.textContent = `${inputsToString}`;
}

function verifyDisplayErrors() {
    if (!isNumber(totalInputs)) {
        currentInput = []; 
        totalInputs = [];
        activeOperator = "";
    }
}

function isNumber(arr) {
    let arrToString = arr.join(""); 
    return !isNaN(parseFloat(arrToString)) //return false if conversion of arr to number fails, else true.  
}

function clearDisplay(){
    currentInput = [];
    totalInputs = [];
    activeOperator = "";
    updateDisplay(currentInput);
}

function deleteInput(){
    currentInput.pop();
    updateDisplay(currentInput);
}


function toNegative() {
    currentInput.includes("-") ? currentInput.shift() : currentInput.unshift("-");
    updateDisplay(currentInput);
}

function roundFloats(a, b) {
    let numberOfFloatsA = 0;
    let numberOfFloatsB = 0;
    let max = 0;
    
    if (a.includes(".")) {
        numberOfFloatsA = a.slice(a.indexOf(".")+1)
                        .length;
        max = numberOfFloatsA >= numberOfFloatsB ? numberOfFloatsA : numberOfFloatsB;
    }

    if (b.includes(".")){
        numberOfFloatsB = b.slice(b.indexOf(".")+1)
                        .length;
        max = numberOfFloatsB >= numberOfFloatsA ? numberOfFloatsB : numberOfFloatsA;
    }
    
    return (10 ** max) // 10 ** number of max decimals in a and b.  
}

/* Code */
numbers.forEach(number => number.addEventListener("click", event => {
    if (currentInput.length < 20) {
        currentInput.push(event.target.value);
    }
    updateDisplay(currentInput);
}
));

operators.forEach(operator => operator.addEventListener("click", event => {

    operate(totalInputs, activeOperator, currentInput);
    activeOperator = event.target.value;
    updateDisplay(totalInputs);
    verifyDisplayErrors();        
}))

erase.addEventListener("click", clearDisplay);
del.addEventListener("click", deleteInput);
comma.addEventListener("click", event => {
    if (!currentInput.includes(".")) {
        currentInput.push(event.target.value);
        updateDisplay(currentInput);
    }
})

equal.addEventListener("click", event => {
    operate(totalInputs, activeOperator, currentInput);
    updateDisplay(totalInputs);
    verifyDisplayErrors(); 
})

negative.addEventListener("click", toNegative);

document.addEventListener("keyup", event => {
    let autorasedNumbers = "0123456789";
    let autorasedOperators = "-+*/"; 
    if (autorasedNumbers.includes(event.key)) {
        if (currentInput.length < 20) {
            currentInput.push(event.key);
        }
        updateDisplay(currentInput);
    } else if (autorasedOperators.includes(event.key)) {
        operate(totalInputs, activeOperator, currentInput);
        activeOperator = event.target.value;
        updateDisplay(totalInputs);
        verifyDisplayErrors();      
    }
})