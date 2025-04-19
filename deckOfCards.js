const suits = ["♠", "♥", "♦", "♣"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
let deck = [];
let discardPile = [];

function createDeck() {
  deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push(`${value}${suit}`);
    }
  }
  deck.push("🃏 Red Joker");
  deck.push("🃏 Black Joker");
}

function drawCard() {
  if (deck.length === 0) {
    alert("Deck is empty. Please reshuffle.");
    return;
  }

  const index = Math.floor(Math.random() * deck.length);
  const drawnCard = deck.splice(index, 1)[0];
  discardPile.push(drawnCard);

  const drawnCardElement = document.getElementById("drawnCard");
  drawnCardElement.textContent = `You drew: ${drawnCard}`;
  drawnCardElement.style.color = isRedSuit(drawnCard) ? "red" : "black";

  updateDiscardPile();
}

function updateDiscardPile() {
  const discardContainer = document.getElementById("discardPile");
  discardContainer.innerHTML = "";

  const total = discardPile.length;

  if (total === 0) return;

  // Create a stack container for all but the last card
  if (total > 1) {
    const stackWrapper = document.createElement("div");
    stackWrapper.className = "stack-wrapper";

    for (let i = 0; i < total - 1; i++) {
      const card = discardPile[i];
      const cardDiv = createCardDiv(card);
      cardDiv.style.left = `${i * 3}px`;
      cardDiv.style.zIndex = i;
      stackWrapper.appendChild(cardDiv);
    }

    discardContainer.appendChild(stackWrapper);
  }

  // Show only the last drawn card
  const lastCard = discardPile[total - 1];
  const cardDiv = createCardDiv(lastCard);
  cardDiv.classList.add("highlight");
  discardContainer.appendChild(cardDiv);
}

function reshuffle() {
  deck = [...deck, ...discardPile];
  discardPile = [];
  document.getElementById("drawnCard").textContent = "Deck reshuffled!";
  updateDiscardPile();
}

function isRedSuit(card) {
  return card.includes("♥") || card.includes("♦") || card.includes("Red Joker");
}

function formatCardFront(card, isRed) {
  // Extract value & suit
  if (card.includes("Joker")) {
    return `<div class="joker-face">${card}</div>`;
  }

  const value = card.slice(0, card.length - 1);
  const suit = card.slice(-1);
  return `
    
    <div class="center-suit">${value}${suit}</div>
    
  `;
}

function createCardDiv(card) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "playing-card";

  if (isRedSuit(card)) {
    cardDiv.classList.add("red");
  }

  if (card.includes("Joker")) {
    cardDiv.innerHTML = `<div class="joker-face">${card}</div>`;
  } else {
    const value = card.slice(0, card.length - 1);
    const suit = card.slice(-1);
    cardDiv.innerHTML = `<div class="center-suit">${value}${suit}</div>`;
  }

  return cardDiv;
}


// Initialize deck on load
createDeck();
