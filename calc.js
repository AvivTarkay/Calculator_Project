gridContainer.innerHTML = `
<input id="calcScreen" type="text"  disabled>
<input id="calcScreen2" type="text"  disabled>
<button id="plus"  class="operators" value='+'>+</button><button value='-' id="minus"  class="operators"> - </button>
<button id="multi"   class="operators" value='&times'>&times;</button> 
<button id="division"  class="operators" value='&divide'>&divide;</button><button class="numbers" value=7>7</button> 
<button class="numbers" value=8>8</button><button class="numbers" value=9>9</button>
<button class="numbers" value=4>4</button><button class="numbers" value=5>5</button>
<button class="numbers" value=6>6</button><button class="numbers" value=1>1</button> 
<button class="numbers" value=2>2</button><button class="numbers" value=3>3</button>
<button class="numbers" value=0>0</button><button id="dot" value=.>.</button>
<button  id="clear" value='C'>C</button><button class="equal" id="result">=</button>   
`;
// let btn = document.getElementsByTagName("button");
// let calculator = document.getElementById("calcScreen");
// let calculator2 = document.getElementById("calcScreen2");

// for (const calcBtn of btn) {
// 	calcBtn.addEventListener("click", function () {
// 		if (this.innerHTML == "=") {
// 			calculator.value = eval(calculator.value);
// 		} else if (this.innerHTML == "C") {
// 			calculator.value = "";
// 		} else {
// 			calculator.value += this.innerHTML;
// 		}
// 	});
// 	calcBtn.addEventListener(
// 		"click",
// 		(btn.onclick = () => {
// 			calculator2.value = eval(calculator.value);
// 		})
// 	);
// }

("use strict");

let input = document.getElementById("calcScreen"), // input/output button
	number = document.querySelectorAll(".numbers"), // number buttons
	operator = document.querySelectorAll(".operators"), // operator buttons
	result = document.getElementById("result"), // equal button
	clear = document.getElementById("clear"), // clear button
	resultDisplayed = false;

number.forEach(btn => {
	btn.addEventListener("click", e => {
		let currentString = input.value;
		let lastChar = currentString[currentString.length - 1];

		if (resultDisplayed === false) {
			input.value += e.target.value;
		} else if (
			(resultDisplayed === true && lastChar === "+") ||
			lastChar === "-" ||
			lastChar === "×" ||
			lastChar === "÷"
		) {
			resultDisplayed = false;
			input.value += e.target.value;
		} else {
			resultDisplayed = false;
			input.value = "";
			input.value += e.target.value;
		}
	});
});

operator.forEach(opr => {
	opr.addEventListener("click", e => {
		let currentString = input.value;
		let lastChar = currentString[currentString.length - 1];
		if (
			lastChar === "+" ||
			lastChar === "-" ||
			lastChar === "×" ||
			lastChar === "÷"
		) {
			let newString =
				currentString.substring(0, currentString.length - 1) + e.target.value;
			input.value = newString;
		} else if (currentString.length === 0) {
			console.log("enter a number first");
		} else {
			input.value += e.target.value;
		}
	});
});

result.addEventListener("click", () => {
	let inputString = input.value;
	let numbers = inputString.split(/\+|\-|\×|\÷/g);
	let operators = inputString.replace(/[0-9]|\./g, "").split("");

	let divide = operators.indexOf("÷");
	while (divide != -1) {
		numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
		operators.splice(divide, 1);
		divide = operators.indexOf("÷");
	}

	let multiply = operators.indexOf("×");
	while (multiply != -1) {
		numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
		operators.splice(multiply, 1);
		multiply = operators.indexOf("×");
	}

	let subtract = operators.indexOf("-");
	while (subtract != -1) {
		numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
		operators.splice(subtract, 1);
		subtract = operators.indexOf("-");
	}

	let add = operators.indexOf("+");
	while (add != -1) {
		// using parseFloat is necessary, otherwise it will result in string concatenation :)
		numbers.splice(
			add,
			2,
			parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
		);
		operators.splice(add, 1);
		add = operators.indexOf("+");
	}

	input.value = numbers[0]; // displaying the output

	resultDisplayed = true; // turning flag if result is displayed
});

clear.addEventListener("click", () => {
	input.value = "";
});
