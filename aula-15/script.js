const cards = document.querySelectorAll(".card");
cards.length;
cards.forEach(function (card, indice) {
const tituloDoCard = card.querySelector(".card-title");
console.log(
`Card ${indice + 1}:`,
tituloDoCard ? tituloDoCard.textContent : "(sem título)"
);
});
cards.forEach(function (card, indice) {
const tituloDoCard = card.querySelector(".card-title");
tituloDoCard
? (tituloDoCard.innerHTML = tituloDoCard.textContent + " ✅")
: console.log("(sem título)");
});
const tag = document.querySelector(".card-tag");
tag.innerHTML = "<strong>Frontend</strong>";
tag.textContent = "<strong>Frontend</strong>";