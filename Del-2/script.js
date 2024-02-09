

//------------------Klassdefinitioner-----------------//

// Definierar en klass för ett kortspel med egenskaper för färg, namn och värde.
class Card {
  constructor(color, name, value) {
    this.color = color; 
    this.name = name;   
    this.value = value; 
  }
}

// Definierar en klass för en spelare med namn och en hand med kort.
class Player {
  constructor(name) {
    this.name = name; 
    this.hand = [];     
  }

  //------------------Metoder-----------------//

// Lägger till ett mottaget kort i spelarens hand med push-metoden.
  addCard(card) {
    this.hand.push(card);
  }

  // Beräknar den totala summan av kortens värde i handen för att bestämma spelarens poäng med reduce-metoden.
  calculateHandValue() {
    return this.hand.reduce((sum, card) => sum + card.value, 0);
  }

   // Tar bort valda kort från spelarens hand baserat på angivna index och placerar dem i kasthögen.
    discardCards(cardIndexes, discardPile) {
      // Sorterar indexen i fallande ordning för att undvika problem när jag tar bort flera kort.
      cardIndexes.sort((a, b) => b - a).forEach(index => {
        const [discardedCard] = this.hand.splice(index, 1); // Tar bort kortet vid det angivna indexet.
        discardPile.push(discardedCard); // Lägger till kortet i kasthögen med push metoden.
      });
    }
  }

//------------------Hjälpfunktioner-----------------//

// Skapar en komplett kortlek med 52 unika kort.
function createDeck() {
  const colors = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const names = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
  const deck = []; 

  // Dubbel loop för att skapa varje kombination av färg och namn.
  for (let color of colors) {
    for (let i = 0; i < names.length; i++) {
      const value = i + 2; // Sätter ett numeriskt värde för varje kort
      deck.push(new Card(color, names[i], value));
    }
  }

  return deck; // Returnerar den skapade kortleken.
}

// Googlat upp hur man blandar kortlek, och kommit fram till 
// att man använder algoritmen nedan. 
// Blandar kortleken med hjälp av Fisher-Yates shuffle-algoritmen.
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const index = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[index]] = [deck[index], deck[i]]; // Byter plats på två kort.
  }
}

//------------------Spellogik-----------------//

// Skapar och blandar en ny kortlek.
const deck = createDeck();
// (Oblandade kort)
console.log("\nAlla kort:", deck.map(card => `${card.name} of ${card.color}`));
// (Blandade kort)
shuffleDeck(deck);
console.log("\nBlandade kort:", deck.map(card => `${card.name} of ${card.color}`));

// Skapar två spelare
const players = [new Player("Slim"), new Player("Luke")];

// Delar ut ett specificerat antal kort från kortleken till varje spelare.
function dealCards(deck, players, numCards) {
  for (let i = 0; i < numCards; i++) {
    players.forEach(player => {
      if (deck.length > 0) {
        const card = deck.shift(); // Tar bort det översta kortet från kortleken och lägger till det i spelarens hand.
        player.addCard(card); // Lägger till det borttagna kortet i spelarens hand
      }
    });
  }
}

// Delar ut 5 kort till varje spelare.
dealCards(deck, players, 5);
console.log("\nAntal kort efter första utdelning:", deck.length); 

// Efter att båda spelarna har fått 5 kort var i sina händer,
// använder jag en forEach-loop för att visa varje spelares hand och beräkna handvärdet.
players.forEach(player => {
  console.log(`\n${player.name}'s hand (${player.hand.length} kort):`, player.hand.map(card => `${card.name} of ${card.color}`));
  console.log(`\n${player.name}'s handvärde:`, player.calculateHandValue());
});

// Kasthögen där slängda kort samlas
const discardPile = [];


// Spelarna slänger 2 kort var och nya kort delas ut
console.log("\nSpelarna slänger 2 kort var och får 2 nya kort:");
players.forEach(player => player.discardCards([0, 1], discardPile));
dealCards(deck, players, 2);

// Visar uppdaterade händer och handvärden efter att nya kort har delats ut
players.forEach(player => {
  console.log(`\n${player.name}'s uppdaterade hand (${player.hand.length} kort):`, player.hand.map(card => `${card.name} of ${card.color}`));
  console.log(`\n${player.name}'s handvärde efter uppdatering:`, player.calculateHandValue());
});

// Visar antalet kort kvar i kortleken
console.log("\nAntal kort kvar i kortleken:", deck.length);


players.forEach(player => {
  discardPile.push(...player.hand);
  player.hand = [];
});
console.log("\nSpelarna har kastat sina kort. Kasthögen innehåller nu:", discardPile.map(card => `${card.name} of ${card.color}`));


deck.push(...discardPile);
console.log("\nFlyttar korten från kasthögen tillbaka till kortleken.");
console.log("\nKasthögen är nu tom:", discardPile.length = 0);

// Blandar korleken för en ny omgång.
shuffleDeck(deck);
console.log("\nBlandade kort:", deck.map(card => `${card.name} of ${card.color}`));
