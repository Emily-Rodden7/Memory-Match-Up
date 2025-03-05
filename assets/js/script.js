const gridContainer = document.querySelector(".grid-container";)
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let errors = 0;

document.querySelector(".errors").textContent = error;

fetch("assets\images")
.then((res) => res.images())
.then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
});

function shuffleCards() {
    let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

// Card images
const images = [
    {name: "ElephantCard", image: "assets\images\ElephantCard.png"},
    {name: "GiraffeCard", image: "assets\images\GiraffeCard.png"},
    {name: "GorillaCard", image: "assets\images\GorillaCard.png"},
    {name: "HippoCard", image: "assets\images\LeopardCard.png"},
    {name: "LionFaceCard", image: "assets\images\LionFaceCard.png"},
    {name: "MonkeyCard", image: "assets\images\MonkeyCard.png"},
    {name: "SnakeCard", image: "assets\images\SnakeCard.png"},
    {name: "TocoToucanCard", image: "assets\images\TocoToucanCard.png"}
];