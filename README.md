# upload-AI

Aplicação desenvolvida durante a NLW AI. A aplicação em questão é para o aprofundamento das habilidades no desenvolvimento de aplicações web, este sistema utiliza a IA para centralizar o upload de vídeos e cria títulos e descrições com boa indexação.

<p align="center">
  <img src="https://i.imgur.com/v81Aqxz.png" alt="Exemplo da Aplicação desktop">
</p>

<p align="center">
  <img src="https://i.imgur.com/g23GaNm.png" alt="Exemplo da Aplicação mobile">
</p>



## Tabela de Conteúdos
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos não funcionais](#requisitos-nao-funcionais)
- [Como Usar WEB](#como-usar-web)
- [Como Usar API](#como-usar-api)
- [Banco de Dados](#banco-de-dados)


## Tecnologias Utilizadas

- **Typescript**
- **NodeJS**
- **ReactJS**
- **Tailwind CSS**
- **Shadcn-Ui**
- **lucide-react**
- **OpenAI**
- **VercelAI**
- **Fastify**
- **Prisma**

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


## Como Usar WEB

1. Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/RenanFachin/RS_NLW-AI.git
```

2. Instale as dependências do projeto:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse a aplicação em seu navegador:


## Como Usar API
```sh
# Faça o clone do repotório

# Instalar as dependências do projeto
  npm install

# Rodar as migrations do projeto para criar o banco de dados
  npx prisma migrate dev

# Executando o projeto no ambiente de desenvolvimento
  npm run dev
```


## Banco de Dados
```sh
# Subindo o banco de dados com docker
docker compose up -d
```