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