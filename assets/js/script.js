let isMatch = 0;

// Card images
const getData = () => [
    {name: "ElephantCard", image: "assets\images\ElephantCard.png"}
]

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

// Card information

face.src = item.image;
cardGenerator.setAttribute('name', item.name);


function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
}