const gridContainer = document.querySelector(".grid-container");
let firstCard, secondCard;
let lockBoard = true;
let errors = 0;

// Card images
const images = () => [
    {name: "ElephantCard", image: "assets\images\ElephantCard.png"},
    {name: "GiraffeCard", image: "assets\images\GiraffeCard.png"},
    {name: "GorillaCard", image: "assets\images\GorillaCard.png"},
    {name: "HippoCard", image: "assets\images\LeopardCard.png"},
    {name: "LionFaceCard", image: "assets\images\LionFaceCard.png"},
    {name: "MonkeyCard", image: "assets\images\MonkeyCard.png"},
    {name: "SnakeCard", image: "assets\images\SnakeCard.png"},
    {name: "TocoToucanCard", image: "assets\images\TocoToucanCard.png"}
];
// Duplicating the images to create pairs
let cards = [...images(), ...images()];

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

        resetBoard()
    }
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
    // Reset the board
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }
    // Restart the game
    function restart() {
        resetBoard();
        shuffleCards();
        errors = 0;
        document.querySelector("#errors").textContent = errors;
        gridContainer.innerHTML = "";
    }

    // Shuffling and generating the cards for a new name
    shuffleCards();
