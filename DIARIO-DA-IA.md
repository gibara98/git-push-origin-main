# 📓 DIARIO-DA-IA.md — Diário de Erros e Correções da IA

Registro obrigatório de cinco falhas técnicas cometidas pela IA durante o desenvolvimento do projeto, detalhando o diagnóstico e a correção aplicada pelo desenvolvedor.

---

### Erro 1: Perda de sincronia dos parâmetros na URL ao mudar de página
* **Contexto:** Ao alterar a página da paginação ou mudar de categoria, os parâmetros anteriores na URL eram sobrescritos incorretamente em vez de acumulados.
* **Diagnóstico da IA:** A IA utilizou o hook `useNavigate` passando objetos estáticos sem mesclar com os parâmetros atuais já existentes no `useSearchParams`.
* **Correção:** Substituímos a lógica de navegação para manipular diretamente o objeto `URLSearchParams` atual, garantindo que busca, categoria e página coexistam de forma harmoniosa na URL.

---

### Erro 2: Erro 404 nas rotas ao dar F5 no site publicado na Vercel
* **Contexto:** Ao atualizar a página de detalhes (`/produtos/5`) na versão de produção, a Vercel retornava um erro `404 NOT_FOUND`.
* **Diagnóstico da IA:** A IA gerou o código da SPA corretamente, mas omitiu o arquivo de configuração de redirecionamento de rotas específico para ambientes de hospedagem estática.
* **Correção:** Criamos manualmente o arquivo `vercel.json` na raiz do projeto configurando a reescrita de todas as rotas para o `index.html`:
  
```json
  {
    "rewrites": { "source": "/(.*)", "destination": "/index.html" }
  }

  Erro 3: Loop infinito (Maximum update depth exceeded) no useEffect de busca
Contexto: A aplicação travava ao digitar no campo de busca devido a re-renderizações infinitas disparadas pelo useEffect.

Diagnóstico da IA: A IA incluiu a própria função de atualização de estado ou o objeto de parâmetros diretamente como dependência do useEffect sem aplicar um mecanismo de debounce.

Correção: Implementamos um setTimeout de 400ms (debounce) para atrasar a execução da busca e refatoramos a lista de dependências do useEffect para escutar apenas o termo digitado.

Erro 4: Mutação direta do estado do carrinho
Contexto: Ao tentar alterar a quantidade de um item no carrinho, a interface não atualizava os totais derivados instantaneamente.

Diagnóstico da IA: A IA modificou diretamente a propriedade quantity de um objeto dentro do array do estado (cart[index].quantity += 1), quebrando a imutabilidade do React.

Correção: Reescrevemos a função utilizando o método .map() para retornar um novo array com um novo objeto modificado, garantindo que o React detectasse a mudança e recalculasse os totais derivados.

Erro 5: Vazamento de memória e requisição fantasma ao desmontar componentes
Contexto: Avisos no console do navegador indicando atualizações de estado em componentes já desmontados (Can't perform a React state update on an unmounted component).

Diagnóstico da IA: A requisição fetch na camada de serviços não cancelava a promessa caso o usuário mudasse de página rapidamente antes da resposta da API DummyJSON chegar.

Correção: Adicionamos o uso de AbortController para abortar requisições pendentes caso o componente seja desmontado durante o carregamento