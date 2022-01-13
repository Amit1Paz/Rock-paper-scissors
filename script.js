// dom - selectors
const rpsBtns = document.querySelectorAll('.rps-btn');
const chooseContainer = document.querySelector('.choose-container');
const matchContainer = document.querySelector('.match-container');
const userSelectionDisplay = document.querySelector('.user-choise');
const computerChoise = document.querySelector('.computer-choise');
const matchResult = document.querySelector('.match-result');
const playAgainBtn = document.querySelector('.play-again-btn');
const scoreDisplay = document.querySelector('.score-box__score');

// create user and computer 
let user = {
    score: 0,
    highestScore: 0
}
let computer = {};

// event for user selection
rpsBtns.forEach(btn => btn.addEventListener('click', RpsBtnClicked));
function RpsBtnClicked () {
    user.selection = this.id;
    // hide homepage screen
    chooseContainer.classList.add('transparent');
    // show match screen
    matchContainer.classList.remove('transparent');
    // render selection
    renderSelection();
    // create and render computer selection - dicide & announce winner
    countDown();
}

// render selection function
function renderSelection () {
    const buttonTag = document.createElement('button');
    userSelectionDisplay.appendChild(buttonTag);
    userSelectionDisplay.lastChild.classList.add('rps-btn');
    if (user.selection === 'paper') {
        renderRpsBtns('paper');
    } else if (user.selection === 'scissors') {
        renderRpsBtns('scissors');
    } else {
        renderRpsBtns('rock');
    }
};
 
// render rps buttons functions 
function renderRpsBtns (kind) {
    const imgTag = document.createElement('img');
    userSelectionDisplay.lastChild.classList.add('rps-btn--' + kind);
    userSelectionDisplay.lastChild.appendChild(imgTag);
    userSelectionDisplay.lastChild.lastChild.src = './images/icon-' + kind + '.svg';
    userSelectionDisplay.lastChild.lastChild.alt = kind;
}

// match

// show computer selection
function countDown () {
    const buttonTag = document.createElement('button');
    const imgTag = document.createElement('img');
    let count = Math.floor(Math.random() * 3 + 10)
    computerChoise.appendChild(buttonTag);
    computerChoise.lastChild.classList.add('rps-btn');
    computerChoise.lastChild.classList.add('rps-btn--paper');
    computerChoise.lastChild.appendChild(imgTag);
    computerChoise.lastChild.src = 'paper';
    computerChoise.lastChild.alt = 'paper';
    let interval = setInterval(() => {
        count--
        switchComputerSelectionDisplay();
        if (count === 0) {
            clearInterval(interval);
            count = 3;
            let secondInterval = setInterval(() => {
                count--
                switchComputerSelectionDisplay();
                let computerSelection = createComputerSelection();
                if (count === 0) {
                    clearInterval(secondInterval);
                    computer.selection = computerSelection;
                    dicideWinner();
                };
            }, 400);
        };
    }, 100);
}

function switchComputerSelectionDisplay () {
    if (computerChoise.querySelector('.rps-btn').classList.contains('rps-btn--paper')) {
        nextComputerDisplay('paper', 'scissors')
    } else if (computerChoise.querySelector('.rps-btn').classList.contains('rps-btn--scissors')) {
        nextComputerDisplay('scissors', 'rock')
    } else {
        nextComputerDisplay('rock', 'paper')
    };
}

function nextComputerDisplay (current, next) {
    computerChoise.querySelector('.rps-btn').classList.remove('rps-btn--' + current);
    computerChoise.querySelector('.rps-btn').classList.add('rps-btn--' + next);
    computerChoise.querySelector('.rps-btn').lastChild.src = './images/icon-' + next + '.svg';
    computerChoise.querySelector('.rps-btn').lastChild.alt = next;
}

// create computer selection
function createComputerSelection () {
    if (computerChoise.querySelector('.rps-btn').classList.contains('rps-btn--paper')) {
        return 'paper';
    } else if (computerChoise.querySelector('.rps-btn').classList.contains('rps-btn--scissors')) {
        return 'scissors';
    } else {
        return 'rock';
    }
}

// dicide who is the winner
function dicideWinner () {
    const h3Tag = document.createElement('h3');
    if (user.selection === 'paper' && computer.selection === 'rock'
    || user.selection === 'scissors' && computer.selection === 'paper'
    || user.selection === 'rock' && computer.selection === 'scissors') {
        user.score++
        matchResult.appendChild(h3Tag);
        matchResult.lastChild.textContent = 'YOU WIN';
        userSelectionDisplay.lastChild.classList.add('winner');
    } else if ( user.selection === computer.selection) {
        matchResult.appendChild(h3Tag);
        matchResult.lastChild.textContent = 'IT\'S A TIE';
    } else {
        if (user.highestScore < user.score) {
            user.highestScore = user.score;
        }
        user.score = 0;
        matchResult.appendChild(h3Tag);
        matchResult.lastChild.textContent = 'YOU LOSE';
        computerChoise.lastChild.classList.add('winner')

    }
    renderPlayAgainBtn();
}

function renderPlayAgainBtn () {
    const buttonTag = document.createElement('button');
    matchResult.appendChild(buttonTag);
    matchResult.lastChild.classList.add('play-again-btn');
    matchResult.lastChild.textContent = 'PLAY AGAIN';
    matchResult.lastChild.addEventListener('click', activePlayAgainBtn)
}

function activePlayAgainBtn () {
    userSelectionDisplay.lastChild.remove();
    computerChoise.lastChild.remove();
    matchResult.lastChild.remove();
    matchResult.lastChild.remove();
    chooseContainer.classList.remove('transparent');
    matchContainer.classList.add('transparent');
    scoreDisplay.textContent = user.score;
}
