const produto1 = {
  nome: "Notebook",
  preco: 3500,
  categoria: "Eletrônicos",
  estoque: 10,
  emPromocao: true
};


const produto2 = {
  nome: "Tênis",
  preco: 250,
  categoria: "Calçados",
  estoque: 20
};

const produto3 = {
  nome: "Camiseta",
  preco: 80,
  categoria: "Roupas",
  estoque: 15
};

function calcularDesconto(preco,percentual){
const desconto = preco * (percentual / 100);
  return preco - desconto;
}
 const resultado = calcularDesconto(200, 10);
console.log(resultado);

function exibirProduto(produto) {
  console.log(`Nome: ${produto.nome}, Preço: ${produto.preco}, Estoque: ${produto.estoque}`);
}

if (produto1.emPromocao) {
  console.log("Produto em promoção!");
} else {
  console.log("Produto sem promoção.");
}

const produtos = [produto1, produto2, produto3];

for (let i = 0; i < produtos.length; i++) {
  console.log(`${i + 1}. ${produtos[i].nome}`);
}