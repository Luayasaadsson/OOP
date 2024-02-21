

//------------------Klassdefinitioner-----------------//

// Definierar en klass för ett kortspel med egenskaper för färg, namn och värde.
class Card {
  constructor(color, name, value) {
    this.color = color; // Färgen på kortet (Hjärter, Ruter, Klöver, Spader).
    this.name = name;   // Namnet på korteten.
    this.value = value; // Värdet på kortet, för att räkna poäng.
  }
}

// Definierar en klass för en spelare. Varje spelare har ett namn och en hand med kort.
class Player {
  constructor(name) {
    this.name = name; // Namnet på spelaren.
    this.hand = [];   // Spelarens hand, en tom array från början för samling av kort.
  }

  //------------------Metoder-----------------//

// Metod för att lägga till ett kort i spelarens hand.
  addCard(card) {
    this.hand.push(card); // Lägger till det mottagna kortet i handen.
  }

  // Metod för att beräkna den totala summan av kortens värde i handen.
  calculateHandValue() {
    return this.hand.reduce((sum, card) => sum + card.value, 0); // Summerar värdena av alla kort i handen, med metoden reduce.
  }

   // Metod för att ta bort specifika kort från spelarens hand och lägga dem i en kasthög.
    discardCards(cardIndexes, discardPile) {
      // Sorterar indexen i fallande ordning för att undvika problem när jag tar bort flera kort.
      cardIndexes.sort((a, b) => b - a).forEach(index => {
        const [discardedCard] = this.hand.splice(index, 1); // Tar bort kortet vid det angivna indexet.
        discardPile.push(discardedCard); // Lägger till kortet i kasthögen med push metoden.
      });
    }
  }

//------------------Hjälpfunktioner-----------------//

// Funktion för att skapa en komplett kortlek med 52 unika kort.
function createDeck() {
  const colors = ["Hearts", "Diamonds", "Clubs", "Spades"]; // De fyra färgerna.
  const names = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]; // Alla möjliga namn/värden på kortleken.
  const deck = []; 

   // Loopar igenom varje färg och namn för att skapa varje unikt kort.
  for (let color of colors) {
    for (let i = 0; i < names.length; i++) {
      const value = i < 9 ? i + 2 : 10; // Bestämmer kortets värde, 10 för klädda kort.
      deck.push(new Card(color, names[i], names[i] === "Ace" ? 11 : value)); // Skapar och lägger till kortet i leken.
    }
  }
  return deck; // Returnerar den färdiga kortleken.
}

// Googlat upp hur man blandar kortlek, och kommit fram till 
// att man använder algoritmen nedan. 
// Blandar kortleken med hjälp av Fisher-Yates shuffle-algoritmen.
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) { // Väljer ett slumpmässigt index.
    [deck[i], deck[index]] = [deck[index], deck[i]]; // Byter plats på korten.
  }
}

//------------------Spellogik-----------------//

// Skapar och blandar en ny kortlek.
const deck = createDeck();
// (Oblandade kort)
console.log("\nAlla kort:", deck.map(card => `${card.name} ${card.color} ${card.value}`));
// (Blandade kort)
shuffleDeck(deck);
console.log("\nBlandade kort:", deck.map(card => `${card.name} ${card.color} ${card.value}`));

// Skapar två spelare.
const players = [new Player("Slim"), new Player("Luke")];

// Funktion för att dela ut kort från kortleken till spelarna.
function dealCards(deck, players, numCards) {
  players.forEach(player => {
    for (let i = 0; i < numCards; i++) {
      if (deck.length > 0) {
        const card = deck.shift();
        player.addCard(card);
      }
    }
  });
}

// Delar ut 5 kort till varje spelare.
dealCards(deck, players, 5);
console.log("\nAntal kort efter första utdelning:", deck.length); 

// Efter att båda spelarna har fått 5 kort var i sina händer,
// använder jag en forEach-loop för att visa varje spelares hand och beräkna handvärdet.
players.forEach(player => {
  console.log(`\n${player.name}'s hand:`)
  player.hand.forEach(card => console.log(`${card.name} of ${card.color}, Value: ${card.value}`));
  console.log(`\n${player.name}'s handvärde:`, player.calculateHandValue());
});

// Kasthögen där slängda kort samlas.
const discardPile = [];


// Spelarna slänger de första 2 korten och får 2 nya kort.
console.log("\nSpelarna slänger 2 kort var och får 2 nya kort:");
players.forEach(player => {

  let discardedCards = player.hand.splice(0, 2); // Tar bort de två första korten.
  discardPile.push(...discardedCards); // Lägger till dem i kasthögen.

  // Ger spelarna två nya kort var. 
  for (let i = 0; i < 2; i++) {
    if (deck.length > 0) {
      const card = deck.shift();
      player.hand.unshift(card); // Lägger till de nya korten i början av handen.
    }
  }
});

// Visar uppdaterade händer och handvärden efter att nya kort har delats ut.
players.forEach(player => {
  console.log(`\n${player.name}'s uppdaterade hand:`)
  player.hand.forEach(card => console.log(`${card.name} of ${card.color}, Value: ${card.value}`));
  console.log(`\n${player.name}'s handvärde efter uppdatering:`, player.calculateHandValue());
});

// Visar antalet kort kvar i kortleken.
console.log("\nAntal kort kvar i kortleken:", deck.length);

// Tömmer spelarnas händer och flyttar korten till kasthögen.
players.forEach(player => {
  discardPile.push(...player.hand);
  player.hand = [];
});
console.log("\nSpelarna har kastat sina kort. Kasthögen innehåller nu:", discardPile.map(card => `${card.name} ${card.color} ${card.value}`));

// Lägger tillbaka korten från kasthögen till leken och blandar om för en ny omgång.
deck.push(...discardPile);
console.log("\nFlyttar korten från kasthögen tillbaka till kortleken.");
console.log("\nKasthögen är nu tom:", discardPile.length = 0);

// Blandar korleken för en ny omgång.
shuffleDeck(deck);
console.log("\nBlandade kort:", deck.map(card => `${card.name} ${card.color} ${card.value}`));
