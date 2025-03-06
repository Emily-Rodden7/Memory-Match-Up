let lockBoard = false;
let firstCards, secondCard;
let attempts = 0;

// Card images
const imageNames = [
    {name: "ElephantCard", image: "assets/images/ElephantCard.png"},
    {name: "GiraffeCard", image: "assets/images/GiraffeCard.png"},
    {name: "GorillaCard", image: "assets/images/GorillaCard.png"},
    {name: "LeopardCard", image: "assets/images/LeopardCard.png"},
    {name: "LionFaceCard", image: "assets/images/LionFaceCard.png"},
    {name: "MonkeyCard", image: "assets/images/MonkeyCard.png"},
    {name: "SnakeCard", image: "assets/images/SnakeCard.png"},
    {name: "TocoToucanCard", image: "assets/images/TocoToucanCard.png"},
    {name: "HippoCard", image: "assets/images/HippoCard.png"}
];
// Duplicating the images to create pairs
let cards = [...imageNames, ...imageNames];

    shuffleCards();

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

    // Generate the cards after shuffle
    generateCards();
    
    function generateCards() {
        const gridContainer = document.getElementById("gridContainer");
        gridContainer.innerHTML = ''; // clears existing cards
        cards.forEach((card) => { 
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.setAttribute("data-name", card.name);
            cardElement.innerHTML = `
            <div class = "front"> 
            <img class = "front-image" src=${card.image} alt=${card.name} />
            </div>
            
            <div class = "back"></div>
            `;
            gridContainer.appendChild(cardElement);
            cardElement.addEventListener("click", flipCard);
        })
        resetCards();
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
        lockBoard = true;

        checkForMatch(); // Checks if the two cards match
    }
    
    // Function to check if two cards match
    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        if (!isMatch) {
            attempts++; // only increase errors if cards don't match
            document.querySelector("#attempts").textContent = attempts;
        }
        // Handle the card match or mismatch
        isMatch ? disableCards() : unflipCards();
    }
    // Disable the cards if they are a match
    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        // Check if the player has won
        checkForWin();

        resetCards()
    }
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetCards();
        }, 1000);
    };
    // Reset the board
    function resetCards() {
        [firstCard, secondCard, lockBoard] = [null, null, false]
    };

    // Restart the game
    function restart() {
        attempts = 0;
        document.querySelector("#attempts").textContent = attempts;

    // Reset game state
    resetCards();

    // Shuffling and generating the cards for a new name
    cards = [...imageNames, ...imageNames];
    shuffleCards();

    // Hide the "You Win" popup
    const winPopup = document.getElementById("winPopup");
    winPopup.style.display = "none";
};

// popup window for you win
function checkForWin() {
    const allCards = document.querySelectorAll(".card");
    const flippedCards = document.querySelectorAll(".card.flipped");

    // if all cards are flipped the game is won
    if (allCards.length === flippedCards.length) {
        showWinPopup();
    }
}

// popup with attempt count
function showWinPopup() {
    const showWinPopup = document.getElementById("winPopup");
    const attemptDisplay = document.getElementById("attempts");

    attemptDisplay.textContent = attempts;
    winPopup.style.display = "flex"

    restartButton.style.display = "none"; // hide restart button when pop is visible
}
