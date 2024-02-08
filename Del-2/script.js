

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

  // Lägger till ett mottaget kort i spelarens hand. Används när nya kort delas ut från kortleken.
  // Använder push metoden för att Lägga till ett kort i spelarens hand.
  addCard(card) {
    this.hand.push(card);
  }

  // Beräknar den totala summan av kortens värde i handen för att bestämma spelarens poäng.
  // Med reducse metoden beräknas och returneras den totala summan av värdet på korten i handen.
  calculateHandValue() {
    return this.hand.reduce((sum, card) => sum + card.value, 0);
  }

   // Tar bort valda kort från spelarens hand baserat på angivna index och placerar dem i kasthögen.
    discardCards(cardIndexes, discardPile) {
      // Sorterar indexen i fallande ordning för att undvika problem när jag tar bort flera kort.
      cardIndexes.sort((a, b) => b - a).forEach(index => {
        const discardedCard = this.hand.splice(index, 1); // Tar bort kortet vid det angivna indexet.
        discardPile.push(discardedCard); // Lägger till kortet i kasthögen med push metoden.
      });
    }
  }

//------------------Hjälpfunktioner-----------------//

// Skapar en komplett kortlek med 52 unika kort.
function createDeck() {
  const colors = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
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
console.log("Alla kort:", deck);
shuffleDeck(deck);
console.log("Blandade kort:", deck);

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

// Kasthögen där slängda kort samlas
const discardPile = [];

// Efter att båda spelarna håller nu 5 kort var i sin hand, 
//anävnder jag en forEach-loop för att kunna ta bort 2 första korten 
//ifrån varje spelare, med index platser första och andra platsen
// (0 = försa, 1 = andra).
players.forEach(player => player.discardCards([0, 1], discardPile));

// Delar ut 2 nya kort till varje spelare.
dealCards(deck, players, 2);

// Skriver ut antalet kort kvar i kortleken och information om spelarnas händer.
console.log("Antal kort efter utdelning:", deck.length);
players.forEach(player => {
  console.log(`${player.name}'s hand (${player.hand.length} kort):`, player.hand);
  console.log(`${player.name}'s handvärde:`, player.calculateHandValue());
});
