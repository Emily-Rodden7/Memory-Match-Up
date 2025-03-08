let lockBoard = false;
let firstCards, secondCard;
let attempts = 0;

// Card images
const imageNames = [
    {image: "assets/images/elephant.png", name: "elephant"},
    {image: "assets/images/giraffe.png", name: "giraffe"},
    {image: "assets/images/gorilla.png", name: "gorilla"},
    {image: "assets/images/leopard.png", name: "leopard"},
    {image: "assets/images/lion.png", name: "lion"},
    {image: "assets/images/monkey.png", name: "monkey"},
    {image: "assets/images/snake.png", name: "snake"},
    {image: "assets/images/tocotoucan.png", name: "tocotoucan"},
    {image: "assets/images/hippo.png", name: "hippo"}
];

// Make sure win popup stays hidden until the game is won
const winPopup = document.getElementById("winPopup");
winPopup.style.display = "none";

// Track if sound is enabled or disabled ( true = sound)
let soundEnabled = true;

// Sound played each time there is a match
const matchSound = new Audio("assets/audio/chime-winsound.mp3");

 // Applauce sound for when the Win Popup appears
 const applauseSound = new Audio("assets/audio/applause-sound.mp3");

 // Get the sound toggle image element
 const soundToggleButton = document.getElementById('soundToggleButton');

 // Add an event listener to the image
 soundToggleButton.addEventListener('click', toggleSound);
 
 // Function to toggle the sound 
 function toggleSound() {
    soundEnabled = !soundEnabled;

 // Change the image based on the sound state
 if (!soundEnabled) {
    soundToggleButton.src = "assets/images/sound-off.png"; // Show sound off image
    matchSound.volume = 0;
    applauseSound.volume = 0;
 } else {
    soundToggleButton.src = "assets/images/sound-on.png"; // Show sound on image
    matchSound.volume = 0.2
    applauseSound.volume = 0.2;
 }
 }

// Duplicating the images to create pairs
let cards = [...imageNames, ...imageNames];

    shuffleCards();

// Shuffle cards (Watched YouTube videos for help here)
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

    // Generate the cards after shuffle (Watched YouTube videos for help here)
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
    // Flip function to turn the cards around (Watched YouTube videos for help here)
    function flipCard() {
        if (!lockBoard) {

        if (this === firstCard) return;

        this.classList.add("flipped");

        if (!firstCard) {
            firstCard = this;
            return;
        }
        secondCard = this;
        lockBoard = true;

        checkForMatch(); // Checks if the two cards match
        }}
    
    // Function to check if two cards match
    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;

        if (isMatch === true) {
            disableCards(); // Freeze the matched cards
            matchSound.play(); // Play match sound when the cards match
        } else {
            attempts++; // only increase attempts if cards don't match
            document.querySelector("#attempts").textContent = attempts;
            unflipCards(); // Turn unmatched cards back over
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
    // Unflip the cards, not showing the animals
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetCards();
        }, 1000);
    };
    // Reset the page
    function resetCards() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
        
    };

    // Restart the game
    function restart() {
        attempts = 0;
        document.querySelector("#attempts").textContent = attempts;

    // Reset game state
    resetCards();

    const restartButton = document.getElementById("restartButton");
    restartButton.style.display = "inline";

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

// popup appears with attempt count
function showWinPopup() {
    const winPopup = document.getElementById("winPopup");
    const attemptsPopup = document.getElementById("attemptsPopup");

    // Play applause sound
    applauseSound.play();

    attemptsPopup.textContent = attempts;
    winPopup.style.display = "flex";

    const restartButton = document.getElementById("restartButton");
    restartButton.style.display = "none"; // hide in game restart button when popup is visible
}
