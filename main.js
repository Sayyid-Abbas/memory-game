// welcome section

let welcome = document.querySelector(".welcome");
let sample = document.querySelector(".sample");
let card1 = document.querySelector(".card-1");
let card2 = document.querySelector(".card-2");

// Set both cards not to be click
let clicked1 = false;
let clicked2 = false;

// check if we clicked them both we disply true sign
card1.onclick = () => {
    clicked1 = true;
    card1.style.cssText = "transform: rotateY(-180deg)";
    if(clicked1 && clicked2) {
        displayTrue();
    }
};
card2.onclick = () => {
    clicked2 = true;
    card2.style.cssText = "transform: rotateY(-180deg)";
    if(clicked1 && clicked2) {
        displayTrue();
    }
};

// display true function
function displayTrue() {
    let sign = document.querySelector(".sign");
    setTimeout(() => {
        sign.style.cssText = "width: 200px; height: 200px; font-size: 100px";
    }, 300)

    // After two seconds we set everything back to not be clicked
    setTimeout(() => {
        card1.style.cssText = "transform: rotateY(0deg)";
        card2.style.cssText = "transform: rotateY(0deg)";
        clicked1 = false;
        clicked2 = false;
        sign.style.cssText = "width: 0px; height: 0px; font-size: 0px";
    }, 2000);
};


// Starting The Game
let start = document.querySelector(".start");
let loader = document.createElement("div");
loader.className = "loader";

// Start game button
start.onclick = () => {
    document.body.innerHTML = "";
    // Displaying the loader for a second
    document.body.appendChild(loader);
    setTimeout(() => {
        // After one second we remove the loader and trigger startGame function
        loader.remove();
        startGame();
    }, 1000);
};
const icons = [
   'fa-cat', 'fa-dog', 'fa-car', 'fa-apple-alt', 'fa-star',
  'fa-heart', 'fa-leaf', 'fa-fish', 'fa-bicycle', 'fa-moon',
  'fa-sun', 'fa-tree',
];
let cards = [...icons, ...icons];
let totalScore = icons.length;

// Start Game Function
function startGame() {
    // First we shuffle the cards to get a new order
    shuffle(cards);
    // Then we start building the game board
    buildBoard(cards);
}

function buildBoard(cards) {

    let gameContainer = document.createElement("div");
    gameContainer.className = "game-container";

    let header = document.createElement("div");
    header.className = "header";

    let score = document.createElement("div");
    score.className = "score";
    score.textContent = `${0} of ${totalScore}`;

    let title = document.createElement("div");
    title.className = "title";
    title.textContent = "Memory Game";

    let timeLeft = document.createElement("div");
    timeLeft.className = "time-left";
    timeLeft.textContent = `Left: ${120}`;

    header.appendChild(score);
    header.appendChild(title);
    header.appendChild(timeLeft);

    let cardsContainer = document.createElement("div");
    cardsContainer.className = "cards";

    for(let i = 0; i < cards.length; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-index", i);

        let back = document.createElement("div");
        back.classList.add("face", "back");
        back.innerHTML = `<i class="fas ${cards[i]}"></i>`;

        let front = document.createElement("div");
        front.classList.add("face", "front");
        front.innerHTML = `<i class="fa-solid fa-question"></i>`;

        card.appendChild(back);
        card.appendChild(front);

        cardsContainer.appendChild(card);
    }

    gameContainer.appendChild(header);
    gameContainer.appendChild(cardsContainer);

    document.body.appendChild(gameContainer);

    // The main function that check if two pairs match
    startTesting();
}

