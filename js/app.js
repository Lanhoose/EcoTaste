let carrinho = [];

const vitrineElement = document.getElementById("vitrine");
const statusFeedbackElement = document.getElementById("status-feedback");
const cartCountElement = document.getElementById("cart-count");
const cartTotalElement = document.getElementById("cart-total");

async function carregarProdutosAPI() {

    try {
        exibirLoading(true);
        statusFeedbackElement.innerHTML = "<div class='spinner'></div> <p>Carregando produtos...</p>";
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula um atraso de 1 segundo
        const response = await fetch("./data/produtos.json");

        if (!response.ok) {
            throw new Error("Erro ao carregar produtos da API. Codigo de status: " + response.status);

        }
        const produtos = await response.json();

        if(!Array.isArray(produtos) || produtos.length === 0) {
            throw new Error("Nenhum produto encontrado.");
        }
        renderizarVitrine(produtos);
    statusFeedbackElement.innerHTML = "";
    }
    catch(error){
        console.error("[EcoTaste Error Log]:", error.message);
        exibirMensagemError(error.message);
    }
    finally{
        exibirLoading(false);
        console.log("[EcoTaste]: Processo de carregamento finalizado.");
    }
}

/**
 * 2. RENDERIZAÇÃO DINÂMICA DOS CARDS NO DOM
 */
function renderizarVitrine(listaProdutos) {
    let html = "";

    listaProdutos.forEach(prod => {
        html += `
            <article class="card-produto">
                <img src="${prod.imagem}" alt="${prod.nome}">
                <span class="categoria">${prod.categoria}</span>
                <h3>${prod.nome}</h3>
                <p class="preco">R$ <strong>${prod.preco.toFixed(2)}</strong></p>
                <button
                    class="btn-comprar"
                    onclick="adicionarAoCarrinho('${prod.nome}', ${prod.preco})"
                    aria-label="Adicionar ${prod.nome} ao carrinho">
                    Adicionar ao Carrinho
                </button>
            </article>
        `;
    });

    vitrineElement.innerHTML = html;
}


/**
 * 3. EXIBIÇÃO DE MENSAGENS DE ERRO NA INTERFACE
 */
function exibirMensagemErro(mensagem) {
    vitrineElement.innerHTML = ""; // Limpa a vitrine
    statusFeedbackElement.innerHTML = `
        <div class="mensagem-erro">
            ⚠️ Ops! Não foi possível carregar os produtos.<br>
            <small>${mensagem}</small>
        </div>
    `;
}

function exibirLoading(ativo) {
    if (!ativo) {
        // Remove a mensagem de spinner quando terminar
        const spinner = statusFeedbackElement.querySelector(".spinner");
        if (spinner) spinner.remove();
    }
}

