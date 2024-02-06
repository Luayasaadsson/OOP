// Definierar en konstruktorfunktion som heter Color.
// Denna funktion används för att skapa nya Color-objekt med tre egenskaper: r (röd), g (grön), och b (blå).
function Color(r, g, b) {
  this.r = r; // Sätter röd komponent av färgen.
  this.g = g; // Sätter grön komponent av färgen.
  this.b = b; // Sätter blå komponent av färgen.
}


// Lägger till en metod till Color-objektets prototyp som heter rgb.
// Denna metod returnerar en sträng som representerar objektets färg i RGB-format.
Color.prototype.rgb = function() {
  return `rgb(${this.r},${this.g},${this.b})`; // Använder template literals för att skapa strängen.
};

// Lägger till en metod till Color-prototypen som heter hex.
// Denna metod konverterar RGB-värdena till en HEX-sträng.
Color.prototype.hex = function() {
  function componentToHex(colorComponent) {
    const hex = colorComponent.toString(16); // Konverterar det enskilda värdet till hex.
    return hex.length === 1 ? "0" + hex : hex; // Ser till att strängen alltid har två tecken.
  }
  return "#" + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b); // Kombinerar hex-värdena.
};


// Lägger till en metod som heter rgba till Color-prototypen.
// Denna metod returnerar en sträng som representerar objektets färg i RGBA-format, där "a" står för alpha (transparens).
Color.prototype.rgba = function(alpha) {
  return `rgba(${this.r},${this.g},${this.b},${alpha})`; // Inkluderar alpha-värdet i strängen.
};


// Exempelanvändning
document.getElementById('rgbButton').addEventListener('click', function() {
  const myColor = new Color(100, 100, 100); // Exempelfärg
  document.body.style.backgroundColor = myColor.rgb(); // Använder rgb-metoden
});

document.getElementById('hexButton').addEventListener('click', function() {
  const myColor = new Color(200, 50, 100); // Exempelfärg
  document.body.style.backgroundColor = myColor.hex(); // Använder hex-metoden
});

document.getElementById('rgbaButton').addEventListener('click', function() {
  const myColor = new Color(200, 30, 100); // Exempelfärg
  document.body.style.backgroundColor = myColor.rgba(0.5); // Använder rgba-metoden med alpha-värde
});