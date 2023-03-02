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

console.log(getPlayerChoice())