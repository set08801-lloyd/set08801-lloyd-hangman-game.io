
const letterContainer = document.getElementsByClassName("letter-container")[0];
const optionsContainer = document.getElementById("options-section");
const userInputSection = document.getElementById("input-section");
const newGameContainer = document.getElementById("new-game-section");
const newGameButton = document.getElementById("gameButton");
const canvas = document.getElementsByTagName("canvas")[0];
const resultText = document.getElementById("result-section");

let options = {
  fruits: ["Mango","JackFruit","Raspberry","Strawberry","Orange","Banana"],
  animals: ["Dinosaur","Lizard","KomodoDragon","Elephant","Mouse","Sheep"],
  countries: [
    "England",
    "Iceland",
    "USA",
    "Egypt",
    "China",
    "Chile",
    "Argentina",
    "Brazil",
    "Italy",
    "Spain",
    "Portugal",
  ],
};

let winCount = 0;
let count = 0;

let chosenWord = "";

function displayOptions () {
  optionsContainer.innerHTML += `<h3>Please Select Any one of the Three</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

function blockade(){
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("isHidden");
};

function generateWord (optionValue) {
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  letterContainer.classList.remove("isHidden");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];

  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();


  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  userInputSection.innerHTML = displayItem;
};


function initializer(){
  winCount = 0;
  count = 0;

  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("isHidden");
  newGameContainer.classList.add("isHidden");
  letterContainer.innerHTML = "";

  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    button.innerText = String.fromCharCode(i);

    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Hurrah,You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              blockade();
            }
          }
        });
      } else {
        count += 1;
        drawMan(count);
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blockade();
        }
      }
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  let { initialContext } = canvasGenerator();
  initialContext();
};


function canvasGenerator (){
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  function drawLine (fromX, fromY, toX, toY) {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  function head (){
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  function body () {
    drawLine(70, 40, 70, 80);
  };

  function leftHand(){
    drawLine(70, 50, 50, 70);
  };

  function rightHand (){
    drawLine(70, 50, 90, 70);
  };

  function leftLimb (){
    drawLine(70, 80, 50, 110);
  };

  function rightLimb (){
    drawLine(70, 80, 90, 110);
  };


  function initialContext(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130);
    drawLine(10, 10, 10, 131);
    drawLine(10, 10, 70, 10);
    drawLine(70, 10, 70, 20);
  };

  return { initialContext, head, body, leftHand, rightHand, leftLimb, rightLimb };
};

 function drawMan (count){
  let { head, body, leftHand, rightHand, leftLimb, rightLimb } = canvasGenerator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftHand();
      break;
    case 4:
      rightHand();
      break;
    case 5:
      leftLimb();
      break;
    case 6:
      rightLimb();
      break;
    default:
      break;
  }
};


newGameButton.addEventListener("click", initializer);
window.onload = initializer;