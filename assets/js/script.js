let isMatch = 0;

// Card images
const getData = () => [
    {name: "ElephantCard", image: "assets\images\ElephantCard.png"},
    {name: "GiraffeCard", image: "assets\images\GiraffeCard.png"},
    {name: "GorillaCard", image: "assets\images\GorillaCard.png"},
    {name: "HippoCard", image: "assets\images\LeopardCard.png"},
    {name: "LionFaceCard", image: "assets\images\LionFaceCard.png"},
    {name: "MonkeyCard", image: "assets\images\MonkeyCard.png"},
    {name: "SnakeCard", image: "assets\images\SnakeCard.png"},
    {name: "TocoToucanCard", image: "assets\images\TocoToucanCard.png"}
];

// randomizing cards
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};
randomize();

// Function of the cards

const cardGenerator = () => {
    const cardData = randomize();
}

// Image card information

face.src = item.image;
cardGenerator.setAttribute('name', item.name);

// generate HTML

cardData.forEach((item) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'tile';
    face.classList = 'face';
    back.classList = 'back';
})

// Attaching cards to the game-container

let game = document.getElementById("game");
game.appendChild(card);
card.appendChild(face);
card.appendChild(back);
card.addEventListener('click', (e) => {
    card.classList.toggle("toggleCard");
    checkCard(e);
});

// Checking if the cards match each other

const checkCards = (e) => {
    const clockedTile = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");

    if (flippedCards.length === 2) {
        if(
            flippedCards[0].getAttribute("name") ===
            flippedCards[1].getAttribute("name")
        ) {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = 'none';
                isMatch += 1;
                console.log("It's a match!");
            });
        } else {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 900);
            });
        }
        addMove();

        if(isMatch === 18) { 
            document.querySelector(".win").style.display = "block";
        }
    }
}

// reset the game

let game = document.getElementById("game");
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", () => {
    ServiceWorkerContainer.innerHTML = 0;
    moves = 0;
    game.innerHTML = '';
    cardGenerator();
});

// Score count function

let scoreContainer = document.getElementById("moves");

let moves = 0;
scoreContainer.innerHTML = 0;
console.log(scoreContainer);

function addMove() {
    moves++;
    scoreContainer.innerHTML = moves;
}