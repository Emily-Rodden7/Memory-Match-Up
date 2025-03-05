let isMatch = 0;

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

let flippedCards = [];
let matchedCards = 0;

const gridContainer = document.getElementById('gridContainer');
const restartButton = document.getElementById('restartButton');

function shuffleCards() {
    const shuffledCards = [...images];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + i));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    return shuffledCards;
}

function createCards() {
    const shuffledCards = shuffleCards();
    gridContainer.innerHTML = '';
    shuffledCards.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        // front of card
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const imgFront = document.createElement('img');
        imgFront.src = image.image;
        cardFront.appendChild(imgFront);

        //Back of card - the hidden side
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const imgBack = document.createElement('img');
        imgBack.src = 'assets\images\Green-CardBack.png';
        cardBack.appendChild(imgBack);

        // Append front and back to cardInner
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        // Append cardInner to the card and set event listener
        card.appendChild(cardInner);
        card.addEventListener('click', () => flippedCards(card));

        // Append card to the gridContainer
        gridContainer.appendChild(card);
    });
}

function flipCard(card) {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.querySelector('.card-front img').src === secondCard.querySelector('.card-front img').src) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards += 2;
        if (matchedCards === images.length) {
            setTimeout(() => alert("You've Won! Congratulations."), 500);
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

restartButton.addEventListener('click', createCards);

// Start the game
createCards();