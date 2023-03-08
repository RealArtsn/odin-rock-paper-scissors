// initialize scores [player, computer]
const scoreArray = [0,0];
const MAXSCORE = 5;

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

// add click listener for each button
const buttonsDiv = document.querySelector('#buttons');
const buttons = buttonsDiv.querySelectorAll('*');
buttons.forEach((button) => {
    button.addEventListener('click', runPlayerSelection);
});

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
    // announce game winner if max score has been reached
    const gameWinner = notTie ? checkForGameWin(MAXSCORE) : 0;
    // if game winner is not determined, display result from last round
    gameWinner ? announceWinner(gameWinner): ' ';    
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