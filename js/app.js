/**
 * Ecotaste - nucleo de controle do dom e eventos
 * manipulador inteligente de eventos, dados, renderização da interface.
 */

// 1. estado de aplicação ( onde os dados de compra são manipulados temporariamente )

let carrinho = [];

// 2.elementos mapeados (css e html) com o dom

const vitrineContainer = document.getElementById("vitrine"); 
const cartItemContainer = document.getElementById("cart-items");
const cartTotalDipslay = document.getElementById("cart-total");
const cartCounterDisplay = document.getElementById("cart-counter");
const btnFinalizar = document.getElementById("btn-finalizar");

/**
 *  renderização da vitrine de produtos
 *  varre o catalogo e monta os elementos html correspondentes
 */

const renderizarVitrine = () => {
let vitrineHTML = "";

    CATALOGO_PRODUTOS.forEach(produto => {
        vitrineHTML += `
            <article class="card-produto">
                <span class="categoria">${produto.categoria}</span>
                <h3>${produto.nome}</h3>
                <p class="preco-produto">R$ <strong>${produto.preco.toFixed(2)}</strong></p>
                <button class="btn-comprar" data-id="${produto.id}">
                    Adicionar ao Carrinho
                </button>
            </article>
        `;
    });

    vitrineContainer.innerHTML = vitrineHTML;
    
    // Vincula ouvintes de evento aos botões criados dinamicamente
    vincularEventosComprar();
};


const vincularEventosComprar= () => {
    const botoesComprar = document.querySelectorAll(".btn-comprar");

    botoesComprar.forEach(botao => {
        // Uso de Arrow Function moderna para capturar a ação
        botao.addEventListener("click", (event) => {
            const produtoId = Number(event.target.getAttribute("data-id"));
            adicionarItemAoCarrinho(produtoId);
        });
    });
};

const adicionarItemAoCarrinho = (id) => {
    // Busca o produto com ID correspondente dentro do Mock de dados
    const produtoSelecionado = CATALOGO_PRODUTOS.find(prod => produtoTarget(prod, id));

    if (produtoSelecionado) {
        carrinho.push(produtoSelecionado);
        console.log(`[EcoTaste] Adicionado: ${produtoSelecionado.nome}`);
        atualizarCarrinho();
    }
};

const produtoTarget = (produto, targetId) => produto.id === targetId;

const atualizarCarrinho = () => {
    // Atualização do contador do Header
    cartCounterDisplay.innerText = carrinho.length;

    if (carrinho.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Seu carrinho está vazio.</p>';
        cartTotalDisplay.innerText = "0.00";
        btnFinalizar.disabled = true;
        return;
    }

    // Se houver itens, habilita o botão de finalizar
    btnFinalizar.disabled = false;

    let cartHTML = "";
    let totalAcumulado = 0;

    // Constrói a lista visual de itens no carrinho
    carrinho.forEach((item, index) => {
        totalAcumulado += item.preco;
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.nome}</h4>
                    <p>R$ ${item.preco.toFixed(2)}</p>
                </div>
                <button class="btn-remover" data-index="${index}">Remover</button>
            </div>
        `;
    });

    cartItemContainer.innerHTML = cartHTML;
    cartTotalDipslay.innerText = totalAcumulado.toFixed(2);

    // Vincula a ação de exclusão aos novos botões gerados
    vincularEventosRemover();
};

const vincularEventosRemover = () => {
    const botoesRemover = document.querySelectorAll(".btn-remover");

    botoesRemover.forEach(botao => {
        botao.addEventListener("click", (event) => {
            const index = Number(event.target.getAttribute("data-index"));
            removerItemDoCarrinho(index);
        });
    });
};

const removerItemDoCarrinho = (index) => {
    carrinho.splice(index, 1);
    atualizarCarrinho();
};

btnFinalizar.addEventListener("click", () => {
    alert("Compra finalizada com sucesso!");
    carrinho = [];
    atualizarCarrinho();
});

// Inicialização da aplicação
window.addEventListener("DOMContentLoaded", () => {
    renderizarVitrine();
});