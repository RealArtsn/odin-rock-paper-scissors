// randomly return rock, paper, or scissors
function getComputerChoice() 
{
    let choices = ['rock', 'paper', 'scissors'];
    // random integer between 0 and 3
    let idx = Math.floor(Math.random() * 3);
    return choices[idx];
}

// prompt player for rock paper scissors choice and return choice
function getPlayerChoice()
{
    let message = 'What is your choice? (rock|paper|scissors)';
    return prompt(message).toLowerCase();
}

// return 0 if player wins, 1 if computer wins, -1 if tie
function findWinner(playerChoice, computerChoice)
{
    // tie
    if (playerChoice === computerChoice)
    {
        return -1
    }
    // find winner
    if (computerChoice === 'rock')
    {
        return (playerChoice === 'paper') ? 0 : 1;
    }
    if (computerChoice === 'paper')
    {
        return (playerChoice === 'scissors') ? 0 : 1;
    }
    if (computerChoice === 'scissors')
    {
        return (playerChoice === 'rock') ? 0 : 1;
    }
}

// play a round of rock paper scissors and return true if player won
function playRound() 
{
    // get player and computer choice
    let computerChoice = getComputerChoice();
    let playerChoice = getPlayerChoice();
    // return string based on winner
    switch(findWinner(playerChoice, computerChoice))
    {
        case -1:
            return `It's a tie! ${playerChoice} vs ${computerChoice}`;
        case 0:
            return `You win! ${playerChoice} beats ${computerChoice}`;
        case 1:
            return `You lose! ${computerChoice} beats ${playerChoice}`;
    }
}
alert(playRound());