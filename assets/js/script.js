let lockBoard = false;
let firstCards, secondCard;
let attempts = 0;

// Card images
const imageNames = [
    {name: "elephantcard", image: "assets/images/elephantcard.png"},
    {name: "giraffecard", image: "assets/images/giraffecard.png"},
    {name: "gorillacard", image: "assets/images/gorillacard.png"},
    {name: "leopardcard", image: "assets/images/leopardcard.png"},
    {name: "lioncard", image: "assets/images/lioncard.png"},
    {name: "monkeycard", image: "assets/images/monkeycard.png"},
    {name: "snakecard", image: "assets/images/snakecard.png"},
    {name: "tocotoucancard", image: "assets/images/tocotoucancard.png"},
    {name: "hippocard", image: "assets/images/hippocard.png"}
];

// Make sure win popup stays hidden until the game is won
const winPopup = document.getElementById("winPopup");
winPopup.style.display = "none";

// Track if sound is enabled or disabled ( true = sound)
let soundEnabled = true;

// Sound played each time there is a match
const matchSound = new Audio("assets/audio/chimewinsound.mp3");

 // Applauce sound for when the Win Popup appears
 const applauseSound = new Audio("assets/audio/applausesound.mp3");

 // Get the sound toggle image element
 const soundToggleButton = document.getElementById('soundToggleButton');

 // Add an event listener to the image
 soundToggleButton.addEventListener('click', toggleSound);
 
 // Function to toggle the sound 
 function toggleSound() {
    soundEnabled = !soundEnabled;

 // Change the image based on the sound state
 if (!soundEnabled) {
    soundToggleButton.src = 'assets/images/SoundOff.png'; // Show sound on image
    matchSound.volume = 0;
    applauseSound.volume = 0;
 } else {
    soundToggleButton.src = 'assets/images/SoundOn.png'; // Show sound off image
    matchSound.volume = 0.2;
    applauseSound.volume = 0.;
 }
 }

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

        // Play match sound when the cards match
        if (isMatch) {
            matchSound.play(); 
        }
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

    // if all cards are flipped, the game is won
    if (allCards.length === flippedCards.length) {
        showWinPopup();
    }
}

// popup with attempt count
function showWinPopup() {
    const winPopup = document.getElementById("winPopup");
    const attemptsPopup = document.getElementById("attemptsPopup");

    // Play applause sound
    applauseSound.play();

    attemptsPopup.textContent = attempts;
    winPopup.style.display = "flex"
    
    const restartButton = document.getElementById("restartButton");
    restartButton.style.display = "none"; // hide restart button when pop is visible
}
