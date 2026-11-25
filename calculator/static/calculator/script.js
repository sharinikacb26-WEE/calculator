
const input = document.getElementById("input");
const result = document.getElementById("result");

let expression = "";

document.querySelectorAll(".buttons button").forEach(button => {
    button.addEventListener("click", () => {

        let value = button.textContent;

        if (value === "C") {
            expression = "";
            input.textContent = "0";
            result.textContent = "";
        }

        else if (value === "DEL") {
            expression = expression.slice(0, -1);
            input.textContent = expression || "0";
            result.textContent = "";
        }

        else if (value === "=") {
            calculate();
        }

        else {
            let operator = ["+", "−", "×", "÷"];

            if (operator.includes(value)) {
                value = {
                    "−": "-",
                    "×": "*",
                    "÷": "/"
                }[value] || value;
            }

            if (value === ".") {
                let currentNumber = expression.split(/[+\-*/]/).pop();

                if (currentNumber.includes(".")) return;

                if (currentNumber === "") value = "0.";
            }

            if (["+", "-", "*", "/"].includes(value)) {
                if (expression === "") {
                    if (value !== "-") return;
                } else if (/[+\-*/]$/.test(expression)) {
                    expression = expression.slice(0, -1);
                }
            }

            expression += value;
            input.textContent = expression;
            result.textContent = "";
        }
    });
});

function calculate() {
    try {
        if (!expression || !/^[0-9+\-*/.() ]+$/.test(expression)) {
            result.textContent = "Invalid Input";
            return;
        }

        if (/[+\-*/.]$/.test(expression)) {
            result.textContent = "Invalid Input";
            return;
        }

        let answer = Function('"use strict"; return (' + expression + ')')();

        if (!Number.isFinite(answer)) {
            result.textContent = "Cannot divide by zero";
            return;
        }

        result.textContent = "= " + parseFloat(answer.toPrecision(12));
    }

    catch {
        result.textContent = "Invalid Operation";
    }
}
