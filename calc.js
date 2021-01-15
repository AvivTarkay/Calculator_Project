gridContainer.innerHTML = `
<input id="calcScreen" type="text"  disabled>
<input id="calcScreen2" type="text"  disabled>
<button id="plus">+</button><button id="minus">-</button>
<button id="multi" data-action="multiply">*</button> 
<button id="division">/</button><button class="number">7</button> 
<button class="number">8</button><button class="number">9</button>
<button class="number">4</button><button class="number">5</button>
<button class="number">6</button><button class="number">1</button> 
<button class="number">2</button><button class="number">3</button>
<button class="number">0</button><button id="dot">.</button>
<button id="ac">C</button><button id="space">=</button>   
`;
let btn = document.getElementsByTagName("button");
let calculator = document.getElementById("calcScreen");
let calculator2 = document.getElementById("calcScreen2");

for (const calcBtn of btn) {
	calcBtn.addEventListener("click", function () {
		if (this.innerHTML == "=") {
			calculator.value = eval(calculator.value);
		} else if (this.innerHTML == "C") {
			calculator.value = "";
		} else {
			calculator.value += this.innerHTML;
		}
	});
	calcBtn.addEventListener(
		"click",
		(btn.onclick = () => {
			calculator2.value = eval(calculator.value);
		})
	);
}
