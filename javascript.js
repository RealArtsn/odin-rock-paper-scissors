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

function describeResult(playerChoice, computerChoice, result)
{
    switch(result)
    {
        case -1:
            return `It's a tie! ${playerChoice} and ${computerChoice}`;
        case 0:
            return `You win! ${playerChoice} beats ${computerChoice}`;
        case 1:
            return `You lose! ${computerChoice} beats ${playerChoice}`;
    }
}

// game loop through 5
function game()
{
    const TOTALROUNDS = 5;
    // player score, computer score
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < TOTALROUNDS; i++)
    {
        let playerChoice = getPlayerChoice();
        let computerChoice = getComputerChoice()
        result = playRound(playerChoice, computerChoice);
        alert(describeResult(playerChoice, computerChoice, result));
        // deconstruct string to prove winner
        switch(result)
        {
            case -1:
                break;
            case 0:
                playerScore++;
                break;
            case 1:
                computerScore++;
                break;
        }
    }
    alert(`Player score: ${playerScore}\nComputer score: ${computerScore}`);
}
game();