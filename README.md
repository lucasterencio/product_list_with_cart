# 🍨 Cardápio de Sobremesas

Este projeto é um sistema de cardápio digital interativo para sobremesas, desenvolvido como parte de um desafio proposto pelo professor [Augusto Cesar](https://www.linkedin.com/in/augusto-cesar-oliveira-7ab3081ba/) da UPE e inspirado em um projeto do site [Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). O objetivo é aplicar conceitos de TypeScript e estilização com CSS na criação de uma interface interativa de pedidos.


## 🚀 Como Rodar o Projeto

1. Clone este repositório:
   
   ```bash
   git clone https://github.com/lucasterencio/product_list_with_cart.git
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Execute o projeto:

   ```bash
   npm run dev
   ```

## 🧁 Funcionalidades Principais

- **Visualização de Sobremesas**: Cada sobremesa é apresentada com imagem, nome, categoria e preço.
- **Adição ao Carrinho**: Botão de adicionar exibido diretamente no card do item.
- **Incremento e Decremento de Quantidade**: Ao adicionar um item, os botões de `+` e `-` aparecem para ajuste rápido da quantidade.
- **Carrinho de Compras Dinâmico**:
  - Visualização dos itens adicionados.
  - Detalhes como nome, quantidade e preço total por item.
  - Botão para remoção individual de itens.
  - Exibição do valor total da compra.
- **Finalização de Pedido**:
  - Botão para confirmar o pedido.
  - Exibição de modal de confirmação com resumo da compra.
  - Visual limpo e intuitivo para o usuário finalizar sua seleção.

## 🎨 Estilo e Interface

- Design responsivo com cores suaves e foco na experiência do usuário.
- Feedback visual em botões (hover e clique).
- Componentes estilizados com `CSS` modularizado:
  - `CardStyle.css` para os itens do cardápio.
  - `CartStyle.css` para o carrinho.
  - `ModalStyle.css` para o modal de confirmação.

## ⚙️ Componentes Utilizados

- `Card.ts`: Componente para exibir individualmente cada sobremesa.
- `Cart.ts`: Gerencia o estado do carrinho e exibe os itens adicionados.
- `Header.ts`: Cabeçalho do sistema.
- `Modal.ts`: Janela de confirmação do pedido com detalhamento.
- `App.ts` e `main.ts`: Estrutura principal da aplicação e renderização.


## ✅ Tecnologias Utilizadas

- **TypeScript**
- **CSS**

