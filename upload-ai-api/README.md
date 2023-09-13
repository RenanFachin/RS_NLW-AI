# UploadAI - API

API para gerenciar videos e prompts da aplicação front-end.

Linguagem: `TYPESCRIPT`

Banco de dados utilizado: `POSTGRESQL`

ORM: `PRISMA`

Aplicação com docker para gerar o banco de dados

## Requisitos funcionais
O que é possível que o usuário faça na aplicação.

- [x] Deve ser possível obter todos os prompts;
- [x] Deve ser possível realizar o upload dos vídeos;

## Requisitos não funcionais
Requisitos que não partem do cliente, são requisitos mais técnicos. ex: Qual banco de dados será utilizado.

- [x] O vídeo a ser feito o upload deve ter no máximo 50mb;
- [x] Os vídeos precisam ser do formato .mp3;
- [x] Os vídeos que forem feito upload precisam ter os seus nomes alterados para evitar conflito.
- [x] Os dados da aplicação precisam estar persistido em um banco PostgreSQL;


## Rotas
- Listar todos os prompts
```bash
GET /promps
```

- Realizar o upload do vídeo
```bash
POST /videos
```


## Instalação
```sh
# Faça o clone do repotório

# Instalar as dependências do projeto
  npm install

# Rodar as migrations do projeto para criar o banco de dados
  npx prisma migrate dev

# Executando o projeto no ambiente de desenvolvimento
  npm run dev
```


## Instalação do banco de dados
```sh
# Subindo o banco de dados com docker
docker compose up -d
```