function operate(a,b, operator) {
    if (operator === "+") {
        return a + b;
    } else if (operator === "-") {
        return a - b;
    } else if (operator === "*") {
        return a * b;
    } else if (operator === "/") {
        if(b === 0) {
            return 'lmao';
        } else {
        return a / b;
        } 
    }
}

// const screen = document.querySelector('.display');
// const numbers = document.querySelectorAll('div.numbers button')
// const operators = document.querySelectorAll('div.operators button')
const buttons = document.querySelectorAll('button');

let displayValue = '0';
// let x = [];
// let results = 0;
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

function updateScreen() {
    const screen = document.querySelector('.screen');
    screen.textContent = displayValue;
    if(displayValue.length > 9) {
            screen.textContent = displayValue.substring(0,9);
    }
}

updateScreen();

function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                updateScreen();
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                inputEquals();
                updateScreen();
            } else if(buttons[i].classList.contains('clear')) {
                clearScreen();
                updateScreen();
            } else {
                console.log("yoyoyo");
            }
        })
    }
}

clickButton();

function inputOperand(operand) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
        //1st click = handles first operand input
            displayValue = operand;
        } else if(displayValue === firstOperand) {
        //starts new operation after inputEquals()
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        //3rd/5th click - inputs to secondOperand
        if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        //4th click - handles input of second operator
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        console.log(result); //check
        displayValue = roundAccurately(result,15).toString();
        firstOperand = displayValue;
        result = null;
        console.log(result); //check
    } else if(firstOperator != null && secondOperator != null) {
        //6th click - new secondOperator
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand),secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else {
        //2nd click - handles first operator input
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    if(secondOperator != null) {
        //handles final result
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result,15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //handles first operation
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }   
}

function clearScreen() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

// operators.forEach((button) => { 
//     button.addEventListener('click', () => {
//         if (button.id === "=") {
//             x.push({
//                 operator: button.id,
//                 displayValue: Number(screen.textContent),
//             });
//             for (let i = 0; i < x.length-1; i++) {
//                 // if () {
//                     // console.log(x.length)
//                     console.log(firstOperant = operate((x[i].operator),(x[i].displayValue),(x[i+1].displayValue)));
//                     // console.log(results += operate((x[i].operator), (firstOperant),(x[i+1].displayValue)));
//                 // } else {
//                 //     console.log(x.length-1)
//                 // }
//             }
//         } else {
//             x.push({
//                 operator: button.id,
//                 displayValue: Number(firstOperant),
//                 });
//                 console.log(x);
//                 console.log(x[0].displayValue)
//                 // screen.textContent = button.id; 
//             };
//         }
//     )
// });


// numbers.forEach((button) => { 
//     button.addEventListener('click', () => { 
//         // if (x.displayValue === '+' || screen.textContent === '-' || screen.textContent === '/'|| screen.textContent === '*') {
//         // screen.textContent = button.id;
//         // }
//         // else {
//         if (firstOperant.length === 0) {
//         firstOperant += button.id;
//         console.log(secondOperant);
//         console.log(firstOperant.length);
//         } else {
//         // secondOperant += button.id;
//         // console.log(secondOperant)
//         // console.log(firstOperant);
//         }
//         }
//         // }
//     ); 
// });  

// const equal = document.getElementById('=');
//     equal.addEventListener('click', () => {
//         for (let i = 0; i < x.length; i++) {
//             if (x[x.length-1]) 
//             console.log(results += operate((x[i].operator),(x[i].displayValue),(x[i+1].displayValue)));
//         }     
//     })

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

// const clearBtn = document.querySelector('.clear');
// clearBtn.addEventListener('click', () => {
//     screen.textContent = '';
//     x = [];
//     results = 0;
//     });

