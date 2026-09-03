// 1. Selecionando Elementos pelo Id
// o método getElementById busca no html o elemento que possui o id  correspondente.
const titulo = document.getElementById("cardTitulo");
const descricao = document.getElementById("cardDescricao");
const botao = document.getElementById("btnSaibaMais");

//Exibe os elementos selecionados no console do navegador (F12)
console.log("Elemento do título:", titulo);
console.log("Elemento do botão:", botao);

//2. Lendo e Alterando conteúdo(texto)
//podemos ler ou alterar o texto de um elemento com .innerText ou .textContent
console.log("Texto atual do título:", titulo.innerText);

//3. Adicionando um evento de clique com document.getElementById
// Quando o usuario clica no botão, alteramos o conteúdo e o estilo dos elementos na pagina
botao.addEventListener("click", function () {
    // Alterando o texto do título
    titulo.innerText = "JavaScript no Dom! ";

    // Alterando o texto da descrição
    descricao.innerText = "Você clicou no botão e o texto foi alterado usando document.getElementById() com sucesso!";

    // Alterando o estilo CSS diretamente pelo JavaScript
    titulo.style.color = "#4f46e5";
    botao.style.backgroundColor = "#10b981";
    botao.innerText = "Texto Atualizado!"
})

const tag = document.querySelector(".card-tag");
console.log("queryselector('.card-tag1') encontrou:", tag.textcontent);




const cards = Document.querySelectorall(".card");
console.log(`queryselectorall('.card)encontrou ${cards.length}cards(s)`);

cards.foreach(function(card,indece){
    const titulodocard = card.querySelector(".card-title");
    console.log(`card ${indice + 1}:`, titulodocard ? titulodocard.textcontent: "sem titulo");

})

``
tag.innerHTML = "<strong>frontend</strong>";
console.log("innerhtml interpretou a tag <strong/>. resultado :",tag.innerHTML);
const elementodeteste = document.createElement("span");
elementodeteste.textContent = "<strong>frontend</strong>";
console.log("textcontent nao interpreta a tag - ele vira texto puro:", elementodeteste.textContent);



