# Gerenciador de Senhas com TypeScript

Um gerenciador simples para armazenar e gerenciar senhas em um arquivo JSON, utilizando TypeScript e Node.js.

## 🔍 Descrição

Este projeto é um gerenciador de senhas que permite salvar, consultar, editar e deletar senhas armazenadas localmente em um arquivo JSON. A aplicação é executada no terminal e utiliza TypeScript para garantir tipagem estática e maior robustez no código.

## 📦 Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [readline](https://nodejs.org/api/readline.html)
- [ts-node](https://typestrong.org/ts-node/)
- [crypto](https://nodejs.org/api/crypto.html) (para criptografia simples das senhas)

## 🚀 Instalação

```git clone https://github.com/CodeDias/PasswordManagerTypescript.git```\
```cd PasswordManagerTypescript```\
```npm install```

##  ▶️ Executando o Gerenciador

```npm start```

## 🔐 Como Usar

- Ao iniciar o programa, será solicitada a senha mestre para acessar o gerenciador (senha padrão: 123).

- Depois de autenticado, você poderá:

- Adicionar novas senhas para diferentes serviços.

- Listar todas as senhas salvas.

- Editar senhas existentes.

- Remover senhas que não deseja mais guardar.

- As senhas são armazenadas localmente em um arquivo JSON (criptografadas para maior segurança).

## 📁 Estrutura do Projeto

PasswordManagerTypescript/    \
├── node_modules/       \
├── src/                \
│   ├── models/         \
│   │   └── credential.ts \
│   ├── services/       \
│   │   ├── passwordService.ts \
│   │   └── senhamestre.ts \
│   │   └── uiService.ts    \
│   └── index.ts        \
├── passwords.json      \
├── package.json        \
├── tsconfig.json
└── README.md           

## ✨ Melhorias Futuras

- Interface gráfica para facilitar o uso.

- Integração com armazenamento seguro (ex: Keychain, cofre do sistema).

- Criptografia avançada das senhas.

- Suporte a múltiplos usuários.

- Exportação e importação de senhas.

## 👤 Autor

Feito com ❤️ por [CodeDias](https://github.com/CodeDias)
