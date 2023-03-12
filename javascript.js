// initialize scores [player, computer]
const scoreArray = [0, 0];
const MAXSCORE = 5; // maximum score

// initialize game on page load
function init() {
    // create computer card
    const computerCard = createCard();
    console.log(computerCard);
    computerCard.id = 'computerCard';
    console.log(computerCard);
    // flip upside down
    computerCard.classList.add('cardFlipped');
    document.querySelector('#playArea').append(computerCard);
    hideComputerCard();

    // start game
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

    // clear old stuff
    removeAllChildElements(buttonsDiv);

    // show computer card area
    document.querySelector('#playArea').style.display = 'flex';

    // reset game winner announcement
    const winnerText = document.querySelector('#gameWinner')
    winnerText.textContent = '';
    winnerText.classList.remove('showWinner');

    // loop and create each button
    for (const buttonID of ['rock', 'paper', 'scissors']) {
        const button = createCard(buttonID, true);
        setCardContent(button, buttonID);
        button.id = buttonID;
        // append to div
        buttonsDiv.append(button);
    }

    // initialize player cards
    initializePlayerCards()
};

// create a card, optional mouseover effects for player cards
function createCard() {
    // assign button ID and capitalized content
    const card = document.createElement('div');
    // place image on card
    const img = document.createElement('img');
    // prevent image dragging
    img.ondragstart = () => { return false };
    card.append(img);

    // place text on card
    const h5 = document.createElement('h5');
    card.append(h5);

    // add card style
    card.classList.add('card');
    return card;
}

// set image based on rock paper scissors
function setCardContent(card, rps) {
    // set img.src to image path
    const img = card.querySelector('img');
    const h5 = card.querySelector('h5');
    img.src = `img/${rps}.png`;
    h5.textContent = rps.toUpperCase();
    
    // 
}


function handleCardMouseEnter() {
    this.classList.add('cardHover');
}
function handleCardMouseLeave() {
    this.classList.remove('cardHover');
}

// end game function, takes winner int
function gameOver(winner) {
    // hide computer card area
    document.querySelector('#playArea').style.display = 'none';
    // get all existing buttons in container
    const buttonsContainer = document.querySelector('#buttonContainer');

    // remove all buttons
    removeAllChildElements(buttonsContainer);

    // announce the winner
    announceWinner(winner);

    // make play again button
    const againButton = document.createElement('button');
    againButton.textContent = 'PLAY AGAIN';
    againButton.classList.add('playAgain')
    againButton.addEventListener('click', startGame);
    againButton.addEventListener('mouseenter', function(e) {
        this.classList.add('buttonHover');
    });
    againButton.addEventListener('mouseleave', function(e) {
        this.classList.remove('buttonHover');
    });
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
function getComputerChoice() {
    let choices = ['rock', 'paper', 'scissors'];
    // random integer between 0 and 3
    let idx = Math.floor(Math.random() * 3);
    return choices[idx];
}

// return 0 if player wins, 1 if computer wins, -1 if tie
function playRound(playerChoice, computerChoice) {
    // tie
    if (playerChoice === computerChoice) {
        return 0;
    }
    // find winner
    if (computerChoice === 'rock') {
        return (playerChoice === 'paper') ? 1 : -1;
    }
    if (computerChoice === 'paper') {
        return (playerChoice === 'scissors') ? 1 : -1;
    }
    if (computerChoice === 'scissors') {
        return (playerChoice === 'rock') ? 1 : -1;
    }
}


// play a round using button as player choice
function runPlayerSelection(e) {

    // play card
    const card = this;
    card.classList.add('played');

    //play computer card

    // play a round using button click as player choice
    const playerChoice = this.id;
    const computerChoice = getComputerChoice()

    const result = playRound(playerChoice, computerChoice);
    // show result of round in DOM

    // add score to respective index in array
    const notTie = tallyScore(result, scoreArray);
    // display score
    updateDisplayedScores();
    disablePlayerCards();
    // put correct image on computer card
    setCardContent(document.querySelector('#computerCard'), computerChoice);
    revealComputerCard();
    


    // reset time in ms
    const RESET = 800;

    // remove computer card and reinitialize player cards
    setTimeout(initializePlayerCards, RESET);
    // initializePlayerCards();
    setTimeout(hideComputerCard, RESET);

    // announce game winner if max score has been reached
    const gameWinner = notTie ? checkForGameWin(MAXSCORE) : 0;
    // if game winner is not determined, display result from last round
    if (gameWinner) {
        setTimeout(gameOver, RESET, gameWinner);
        // return if game over
        return
    }
    
}

// stop game and compare player and computer cards
function revealComputerCard() {
    // reveal and move card in place
    const computerCard = document.querySelector("#computerCard");
    computerCard.classList.remove('cardTransparent');
}

function hideComputerCard() {
    // hide and move card back upward
    const computerCard = document.querySelector("#computerCard");
    computerCard.classList.add('cardTransparent');
}

// reset player cards, make clickable
function initializePlayerCards() {
    const allPlayerCards = document.querySelectorAll('#buttonContainer .card');
    allPlayerCards.forEach((card) => {
        // set up event listeners for mouse interaction
        card.addEventListener('click', runPlayerSelection);
        card.addEventListener('mouseenter', handleCardMouseEnter);
        card.addEventListener('mouseleave', handleCardMouseLeave);
        // remove extra classes
        card.classList.remove('played');
        card.classList.remove('cardHover');
    });
}

// disable player cards
function disablePlayerCards() {
    const allPlayerCards = document.querySelectorAll('#buttonContainer .card');
    allPlayerCards.forEach((card) => {
        card.removeEventListener('click', runPlayerSelection);
        card.removeEventListener('mouseenter', handleCardMouseEnter);
        card.removeEventListener('mouseleave', handleCardMouseLeave);
    });
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


// display game winner
function announceWinner(gameWinner) {
    // determine description from winner int
    const description = (gameWinner === 1) ? 'YOU WIN!' : 'YOU LOSE!'
    // change text on page to announce winner
    const text = document.querySelector('#gameWinner')
    text.textContent = description;
    text.classList.add('showWinner');
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