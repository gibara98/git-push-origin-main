# 🤖 PROMPTS.md — Registro de Interações com IA

Este arquivo documenta os prompts estruturais utilizados no desenvolvimento do front-end da **Vitrine Alegre**.

---

### Prompt 1: Configuração das Rotas e Estrutura Inicial
* **Prompt:** 
  > "Crie a estrutura de rotas usando React Router para um e-commerce contendo três rotas principais: `/` (listagem de produtos com busca e categorias), `/produtos/:id` (detalhes do produto) e `/carrinho` (cenário do carrinho). Garanta que os parâmetros de busca, categoria e paginação sejam refletidos e lidos diretamente da URL."
* **Uso gerado:** Definição inicial do `App.jsx` com o roteamento e integração com os parâmetros de consulta (`SearchParams`).

---

### Prompt 2: Contexto do Carrinho e Persistência
* **Prompt:**
  > "Crie um CartContext em React que gerencie adicionar, remover, incrementar e decrementar itens no carrinho, calculando de forma derivada o valor total da compra e a quantidade de itens. Adicione persistência automática utilizando o `localStorage`."
* **Uso gerado:** Lógica central de gerenciamento de estado global do carrinho de compras.

---

### Prompt 3: Implementação dos 4 Estados de Interface
* **Prompt:**
  > "Escreva um componente em React para a listagem de produtos que trate explicitamente os 4 estados de interface exigidos: Carregando (com skeleton/spinner), Erro (com botão de tentar novamente), Vazio (quando nenhum produto é encontrado) e Sucesso/Inicial (exibindo os cards dos produtos)."
* **Uso gerado:** Estruturação robusta da página principal tratando falhas de rede e listas vazias de forma acionável.

---

### Prompt 4: Estilização Pura (CSS Hand-crafted)
* **Prompt:**
  > "Escreva arquivos CSS puros para estilizar os cards de produtos e a página de detalhes seguindo rigorosamente os princípios de layout dos mockups, sem utilizar nenhum framework de CSS como Tailwind ou Bootstrap, garantindo responsividade em 3 larguras de tela."
* **Uso gerado:** Folhas de estilo modulares aplicadas em cada componente.