
// initial element
const angleArray = [[0,360,0],[270,180,90],[-90,0,0],[0,90,90],[0,-90,0],[-180,0,0]];
let sommePlayer1 = 0;
let sommePlayer2 = 0;
let player1Turn = true;

// doc element
const dice1El = document.getElementById("dice1");
const dice2El = document.getElementById("dice2");
const player1score = document.getElementById("scorePlayer1");
const player2score = document.getElementById("scorePlayer2");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("newgameBtn");
const flipBtn = document.getElementById("flipBtn");
const startBtn = document.getElementById("startgameBtn")
const resultEl = document.getElementById("result");
const cardPlayer1El = document.getElementById("cardPlayer1");
const cardPlayer2El = document.getElementById("cardPlayer2");
const coinEl = document.getElementById("coin");
const coinContainer = document.getElementById("coin-container");
const diceContainer = document.getElementById("dice-container")
const message = document.getElementById("coin-message")

// Click event
rollBtn.addEventListener("click",rollDice);
flipBtn.addEventListener("click",flipAnimation);
resetBtn.addEventListener("click",reset);
startBtn.addEventListener("click",start)

// -------------------- Functions --------------------------
function start(){
    // show roll btn
    startBtn.style.display = "none"
    rollBtn.style.display = "block";

    // switch board
    coinContainer.style.display = "none";
    diceContainer.style.display="flex";
}

function reset(){

    // remove classlist
    cardPlayer1El.classList.remove("winner")
    cardPlayer1El.classList.remove("inactive")
    cardPlayer1El.classList.remove("turn")

    cardPlayer2El.classList.remove("winner")
    cardPlayer2El.classList.remove("inactive")
    cardPlayer2El.classList.remove("turn")

    // remove message
    resultEl.innerHTML = "";
    message.innerHTML = "flip the coin ➡️ the winner begins"

    // reset score
    scorePlayer1.innerHTML = "-";
    scorePlayer2.innerHTML = "-";

    // reset somme
    sommePlayer1 = 0;
    sommePlayer2 = 0;

    // switch button
    rollBtn.style.display = "none";
    resetBtn.style.display = "none";
    diceContainer.style.display="none";
    coinContainer.style.display = "block";
    flipBtn.style.display = "block";

    // reset animation coin
    coinEl.style.animation = ""
}



function rollDice(){
    const randomNb_dice1 = Math.floor(Math.random() * 6);
    const randomNb_dice2 = Math.floor(Math.random() * 6);

    if (player1Turn){
        // change player
        player1Turn = !player1Turn;

        // change score
        sommePlayer1 += (randomNb_dice1+1);

        // roll animation
        diceAnimation(dice1El, randomNb_dice1, player1score,sommePlayer1,player1Turn);
    }
    else{
        // change player
        player1Turn = !player1Turn;

        // change score
        sommePlayer2 += (randomNb_dice2 + 1);
        
        // animation
        diceAnimation(dice2El, randomNb_dice2, player2score,sommePlayer2,player1Turn);
    }
}


function checkWinner(player1Turn){
    
    // check if winner
    if (sommePlayer1 >= 21 && player1Turn){
        resultEl.innerHTML = "🏆 Player 1 Won 🏆";

        cardPlayer1El.classList.add("winner");
        cardPlayer2El.classList.add("inactive");
        cardPlayer2El.classList.remove("turn");

        // switch button
        rollBtn.style.display = "none";
        resetBtn.style.display = "block";

    }
    else if (sommePlayer2 >= 21 && !player1Turn){
        resultEl.innerHTML = "🏆 Player 2 Won 🏆";
        cardPlayer2El.classList.add("winner");
        cardPlayer1El.classList.add("inactive");
        cardPlayer1El.classList.remove("turn");

        // switch button
        rollBtn.style.display = "none";
        resetBtn.style.display = "block";
        
    }

}


function playerTurn(player1Turn){

    if (player1Turn){
        cardPlayer2El.classList.remove("turn");
        cardPlayer1El.classList.add("turn");
    }
    else{
        cardPlayer1El.classList.remove("turn");
        cardPlayer2El.classList.add("turn");
    }
}


// function rolling dice
function diceAnimation(dice, position, playerScore, somme,player1Turn){

    // roll animation
    dice.style.animation="roll 1.5s linear";

    // show dice position
    dice.style.transform = `rotateX(${angleArray[position][0]}deg) 
                            rotateY(${angleArray[position][1]}deg) 
                            rotateZ(${angleArray[position][2]}deg)`;


    // animation end
    dice.addEventListener("animationend",function(){
        dice.style.animation = ""
        
        // show score
        playerScore.innerHTML = somme;

        // turn
        playerTurn(player1Turn)

        // check score
        checkWinner(!player1Turn)
  
    })   
}


// function flip coin
function flipAnimation(){

    // choose player randomly
    let playerNb = Math.round(Math.random()) + 1

    // flip animation
    coinEl.style.animation = `flip-${playerNb} 2.5s ease-out forwards`;

    coinEl.addEventListener("animationend",function(){
        
        // player Turn
        if (playerNb===1){
            player1Turn = true;
            message.innerHTML = "Player 1 begins 😎"
        }
        else{
            player1Turn = false;
            message.innerHTML = "Player 2 begins 😎"
        }

        playerTurn(player1Turn);

        // switch btn
        flipBtn.style.display = "none";
        startBtn.style.display = "block";
    })
}



