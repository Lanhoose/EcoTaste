/**
 * ECOTASTE - CONTROLADOR DE REQUISIÇÕES E TRATAMENTO DE ERROS
 */

// Estado global da aplicação
let carrinho = []

// Selecionando os elementos do DOM / Importantes Objetos na página
const vitrineElement = document.getElementById("vitrine");
const statusFeedbackElement = document.getElementById("status-feedback");
const cartCountElement = document.getElementById("cart-count");
const cartTotalElement = document.getElementById("cart-total");



/**
 * 1. FUNÇÃO ASSÍNCRONA PARA BUSCAR OS DADOS (FETCH + TRY/CATCH)
 */
async function carregarProdutosAPI() {
        try {
        // PASSO A: Exibe o indicador visual de Loading
        exibirLoading(true);
        statusFeedbackElement.innerHTML = `
            <div class="spinner"></div>
            <p>Carregando produtos orgânicos da EcoTaste...</p>
        `;

        // Simula um atraso de rede de 1.5 segundos para verem o Loading
        await new Promise(resolve => setTimeout(resolve, 1500));

        // PASSO B: Executa o Fetch no arquivo JSON
        const response = await fetch("./data/produtos.json");

        // Validação defensiva do status HTTP (Programação Defensiva)
        if (!response.ok) {
            throw new Error(`Falha na requisição. Código HTTP: ${response.status}`);
        }

        const produtos = await response.json();

        // Validação defensiva de dados vazios
        if (!Array.isArray(produtos) || produtos.length === 0) {
            throw new Error("Nenhum produto foi encontrado no catálogo.");
        }

        // PASSO C: Renderiza / Carrega os produtos com sucesso
        renderizarVitrine(produtos);
        statusFeedbackElement.innerHTML = ""; // Limpa a área de feedback
// Aula 09 - Acima

// Aula 10 - Abaixo
    
        } catch (error) {
        // TRATAMENTO DE EXCEÇÃO: Captura qualquer erro e notifica o usuário na UI
        console.error("[EcoTaste Error Log]:", error.message);
        exibirMensagemErro(error.message);
    } finally {
        // BLOCO FINALLY: Executa SEMPRE, independente de dar certo ou errado
        exibirLoading(false);
        console.log("[EcoTaste]: Processo de carregamento finalizado.");
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

/**
 * 4. LÓGICA DO CARRINHO DE COMPRAS
 */
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });

    // Atualização dos indicadores no Header
    cartCountElement.innerText = carrinho.length;

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    cartTotalElement.innerText = total.toFixed(2);

    console.log(`[Carrinho]: ${nome} adicionado.`);
}

// Inicialização da aplicação no evento de carregamento do DOM
window.addEventListener("DOMContentLoaded", carregarProdutosAPI);
