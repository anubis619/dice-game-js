/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gameStarted;

initializaiton();



// function to get a random number

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};



document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gameStarted){
    
        // Get a random number
        let dice = getRandomIntInclusive(1,6);

        // Dispaly the result
        let diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        document.querySelector('#current-' + activePlayer).textContent = dice;
        diceDom.src = 'dice-' + dice + '.png';

        // Update the round score if the rolled number was not 1
        if (dice !== 1) {
            // Add Score
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
               
            winner();
        
        }
    }

});


document.querySelector('.btn-hold').addEventListener('click', function(){
        if(gameStarted){
            //Add CURRENT score to GLOBAL score
            scores[activePlayer] += roundScore;

            // Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            // Check if the player won the game
            winner();

        }
        
        

});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle ('active');
    document.querySelector('.player-1-panel').classList.toggle ('active');
    document.querySelector('.dice').style.display = 'none';
};


function winner() {
    if(scores[activePlayer] >= 100){
        document.querySelector('.player-' + activePlayer +  '-panel').classList.toggle ('winner');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        gameStarted = False;
    } else {
        nextPlayer();
    };
};

document.querySelector('.btn-new').addEventListener('click', initializaiton);

function initializaiton(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameStarted = true;

    // Setting the initial dice image to be invisible
    document.querySelector('.dice').style.display = 'none';


    // Setting the initial values to default
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove ('winner');
    document.querySelector('.player-1-panel').classList.remove ('winner');
    document.querySelector('.player-0-panel').classList.remove ('active');
    document.querySelector('.player-1-panel').classList.remove ('active');
    document.querySelector('.player-0-panel').classList.add ('active');
     
};



// TODO:
/*

    1. Set the game so that a player will lose their entire score if a double 6 is hit.
    After that the next play turn will be available.
    (Hint: Always save the previous roll in a separate variable)

    2. Add an input field so that the player can select the winning score and overwritte the actuall 100.

    3.  Add a second dice to the mix. Make is so the player will lose the score if either dice has a 1.
    (CSS will need to be updated to place the second dice and move the first)

*/