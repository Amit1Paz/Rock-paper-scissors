// dom - selectors
const rpsBtns = document.querySelectorAll('.rps-btn');
const chooseContainer = document.querySelector('.choose-container');
const matchContainer = document.querySelector('.match-container');
const userSelectionDisplay = document.querySelector('.user-choise');

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
function renderRpsBtns  (kind) {
    const imgTag = document.createElement('img');
    userSelectionDisplay.lastChild.classList.add('rps-btn--' + kind);
    userSelectionDisplay.lastChild.appendChild(imgTag);
    userSelectionDisplay.lastChild.lastChild.src = './images/icon-' + kind + '.svg';
    userSelectionDisplay.lastChild.lastChild.alt = kind;
}