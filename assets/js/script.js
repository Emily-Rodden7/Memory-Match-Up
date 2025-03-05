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

    function generateCards() {
        for (let card of cards) {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.setAttribute("data-name", card.name);
            cardElement.innerHTML = `
            <div class = "front">
            <img class = "front-image" src = CSS= {card.image} />
            </div>
            <div class = "back"></div>
            `;
            gridContainer.appendChild(cardElement);
            cardElement.addEventListener("click", flipCard);
        }
    }
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add("flipped");

        if (!firstCard) {
            firstCard = this;
            return;
        }
        secondCard = this;
        error++;
        document.querySelector(".error").textContent = error;
        lockBoard = false;

        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;

        isMatch ? disableCards() : unflipCards;
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        resetBoard()
    }
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }
    function restart() {
        resetBoard();
        shuffleCards();
        errors = 0;
        document.querySelector(".error").textContent = errors;
        gridContainer.innerHTML = "";
        generateCards();
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