# 🚧 Projeto Blogs API - Trybe 💚✅️🚧

# Sobre

Neste projeto foi desenvolvido uma API e um banco de dados utilizando MySQL para a produção de conteúdo para um blog.

A aplicação foi desenvolvida em Node.js usando o pacote Sequelize para realizar o CRUD dos posts.
Foi utilizado JWT (JSON Web Token) para realizar as autenticações.
Projeto desenvolvido utilizando arquitetura MSC (Model, Service, Controller).

# - Clone o repositório:
git clone git@github.com:otavioadias/blogs-api.git

Entre na pasta: cd sd-021-b-project-blogs-api
Verifique em qual branch está, caso esteja na master utilize: git checkout otavio-azevedo-sd-021-b-project-blogs-api

# - Rodando projeto com Docker:
Seu docker-compose precisa estar na versão 1.29 
Rode o serviço node com o comando: docker-compose up -d -build

Esses serviços irão inicializar um container chamado blogs_api e outro chamado blogs_api_db;
A partir daqui você pode rodar o container via CLI ou abri-lo no VSCode.
Use o comando: docker exec -it docker exec -it blogs_api bash

Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
Instale as dependências [Caso existam] com: npm install

Execute a aplicação com: npm start ou npm run debug

# - Endpoints:
Para testar as requisições HTTP pode ser usado qualquer cliente, no projeto foi utilizado o Thunder Client direto do VSCode.
Observação: Existe uma coleção de enpoits no Thunder Client que pode ser usada, caso o token esteja expirado gere um novo token com a requisição POST LOGIN AUTH.

<!-- Olá, Tryber!

Esse é apenas um arquivo inicial para o README do seu projeto.

É essencial que você preencha esse documento por conta própria, ok?

Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!

⚠️ IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.

-->
