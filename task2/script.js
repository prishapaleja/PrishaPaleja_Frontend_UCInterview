let secretNum = Math.floor(Math.random() * 100) + 1;
let lives = 7;
let guesses = [];

const guessInput = document.querySelector("#guess_input");
const hint = document.querySelector("#hint");
const guessList = document.querySelector(".guess_list");
const resetBtn = document.querySelector("#reset");
const resetBtn2 = document.querySelector("#reset2");
const submitBtn = document.querySelector("#submit");
const hearts = document.querySelectorAll(".heart");

let wonFrame = document.querySelector("#won_frame");
let lostFrame = document.querySelector("#lost_frame");
let displayNumber = document.querySelector("#number");

function wrongGuess(){
    const heartBreak = document.getElementById(lives.toString());
    heartBreak.innerText = "💔";
    heartBreak.classList.add("broken");
    guessInput.value = "";
}

function gameLost(){
    wrongGuess();
    lostFrame.classList.remove("hide");
    displayNumber.innerText = `The number was ${secretNum}`;
    endGame();
}

function gameWon(){
    wonFrame.classList.remove("hide");
    endGame();
}

function endGame(){
    guessInput.disabled = true;
}

function submitGuess(){
    const guess = parseInt(guessInput.value);
    console.log(guess);
    
    if(isNaN(guess) || guess<1 || guess>100){
        hint.innerText = "Please enter a number between 1 to 100";
    }

    guesses.push(guess);
    updateGuessList();

    if(guess === secretNum) {
        gameWon();
    } else{
        lives--;
        console.log(lives);

        if(lives === 0) {
            gameLost();
        } else{
            hint.innerText = guess<secretNum? "Too Low!" : "Too High!";
            wrongGuess();
        }
    }
}

function updateGuessList(){
    guessList.innerHTML = "";
    guesses.forEach((g, i) => {
        const li = document.createElement("li");
        li.innerText = `Guess ${i+1}: ${g}`;
        guessList.appendChild(li);
    })
}

function resetGame(){
    secretNum = Math.floor(Math.random() * 100) + 1;
    lives = 7;
    for(let i=0; i<7; i++){
        const heartRevive = document.getElementById(i.toString());
        heartRevive.innerText = "❤️";
    }
    guesses.length = 0;
    guessList.innerHTML = "";
    guessInput.disabled = false;
    guessInput.value = "";
    wonFrame.classList.add("hide");
    lostFrame.classList.add("hide");
    displayNumber.innerText = "";
    hint.innerText = "";
}

submitBtn.addEventListener("click", submitGuess);
resetBtn.addEventListener("click", resetGame);
resetBtn2.addEventListener("click", resetGame);