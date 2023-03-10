// initialize scores [player, computer]
const scoreArray = [0,0];
const MAXSCORE = 5; // maximum score

// initialize game on page load
function init() {
    // create button to start game
    startGame();
}

function startGame() {
    // reset scores
    scoreArray[0] = 0;
    scoreArray[1] = 0;

    // display scores
    updateDisplayedScores();
    
    // get button container
    const buttonsDiv = document.querySelector('#buttonContainer');

    // remove existing buttons
    removeAllChildElements(buttonsDiv);

    // reset game winner announcement
    document.querySelector('#gameWinner').textContent = '';

    // loop and create each button
    for (const buttonID of ['rock', 'paper', 'scissors']) {
        // assign button ID and capitalized content
        const button = document.createElement('button');
        button.id = buttonID;
        button.textContent = buttonID.toUpperCase();
        // add event listener to run selection for rps
        button.addEventListener('click', runPlayerSelection);
        // append to div
        buttonsDiv.append(button);
    }

    // append div to show in DOM
    document.querySelector('#buttonContainer').append(buttonsDiv);

    
};

// end game function, takes winner int
function gameOver(winner) {
    // get all existing buttons in container
    const buttonsContainer = document.querySelector('#buttonContainer');

    // remove all buttons
    removeAllChildElements(buttonsContainer);

    // announce the winner
    announceWinner(winner);

    // make play again button
    const againButton = document.createElement('button');
    againButton.textContent = 'PLAY AGAIN';
    againButton.addEventListener('click', startGame);
    buttonsContainer.append(againButton);
}

// remove all child elements of given container
function removeAllChildElements(container) {
    const allButtons = container.querySelectorAll('*');
    // remove each element
    allButtons.forEach((element) => {
        element.remove();
    })
}

// update scores on UI
function updateDisplayedScores() {
    // display player score
    document.querySelector('#playerScore').textContent = `${scoreArray[0]}`;
    // display computer score
    document.querySelector('#computerScore').textContent = `${scoreArray[1]}`;
}

// randomly return rock, paper, or scissors
function getComputerChoice() 
{
    let choices = ['rock', 'paper', 'scissors'];
    // random integer between 0 and 3
    let idx = Math.floor(Math.random() * 3);
    return choices[idx];
}


// return 0 if player wins, 1 if computer wins, -1 if tie
function playRound(playerChoice, computerChoice)
{
    // tie
    if (playerChoice === computerChoice)
    {
        return -1
    }
    // find winner
    if (computerChoice === 'rock')
    {
        return (playerChoice === 'paper') ? 1 : -1;
    }
    if (computerChoice === 'paper')
    {
        return (playerChoice === 'scissors') ? 1 : -1;
    }
    if (computerChoice === 'scissors')
    {
        return (playerChoice === 'rock') ? 1 : -1;
    }
}

// Return string describing outcome from result integer input
function describeRoundResult(playerChoice, computerChoice, result)
{
    switch(result)
    {
        case 0:
            return `It's a tie! ${playerChoice} and ${computerChoice}`;
        case 1:
            return `You win! ${playerChoice} beats ${computerChoice}`;
        case -1:
            return `You lose! ${computerChoice} beats ${playerChoice}`;
    }
}



// play a round using button as player choice
function runPlayerSelection(e) {
    // play a round using button click as player choice
    const playerChoice = this.id;
    const computerChoice = getComputerChoice()
    const result = playRound(playerChoice, computerChoice);
    // show result of round in DOM
    displayRoundResult(playerChoice, computerChoice, result);
    // add score to respective index in array
    const notTie = tallyScore(result, scoreArray);
    // display score
    updateDisplayedScores();
    // announce game winner if max score has been reached
    const gameWinner = notTie ? checkForGameWin(MAXSCORE) : 0;
    // if game winner is not determined, display result from last round
    if (gameWinner) {
        gameOver(gameWinner)   
    }
}

// tally results in array
function tallyScore(result) {
    // return false if tie (0)
    if (!result) return false;
    // add 1 to player score if player wins, else add 1 to computer score
    if (result === 1) {
        scoreArray[0]++;
    } else {
        scoreArray[1]++;
    }
    return true;
}

// display round result in DOM
function displayRoundResult(playerChoice, computerChoice, result) {
    // change text on page to match description of round result
    const description = describeRoundResult(playerChoice, computerChoice, result);
    document.querySelector('#roundResult').textContent = description;
}

// display game winner
function announceWinner(gameWinner) {
    // determine description from winner int
    const description = (gameWinner === 1) ? 'You win!' : 'You lose!'
    // change text on page to announce winner
    document.querySelector('#gameWinner').textContent = description;
}

// return 1 if player wins, -1 if computer wins, 0 if no winner yet
function checkForGameWin(maxScore) {
    if (scoreArray[0] === maxScore) {
        return 1;
    }
    if (scoreArray[1] === maxScore) {
        return -1
    }
    return 0;
}



init()