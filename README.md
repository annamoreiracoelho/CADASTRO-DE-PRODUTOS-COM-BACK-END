# CADASTRO-DE-PRODUTOS-COM-BACK-END

Explicação do Código
O projeto é uma aplicação Web para cadastro de produtos, desenvolvida utilizando HTML, CSS, JavaScript, Node.js, Express e JSON.
Ele permite cadastrar produtos informando nome, preço e quantidade, e visualizar os produtos cadastrados em uma tabela e excluir produtos quando necessário.

Front-end

No index.html é responsável pela estrutura da página. Ele possui um formulário para cadastrar os produtos e uma tabela para mostrar os produtos cadastrados.
Já no style.css é responsável pela aparência da página. Ele define cores, tamanhos, espaçamentos, bordas e sombras.
E o arquivo script.js é responsável pela interação da página com o servidor. Ele pega os dados preenchidos no formulário, envia os produtos para o Back-End utilizando o método POST, busca os produtos, mostra e cria o botão de exclusão.

Back-End
O arquivo server.js utiliza Node.js e Express para criar o servidor.
O servidor possui três principais rotas:
POST /produtos → cadastra um novo produto;
GET /produtos → busca os produtos cadastrados;
DELETE /produtos/:id → exclui um produto pelo seu ID.
Também realiza uma validação dos dados. O nome precisa ser informado, o preço deve ser maior que zero e a quantidade não pode ser negativa.

Banco de Dados
Os produtos são armazenados no arquivo bancoDeDadosFalso.json.
Quando um produto é cadastrado, o server.js lê o arquivo JSON, adiciona o novo produto e salva o arquivo novamente.
Quando um produto é excluído, o sistema identifica o produto pelo seu ID, remove ele da lista e atualiza o arquivo JSON.

