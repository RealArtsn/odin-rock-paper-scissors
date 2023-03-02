console.log('hello world');

// randomly return rock, paper, or scissors
function getComputerChoice() 
{
    let choices = ['rock', 'paper', 'scissors'];
    // random integer between 0 and 3
    let idx = Math.floor(Math.random() * 3);
    return choices[idx];
}

console.log(getComputerChoice())