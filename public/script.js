const formulario = document.getElementById("formulario");


// BUSCAR PRODUTOS
async function carregarProdutos() {

    const resposta = await fetch("/produtos");

    const produtos = await resposta.json();

    const tabela = document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(produto) {

        const linha = tabela.insertRow();

        linha.insertCell().innerHTML = produto.id;

        linha.insertCell().innerHTML = produto.nome;

        linha.insertCell().innerHTML =
            "R$ " + produto.preco.toFixed(2).replace(".", ",");

        linha.insertCell().innerHTML = produto.quantidade;

        const celulaAcao = linha.insertCell();

        celulaAcao.innerHTML =
            '<button type="button" onclick="excluirProduto(' +
            produto.id +
            ')">Excluir</button>';

    });
}


// CADASTRAR PRODUTO
formulario.addEventListener("submit", async function(evento) {

    evento.preventDefault();

    const nome = document.getElementById("nome").value;

    const preco = document.getElementById("preco").value;

    const quantidade =
        document.getElementById("quantidade").value;

    const produto = {
        nome: nome,
        preco: Number(preco),
        quantidade: Number(quantidade)
    };

    const resposta = await fetch("/produtos", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(produto)

    });

    const resultado = await resposta.json();

    if (!resposta.ok) {

        alert(resultado.erro);

        return;
    }

    formulario.reset();

    carregarProdutos();

});


// EXCLUIR PRODUTO
async function excluirProduto(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) {
        return;
    }

    const resposta = await fetch(
        "/produtos/" + id,
        {
            method: "DELETE"
        }
    );

    const resultado = await resposta.json();

    if (!resposta.ok) {

        alert(resultado.erro);

        return;
    }

    alert(resultado.mensagem);

    carregarProdutos();
}


// CARREGAR PRODUTOS AO ABRIR
carregarProdutos();