const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
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
    discardContainer.innerHTML = ""; // Clear previous
  
    discardPile.forEach(card => {
      const cardSpan = document.createElement("span");
      cardSpan.textContent = card;
      cardSpan.style.marginRight = "8px";
      cardSpan.style.color = isRedSuit(card) ? "red" : "black";
      discardContainer.appendChild(cardSpan);
    });
  }

function reshuffle() {
  deck = [...deck, ...discardPile];
  discardPile = [];
  document.getElementById("drawnCard").textContent = "Deck reshuffled!";
  updateDiscardPile();
}

function isRedSuit(card) {
    return card.includes("♥") || card.includes("♦") || card.includes("Red Joker") ;
  }

// Initialize deck on load
createDeck();
