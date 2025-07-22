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
    welcome.remove();
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

    let title = document.createElement("div");
    title.className = "title";
    title.textContent = "Memory Game";

    let timeLeft = document.createElement("div");
    timeLeft.className = "time-left";

    header.appendChild(score);
    header.appendChild(title);
    header.appendChild(timeLeft);

    let cardsContianer = document.createElement("div");
    cardsContianer.className = "cards";

    for(let i = 0; i < cards.length; i++) {
        let card = document.createElement("card");
        card.className = "card";

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
}

// Shuffle Function
function shuffle(array) {
    for(let i = 0; i < array.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}