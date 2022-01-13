// dom - selectors
const rpsBtns = document.querySelectorAll('.rps-btn');
const chooseContainer = document.querySelector('.choose-container');
const matchContainer = document.querySelector('.match-container');
const userSelectionDisplay = document.querySelector('.user-choise');
// dom - create elements
const createButton = document.createElement('button');
const createImg = document.createElement('img');

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
}

// render selection function
function renderSelection () {
    createButton.classList.add('rps-btn');
    if (user.selection === 'paper') {
        renderPaperBtn();
    } else if (user.selection === 'scissors') {
        renderScissorsBtn();
    } else {
        renderRockBtn();
    }
    userSelectionDisplay.appendChild(createButton);
    userSelectionDisplay.lastChild.appendChild(createImg);
};

// render rps buttons functions 
function renderPaperBtn () {
    createButton.classList.add('rps-btn--paper');
    createImg.src = './images/icon-paper.svg';
    createImg.alt = 'Paper';
};
function renderScissorsBtn () {
    createButton.classList.add('rps-btn--scissors');
    createImg.src = './images/icon-scissors.svg';
    createImg.alt = 'Scissors';
};
function renderRockBtn () {
    createButton.classList.add('rps-btn--rock');
    createImg.src = './images/icon-rock.svg';
    createImg.alt = 'Rock';
};