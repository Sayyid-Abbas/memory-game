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
start.onclick = () => {
    document.body.innerHTML = "";
    document.body.appendChild(loader);
    setTimeout(() => {
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
let totoalScore = icons.length;

// Start Game Function
function startGame() {
    shuffle(cards);
    buildBoard(cards);
}

function buildBoard(cards) {

    let gameContianer = document.createElement("div");
    gameContianer.className = "game-container";

    let header = document.createElement("div");
    header.className = "header";

    let score = document.createElement("div");
    score.className = "score";
    score.textContent = `${0} of ${totoalScore}`;

    let title = document.createElement("div");
    title.className = "title";
    title.textContent = "Memory Game";

    let timeLeft = document.createElement("div");
    timeLeft.className = "time-left";
    timeLeft.textContent = `Left: ${120}`;

    header.appendChild(score);
    header.appendChild(title);
    header.appendChild(timeLeft);

    let cardsContianer = document.createElement("div");
    cardsContianer.className = "cards";

    for(let i = 0; i < cards.length; i++) {
        let card = document.createElement("card");
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

        cardsContianer.appendChild(card);
    }

    gameContianer.appendChild(header);
    gameContianer.appendChild(cardsContianer    );

    document.body.appendChild(gameContianer);
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
let click1 = false;
let firstCard = "";
let cardIndex = -1;
function startTesting() {
    let gameContianer = document.querySelector(".game-container");
    let cards = document.querySelectorAll(".card");
    let score = document.querySelector(".score");
    let timeLeft = document.querySelector(".time-left");
    let counter = 0;
    let time = 120;
    let timer = setInterval(() => {
        timeLeft.textContent = `Left: ${--time}`;
        if(time == 0) {
            clearInterval(timer);

            let sign = document.createElement("div");
            sign.textContent = "Time Out";
            sign.className = "sign";
            gameContianer.appendChild(sign);
            setTimeout(() =>{
                endGame();
            }, 1000);
        }
    }, 1000);

    document.addEventListener("click", (e) => {
        cards.forEach((card) => {
            if(card.contains(e.target)) {
                if(!click1) {
                    cardIndex = card.dataset.index;
                    firstCard = card;
                    click1 = true;
                    card.classList.add("active");
                } else {
                    if(card.dataset.index == cardIndex) {
                        return;
                    }
                    card.classList.add("active");
                    document.body.style.pointerEvents = "none";
                    setTimeout(() => {
                        document.body.style.pointerEvents = "auto";
                        if(card.innerHTML == firstCard.innerHTML) {
                            click1 = false;
                            firstCardIndex = -1;
                            firstCard = "";
                            counter++;
                            score.textContent = `${counter} of ${totoalScore}`;
                            if(counter == totoalScore) {
                                setTimeout(() => {
                                    endGame();
                                }, 1000)
                            }
                        } else {
                            click1 = false;
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
function endGame() {
    document.body.innerHTML = "";

    let endGame = document.createElement("div");
    endGame.className = "end-game";

    let headTitle = document.createElement("h3");
    headTitle.textContent = "Thanks For Trying Out The Game";

    let buttons = document.createElement("div");
    buttons.className = "buttons";

    let tryAginButton = document.createElement("try-again");
    tryAginButton.className = "try-again";
    tryAginButton.textContent = "Try Again";

    let closeButton = document.createElement("div");
    closeButton.className = "close-game";
    closeButton.textContent = "Close Game";

    buttons.appendChild(tryAginButton);
    buttons.appendChild(closeButton);

    endGame.appendChild(headTitle);
    endGame.appendChild(buttons);

    document.body.appendChild(endGame);

    checkButtons();
}
function checkButtons() {
    let close = document.querySelector(".close-game");
    let tryAgain = document.querySelector(".try-again");

    document.addEventListener("click", (e) => {
        if(close.contains(e.target)) {
            document.body.innerHTML = "";
            document.body.appendChild(document.createTextNode("Good Bye"));
            document.body.style.cssText = "height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 20px";
        }
    });
    document.addEventListener("click", (e) => {
        if(tryAgain.contains(e.target)) {
            start.click();
        }
    });
};