// Shuffle Function
function shuffle(array) {
    for(let i = 0; i < array.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Checking For Matching
let firstClick = false;
let firstCard = "";
let cardIndex = -1;
function startTesting() {
    // Getting some elements we need
    let gameContainer = document.querySelector(".game-container");
    let cards = document.querySelectorAll(".card");
    let score = document.querySelector(".score");
    let timeLeft = document.querySelector(".time-left");

    // To count number of matched pairs
    let counter = 0;
    // The total time for the game
    let time = 120;

    // Each second we lower the time by one second
    let timer = setInterval(() => {
        timeLeft.textContent = `Left: ${--time}`;
        if(time == 0) {
            // If time is out we clear the function
            clearInterval(timer);

            // We display a sign to tell the user that the time is out
            let sign = document.createElement("div");
            sign.textContent = "Time Out";
            sign.className = "sign";
            gameContainer.appendChild(sign);

            // After display the sign for a second we trigger endGame function
            setTimeout(() =>{
                sign.remove();
                endGame(false);
            }, 1000);
        }
    }, 1000);

    document.addEventListener("click", (e) => {
        cards.forEach((card) => {
            if(card.contains(e.target)) {
                // If it is the first click we assign the firstClick to true
                // and assign the card index to its dataset and we save the card to compare
                // then we flip the card
                if(!firstClick) {
                    cardIndex = card.dataset.index;
                    firstCard = card;
                    firstClick = true;
                    card.classList.add("active");
                } else { // When we clicked to cards
                    // We return nothing if we clicked the same card
                    if(card.dataset.index == cardIndex) {
                        return;
                    }
                    // We flip the second card
                    card.classList.add("active");
                    // Assign the pointerEvent to none to prevent the user from clicking another cards
                    document.body.style.pointerEvents = "none";
                    // After one second we check if the cards match
                    setTimeout(() => {
                        document.body.style.pointerEvents = "auto";
                        // If matched we keep them flipped and assign the vars to defalut values
                        // and we increase the counter
                        if(card.innerHTML == firstCard.innerHTML) {
                            firstClick = false;
                            cardIndex = -1;
                            firstCard = "";
                            counter++;
                            score.textContent = `${counter} of ${totalScore}`;
                            // If the counter equals the total score that means 
                            // the user finished the game before the time is out
                            // so we trigger endGame function
                            if(counter == totalScore) {
                                setTimeout(() => {
                                    endGame(true);
                                }, 1000)
                            }
                        } else { // if doesn't match we assign the vars to default values, and we flip the cards back	
                            firstClick = false;
                            firstCard.classList.remove("active");
                            card.classList.remove("active");
                            firstCard = "";
                        }
                    }, 1000);
                }
            }
        });
    });
};

// Ending The Game Function
function endGame(stats) {
    if(stats) {
        displayYouWon();
    } else {
        displayYouLost();
    }
}
function checkButtons() {
    let close = document.querySelector(".close-game");
    let tryAgain = document.querySelector(".try-again");

    // If close we display a good bye sign
    document.addEventListener("click", (e) => {
        if(close.contains(e.target)) {
            document.body.innerHTML = "";
            document.body.appendChild(document.createTextNode("Good Bye"));
            document.body.style.cssText = 
            "height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 20px";
        }
    });
    // If try again we click start
    document.addEventListener("click", (e) => {
        if(tryAgain.contains(e.target)) {
            start.click();
        }
    });
};

function buildEndGameSection() {
    document.body.innerHTML = "";

    let endGame = document.createElement("div");
    endGame.className = "end-game";

    let headTitle = document.createElement("h3");
    headTitle.textContent = "Thanks For Trying Out The Game";

    let buttons = document.createElement("div");
    buttons.className = "buttons";

    let tryAgainButton = document.createElement("div");
    tryAgainButton.className = "try-again";
    tryAgainButton.textContent = "Try Again";

    let closeButton = document.createElement("div");
    closeButton.className = "close-game";
    closeButton.textContent = "Close Game";

    buttons.appendChild(tryAgainButton);
    buttons.appendChild(closeButton);

    endGame.appendChild(headTitle);
    endGame.appendChild(buttons);

    document.body.appendChild(endGame);
}
function displayYouWon() {
    let gameContainer = document.querySelector(".game-container");

    let container = document.createElement("div");
    container.className = "you-won";

    let sign = document.createElement("div");
    sign.className = "you-won-sign";
    sign.textContent = "You Won";

    let nextButton = document.createElement("div");
    nextButton.className = "next";
    nextButton.textContent = "Next";

    container.appendChild(sign);
    container.appendChild(nextButton);

    gameContainer.appendChild(container);

    // When click Next
    document.addEventListener("click", (e => {
        if(nextButton.contains(e.target)) {
            document.body.innerHTML = "";
            document.body.appendChild(loader);
            setTimeout(() =>{
                // We show the fianlsection
                buildEndGameSection();
                // Then check the buttons
                checkButtons();   
            }, 1000);
        }
    }))
}
function displayYouLost() {
    let gameContainer = document.querySelector(".game-container");

    let container = document.createElement("div");
    container.className = "you-lost";

    let sign = document.createElement("div");
    sign.className = "you-lost-sign";
    sign.textContent = "You Lost";

    let nextButton = document.createElement("div");
    nextButton.className = "next";
    nextButton.textContent = "Next";

    container.appendChild(sign);
    container.appendChild(nextButton);

    gameContainer.appendChild(container);

    // When click Next
    document.addEventListener("click", (e => {
        if(nextButton.contains(e.target)) {
            document.body.innerHTML = "";
            document.body.appendChild(loader);
            setTimeout(() =>{
                // We show the fianl section
                buildEndGameSection();
                // Then check the buttons
                checkButtons();   
            }, 1000);
        }
    }))
}