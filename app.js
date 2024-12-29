let gameSeq = [];
let userSeq = [];

let btns = ['red', 'green', 'yellow', 'purple'];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let highScore_tag = document.querySelector(".high-score");

// Initialize high score display
highScore_tag.innerText = `High Score : ${localStorage.getItem("highscore") || 0}`;

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
    }
    levelup();
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // random button chosen
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        highScoreCheck();

        h2.innerHTML = `Game Over! Your Score was <b>${level - 1}</b> <br> Press any key to Start.`;
        document.querySelector("body").style.backgroundColor = 'red';
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = 'white';
        }, 150);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) { 
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function highScoreCheck() {
    let highScore = Number(localStorage.getItem("highscore") || 0); // Convert to number
    if (level - 1 > highScore) {
        highScore_tag.innerText = `High Score : ${level - 1}`;
        localStorage.setItem("highscore", level - 1); // Update localStorage
    }
}
