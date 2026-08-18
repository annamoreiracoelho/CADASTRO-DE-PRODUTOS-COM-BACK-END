const express = require("express");
const fs = require("fs");

const app = express();
const PORTA = 3000;
app.use(express.json());
app.use(express.static("public"));

app.post("/produtos", (req, res) => {
    const { nome, preco, quantidade } = req.body;
    if (!nome || preco <= 0 || quantidade < 0) {
        return res.status(400).json({
            erro: "Dados inválidos. Verifique nome, preço e quantidade."
        });
    }
    const dados = fs.readFileSync(
        "bancoDeDadosFalso.json",
        "utf8"
    );

    const produtos = JSON.parse(dados);
    const novoProduto = {
        id: produtos.length > 0
            ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
        nome: nome,
        preco: preco,
        quantidade: quantidade
    };

    produtos.push(novoProduto);
    fs.writeFileSync(
        "bancoDeDadosFalso.json",
        JSON.stringify(produtos, null, 4)
    );
    res.json(novoProduto);
});

app.get("/produtos", (req, res) => {
    const dados = fs.readFileSync(
        "bancoDeDadosFalso.json",
        "utf8"
    );
    const produtos = JSON.parse(dados);
    res.json(produtos);
});

app.delete("/produtos/:id", (req, res) => {

    const id = Number(req.params.id);

    console.log("Tentando excluir o produto ID:", id);

    const dados = fs.readFileSync(
        "bancoDeDadosFalso.json",
        "utf8"
    );

    const produtos = JSON.parse(dados);

    const novosProdutos = produtos.filter(function(produto) {
        return produto.id !== id;
    });

    fs.writeFileSync(
        "bancoDeDadosFalso.json",
        JSON.stringify(novosProdutos, null, 4)
    );

    console.log("Produto excluído:", id);

    res.json({
        mensagem: "Produto excluído com sucesso."
    });
});

app.listen(PORTA, () => {
    console.log(
        `Servidor funcionando em http://localhost:${PORTA}`
    );

});