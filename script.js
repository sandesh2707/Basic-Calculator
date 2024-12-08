let screenValue = "0";

function updateScreen() {
    const screen = document.getElementById("output");
    screen.innerText = screenValue;
}

function appendToScreen(value) {
    if (screenValue === "0" && value !== ".") {
        screenValue = value;
    } else {
        screenValue += value;
    }
    updateScreen();
}

function clearScreen() {
    screenValue = "0";
    updateScreen();
}

function evaluateExpression() {
    try {
        let result = eval(screenValue.replace("%", "/100"));
        if (!isFinite(result)) {
            screenValue = "Error";
        } else {
            screenValue = parseFloat(result.toFixed(4)).toString();
        }
    } catch (error) {
        screenValue = "Error";
    }
    updateScreen();
}


function deleteLastCharacter() {
    screenValue = screenValue.length === 1 ? "0" : screenValue.slice(0, -1);
    updateScreen();
}

function toggleSign() {
    if (screenValue.startsWith("-")) {
        screenValue = screenValue.slice(1);
    } else if (screenValue !== "0") {
        screenValue = `-${screenValue}`;
    }
    updateScreen();
}

function handleKeyPress(event) {
    const key = event.key;
    if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        appendToScreen(key);
    } else if (key === "Enter") {
        evaluateExpression();
    } else if (key === "Backspace") {
        deleteLastCharacter();
    } else if (key === "Escape") {
        clearScreen();
    }
}

document.addEventListener("keydown", handleKeyPress);
updateScreen();
