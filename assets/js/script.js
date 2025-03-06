let lockBoard = false;
let firstCards, secondCard;
let errors = 0;

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
            <img class = "front-image" src = "${card.image}" alt="${card.name}" />
            </div>
            
            <div class = "back"></div>
            `;
            gridContainer.appendChild(cardElement);
            cardElement.addEventListener("click", flipCard);
        })
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
        errors++;
        document.querySelector("#errors").textContent = errors;
        lockBoard = true;

        checkForMatch();
    }
    
    // Function to check if two cards match
    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;

        isMatch ? disableCards() : unflipCards();
    }
    // Disable the cards if they are a match
    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

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
        errors = 0;
        document.querySelector("#errors").textContent = errors;

    // Reset game state
    resetCards();

    // Shuffling and generating the cards for a new name
    cards = [...imageNames, ...imageNames];
    shuffleCards();
};
