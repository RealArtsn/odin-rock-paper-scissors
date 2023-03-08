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
    let choice;
    // prompt until valid response
    do 
    {
        let message = 'What is your choice? (rock|paper|scissors)';
        choice = prompt(message).toLowerCase();
    }
    while (!['rock','paper','scissors'].includes(choice));
    return choice;
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

// Return string describing outcome from result integer input
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

// game loop
function game()
{
    // total rounds to be played
    const TOTALROUNDS = 1;
    // initialize player score, computer score
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < TOTALROUNDS; i++)
    {
        // get player and computer choice
        let playerChoice = getPlayerChoice();
        let computerChoice = getComputerChoice();
        // play a round
        result = playRound(playerChoice, computerChoice);
        // alert player of round result
        alert(describeResult(playerChoice, computerChoice, result));
        // update scores from round result
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
    // report final scores
    alert(`Player score: ${playerScore}\nComputer score: ${computerScore}`);
}