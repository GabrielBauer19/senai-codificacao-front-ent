let carrinho = [];

const produtos = [
  {
    id: 1,
    nome: "Smartphone X",
    preco: 1299.99,
    imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    descricao: "Smartphone com alta tecnologia e design moderno."
  },
  {
    id: 2,
    nome: "Camiseta Premium",
    preco: 79.90,
    imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    descricao: "Camiseta de algodão premium, confortável e durável."
  },
  {
    id: 3,
    nome: "Relógio Luxuoso",
    preco: 2499.00,
    imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    descricao: "Relógio luxuoso com precisão suíça."
  },
  {
    id: 4,
    nome: "Fone Bluetooth",
    preco: 299.90,
    imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    descricao: "Fone de ouvido Bluetooth com som premium."
  },
  {
    id: 5,
    nome: "Mochila Inteligente",
    preco: 189.90,
    imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    descricao: "Mochila com carregamento USB integrado."
  },
  {
    id: 6,
    nome: "Webcam HD",
    preco: 249.00,
    imagem: "https://images.unsplash.com/photo-1715869618915-a7bf6608d4c3?w=400&h=400&fit=crop",
    descricao: "Webcam Full HD para videoconferências."
  }
];

const listaProdutos = document.querySelector('.products');
const areaCarrinho = document.getElementById('areaCarrinho');
const elementoTotal = document.getElementById('elementoTotal');
const carrinhoIcon = document.getElementById('abrirCarrinho');
const carrinhoContainer = document.getElementById('carrinhoContainer');
const overlay = document.getElementById('overlay');
const fecharCarrinho = document.getElementById('fecharCarrinho');
const btnFinalizar = document.getElementById('btnFinalizar');
const contadorCarrinho = document.getElementById('contadorCarrinho');

