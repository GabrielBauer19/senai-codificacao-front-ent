const produtos = [
  { id: 1, nome: "Caneca", preco: 25, categoria: "Casa" },
  { id: 2, nome: "Mochila", preco: 120, categoria: "Acessórios" },
  { id: 3, nome: "Fone", preco: 90, categoria: "Eletrônicos" }
];

const formatar = ({ nome, preco }) => `${nome} - R$ ${preco}`;

const baratos = produtos.filter(p => p.preco < 100);
console.log(baratos);

const promo = { ...produtos[0], preco: 19.90 };
console.log("Original:", produtos[0].preco, "Promoção:", promo.preco);

const container = document.getElementById("lista");

produtos.forEach(produto => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = formatar(produto);

  card.addEventListener("click", () => {
    card.classList.toggle("favorito");
  });

  container.appendChild(card);
});

