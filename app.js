let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "grey", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

const pressSound = new Audio("game-start.mp3");
const gameOverSound = new Audio("game-over.mp3");

function btnFlash(btn) {
  btn.classList.add("flash");
  pressSound.play();
  setTimeout(function () {
    pressSound.pause();
    pressSound.currentTime = 0;
  }, 100);
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  if (level > highScore) {
    highScore = level;
  }
  h2.innerText = `Level ${level}`;
  h3.innerText = `Highscore is: ${highScore}`;

  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameSeq.push(randomColor);
  console.log(gameSeq);
  btnFlash(randomBtn);
}

function checkAns(idx) {
  //Proceeds to next Level
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 600);
    }
  } else {
    //Game Over - Sound / RedFlash / Reset
    gameOverSound.play();
    h2.innerHTML = `Game Over! Your score was <b>${level}</b>
                        <br> Press any key to restart, Don't Click any button`;
    let body = document.querySelector("body").style;
    body.backgroundColor = "red";
    setTimeout(function () {
      body.backgroundColor = "wheat";
    }, 250);
    reset();
  }
}

function btnPress() {
  //While pressing the button - Sound / KeyFlash / Check
  pressSound.play();
  setTimeout(function () {
    pressSound.pause();
    pressSound.currentTime = 0;
  }, 200);

  let btn = this;
  btnFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

//Game starts here
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;
    levelUp();
  }
});

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  gameOverSound.currentTime = 0;
}

// function playKeyPress() {
//     let sound = document.getElementById("#start");
//     sound.play();
//     setTimeout(() => {
//         sound.pause();
//         sound.currentTime = 0;
//     }, 250);
// }

// function playGameOver() {
//     let sound = document.getElementById("#over");
//     sound.play();
//     setTimeout(() => {
//         sound.pause();
//         sound.currentTime = 0;
//     }, 250);
// }