// PASSO 1: Exibir os produtos com o botão de compra
function exibirProdutos() {
  listaProdutos.innerHTML = '';

  produtos.forEach((produto) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <span class="product-price">R$ ${produto.preco.toFixed(2)}</span>
      <button class="btn-primary" data-id="${produto.id}">
        Adicionar ao Carrinho
      </button>
    `;

    // EVENT LISTENER para cada botão
    const botao = card.querySelector('button');
    botao.addEventListener('click', (evento) => {
      adicionarAoCarrinho(produto.id, evento, card);
    });

    listaProdutos.appendChild(card);
  });
}

// PASSO 3: Adicionar produtos ao carrinho
function adicionarAoCarrinho(id, evento, card) {
  const produto = produtos.find(p => p.id === id);
  const itemExistente = carrinho.find(item => item.id === id);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: 1
    });
  }

  salvarCarrinho();
  renderizarCarrinho();
  atualizarContador();
  mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);

  // Efeitos visuais no clique
  if (evento && card) {
    animarBotao(evento.target);
    animarImagemVoando(card);
    pulsarIconeCarrinho();
  }
}

// EFEITOS VISUAIS DO CLIQUE

// Efeito 1: Botão vira "✓ Adicionado!" com animação e volta ao normal
function animarBotao(botao) {
  const textoOriginal = botao.textContent;

  botao.classList.add('btn-sucesso');
  botao.textContent = '✓ Adicionado!';
  botao.disabled = true;

  setTimeout(() => {
    botao.classList.remove('btn-sucesso');
    botao.textContent = textoOriginal;
    botao.disabled = false;
  }, 1200);
}

// Efeito 2: Imagem do produto "voa" até o ícone do carrinho
function animarImagemVoando(card) {
  const imgOriginal = card.querySelector('img');
  if (!imgOriginal) return;

  const imgClone = imgOriginal.cloneNode(true);
  const posImg = imgOriginal.getBoundingClientRect();
  const posCarrinho = carrinhoIcon.getBoundingClientRect();

  imgClone.style.cssText = `
    position: fixed;
    top: ${posImg.top}px;
    left: ${posImg.left}px;
    width: ${posImg.width}px;
    height: ${posImg.height}px;
    border-radius: 8px;
    z-index: 3000;
    pointer-events: none;
    transition: all 0.7s cubic-bezier(0.55, 0, 0.85, 0.35);
  `;

  document.body.appendChild(imgClone);

  // Força o navegador a registrar a posição inicial antes de animar
  requestAnimationFrame(() => {
    imgClone.style.top = `${posCarrinho.top + 10}px`;
    imgClone.style.left = `${posCarrinho.left + 10}px`;
    imgClone.style.width = '20px';
    imgClone.style.height = '20px';
    imgClone.style.opacity = '0.3';
  });

  setTimeout(() => {
    imgClone.remove();
  }, 700);
}

// Efeito 3: Ícone do carrinho "pula" quando recebe um item
function pulsarIconeCarrinho() {
  carrinhoIcon.classList.remove('pulsar');
  void carrinhoIcon.offsetWidth; // força reflow pra reiniciar a animação
  carrinhoIcon.classList.add('pulsar');

  setTimeout(() => {
    carrinhoIcon.classList.remove('pulsar');
  }, 700);
}

// PASSO 4: Mostrar os produtos que estão no carrinho
function renderizarCarrinho() {
  areaCarrinho.innerHTML = '';

  if (carrinho.length === 0) {
    areaCarrinho.innerHTML = '<div class="carrinho-vazio">Carrinho vazio</div>';
    return;
  }

  carrinho.forEach((item) => {
    const linha = document.createElement('div');
    linha.className = 'carrinho-item';

    const subtotal = (item.preco * item.quantidade).toFixed(2);

    linha.innerHTML = `
      <div class="item-info">
        <span class="item-nome">${item.nome}</span>
        <span class="item-preco">Qtd: ${item.quantidade} × R$ ${item.preco.toFixed(2)}</span>
        <span class="item-preco">Subtotal: R$ ${subtotal}</span>
      </div>
      <button class="btn-remover" data-id="${item.id}">Remover</button>
    `;

    const btnRemover = linha.querySelector('.btn-remover');
    btnRemover.addEventListener('click', () => {
      removerDoCarrinho(item.id);
    });

    areaCarrinho.appendChild(linha);
  });

  calcularTotal();
}

// PASSO 5: Permitir remover produtos do carrinho
function removerDoCarrinho(id) {
  const itemRemovido = carrinho.find(item => item.id === id);
  carrinho = carrinho.filter((item) => item.id !== id);

  salvarCarrinho();
  renderizarCarrinho();
  atualizarContador();
  mostrarNotificacao(`${itemRemovido.nome} removido do carrinho`);
}

// PASSO 5b: Calcular e mostrar o valor total
function calcularTotal() {
  const total = carrinho.reduce((soma, item) => {
    return soma + (item.preco * item.quantidade);
  }, 0);

  elementoTotal.textContent = total.toFixed(2);
}

// PASSO 6: Salvar o carrinho no localStorage
function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// PASSO 6b: Carregar carrinho do localStorage
function carregarCarrinho() {
  const dados = localStorage.getItem('carrinho');
  carrinho = dados ? JSON.parse(dados) : [];
  renderizarCarrinho();
  atualizarContador();
}

// PASSO 7: Criar a finalização da compra
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('❌ Seu carrinho está vazio! Adicione produtos antes de finalizar.');
    return;
  }

  const total = carrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  
  const confirmacao = confirm(
    `✅ Você tem certeza?\n\nTotal: R$ ${total.toFixed(2)}\n\nClique em OK para confirmar a compra.`
  );

  if (confirmacao) {
    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
    atualizarContador();
    fecharCarrinhoLateral();
    alert('🎉 Compra realizada com sucesso!\n\nObrigado por sua compra!');
  }
}

function atualizarContador() {
  const total = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  contadorCarrinho.textContent = total;
}

function abrirCarrinhoLateral() {
  carrinhoContainer.classList.add('aberto');
  overlay.classList.add('ativo');
}

function fecharCarrinhoLateral() {
  carrinhoContainer.classList.remove('aberto');
  overlay.classList.remove('ativo');
}

function mostrarNotificacao(mensagem) {
  const notificacao = document.createElement('div');
  notificacao.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4caf50;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 2000;
    animation: slideIn 0.3s ease-in-out;
  `;
  notificacao.textContent = mensagem;
  document.body.appendChild(notificacao);

  setTimeout(() => {
    notificacao.remove();
  }, 3000);
}

carrinhoIcon.addEventListener('click', abrirCarrinhoLateral);
fecharCarrinho.addEventListener('click', fecharCarrinhoLateral);
overlay.addEventListener('click', fecharCarrinhoLateral);
btnFinalizar.addEventListener('click', finalizarCompra);

window.addEventListener('DOMContentLoaded', () => {
  carregarCarrinho();
  exibirProdutos();
});

// CSS para animação de notificação
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);