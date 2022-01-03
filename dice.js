
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
const resultEl = document.getElementById("result");
const cardPlayer1El = document.getElementById("cardPlayer1");
const cardPlayer2El = document.getElementById("cardPlayer2");

rollBtn.addEventListener("click",rollDice);


function rollDice(){
    const randomNb_dice1 = Math.floor(Math.random() * 6);
    const randomNb_dice2 = Math.floor(Math.random() * 6);

    if (player1Turn){
        // change player
        player1Turn = !player1Turn;

        // change score
        sommePlayer1 += (randomNb_dice1+1);

        // roll animation
        Animation(dice1El, randomNb_dice1, player1score, sommePlayer1,player1Turn);

    }
    else{
        // change player
        player1Turn = !player1Turn;

        // change score
        sommePlayer2 += (randomNb_dice2 + 1);
        
        // animation
        Animation(dice2El, randomNb_dice2, player2score, sommePlayer2,player1Turn);

    }

    
   

}



function checkWinner(somme,player1Turn){

    if (somme >= 21 & player1Turn){
        resultEl.innerHTML = "🏆 Player 1 Won 🏆";
        cardPlayer1El.classList.add("winner");
        cardPlayer2El.classList.add("loser");
    }
    else if (somme >= 21 & !player1Turn){
        resultEl.innerHTML = "🏆 Player 2 Won 🏆";
        cardPlayer2El.classList.add("winner");
        cardPlayer1El.classList.add("loser");
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


function Animation(dice, position, playerScore, somme,player1Turn){
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
        checkWinner(somme,!player1Turn)

    })
}



