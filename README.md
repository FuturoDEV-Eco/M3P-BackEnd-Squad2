<p align="center">
  <img src="https://github.com/charles-futDevFloripa/destinoCerto/blob/develop/public/destinoCerto.png" alt="Logo do Destino Certo">
</p>

# Destino Certo - API

**Destino Certo - API** foi desenvolvido como projeto final, individual, do módulo 02 da formação **FuturoDev** do **Floripa Mais Tec**, coordenado pelo **Lab365** em parceria com o **SESI** e **SENAC**.

**Destino Certo** é uma plataforma que facilita o gerenciamento de resíduos e o acesso a pontos de coleta de materiais recicláveis. Usuários podem cadastrar novos pontos de coleta, encontrar pontos próximos em um mapa interativo ou em uma listagem, visualizar informações sobre os materiais aceitos em cada ponto e registrar suas próprias contribuições para a reciclagem. Confira a versão para o frontend desenvolvida para o módulo 1 [DestinoCerto](https://github.com/charlesbiveu/destinoCerto)

**Destino Certo - API** é o projeto de backend que futuramente irá se conectar com o projeto de FrontEnd. **Destino Certo - API** adota uma arquitetura inspirada no modelo MVC, aplicando-se como REST API. O sistema é desenvolvido utilizando Node.js, PostgreSQL e diversas dependências amplamente utilizadas no mercado, proporcionando uma base sólida e escalável para o gerenciamento de dados e operações. Além disso, valoriza as boas práticas de segurança no desenvolvimento de software implementando medidas de proteção contra ameaças como injeção de SQL, cross-site scripting (XSS) e ataques de negação de serviço (DDoS).

Este projeto visa incentivar o descarte correto do lixo, auxiliando a localizar o ponto de coleta correto na sua região.

## Roteiro da Aplicação

O roteiro da aplicação pode ser conferido no Trello

- [Trello](https://trello.com/b/goHFnQ89/destino-certo-api)

## Diagrama ERD (Entity-Relationship Diagram)

![drawSql](https://github.com/user-attachments/assets/02229ca9-37bd-40aa-9c75-66d5d95987f4)

O Diagrama Entidade-Relacionamento pode ser visualizado do DrawSql.

- Um User pode ter muitos CollectionPoints.

`User (1) --- (N) CollectionPoint`

- [DrawSql](https://drawsql.app/teams/gp-13/diagrams/destino-certo)

## Instalação

- Para usar o **Destino Certo - API**, clone ou faça download do repositório:

```bash
git clone https://github.com/charlesbiveu/destinoCerto-API.git
```

- Depois execute a instalação das dependências

```bash
npm install
```

- Renomeie o arquivo `.env.example` para `.env` e cofigure conforme suas váriaves de ambiente

- Confira se você tem o Postgres instalado então crie a base de dados

```bash
npx sequelize-cli db:create
```

- Rode as migrations para criar as tabelas no banco de dados

```bash
npx sequelize-cli db:migrate
```

- Rode os seeders para popular o banco de dados com dados iniciais

```bash
npx sequelize-cli db:seed:all
```

- Após a instalação concluída rode o servidor

- para desenvolvimento

```bash
npm run start:dev
```

- para produção

```bash
npm run start:prod
```

## Regras de Negócio

### Usuários

- **Criação de Usuário:**

  - Endpoint: `POST /usuarios/criar`
  - Informações necessárias: nome, sexo, CPF, endereço, e-mail, senha, data de nascimento.
  - Validações:
    - Nome: Obrigatório.
    - Sexo: Obrigatório (M, F ou O).
    - CPF: Obrigatório, deve ser válido e único.
    - Endereço: CEP, rua, bairro, cidade, estado e número são obrigatórios.
    - E-mail: Obrigatório, deve ser válido e único.
    - Senha: Deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um caractere especial.
    - Data de Nascimento: Obrigatória.
  - Respostas:
    - Sucesso: 201 (Created) com informações do usuário.
    - CPF ou E-mail duplicado: 409 (Conflict).
    - Erro de validação: 400 (Bad Request) com mensagem detalhada.
    - Erro interno: 500 (Internal Server Error).

- **Deleção de Usuário:**
  - Endpoint: `DELETE /usuarios/:id`
  - Validações:
    - Apenas usuários autenticados podem deletar sua própria conta.
    - A exclusão só será permitida se o usuário não tiver pontos de coleta relacionados.
  - Respostas:
    - Sucesso: 200 (OK) com mensagem de sucesso.
    - Usuário não encontrado: 404 (Not Found).
    - Usuário com pontos de coleta: 400 (Bad Request) com mensagem explicativa.
    - Erro interno: 500 (Internal Server Error).

### Pontos de Coleta

- **Criação de Ponto de Coleta:**

  - Endpoint: `POST /local`
  - Informações necessárias: nome, descrição, tipos de reciclagem, CEP, rua, bairro, cidade, estado, número.
  - Validações:
    - Nome: Obrigatório.
    - Endereço: CEP, rua, bairro, cidade, estado e número são obrigatórios.
    - Tipos de Reciclagem: Obrigatórios.
  - Geolocalização:
    - Se o CEP não for encontrado na API do Nominatim, as colunas latitude, longitude e map_link serão preenchidas com null.
  - Respostas:
    - Sucesso: 201 (Created) com informações do ponto de coleta.
    - Erro de validação: 400 (Bad Request) com mensagem detalhada.
    - Erro interno: 500 (Internal Server Error).

- **Listagem de Pontos de Coleta do Usuário:**

  - Endpoint: `GET /local`
  - Validações:
    - Apenas usuários autenticados e quem que criou o ponto de coleta podem acessar essa rota.
  - Respostas:
    - Sucesso: 200 (OK) com lista de pontos de coleta do usuário.
    - Erro interno: 500 (Internal Server Error).

- **Obtenção de Detalhes de um Ponto de Coleta Específico:**

  - Endpoint: `GET /local/:local_id`
  - Validações:
    - Apenas o usuário que criou o ponto de coleta pode acessar suas informações.
  - Respostas:
    - Sucesso: 200 (OK) com detalhes do ponto de coleta.
    - Ponto de coleta não encontrado: 404 (Not Found).
    - Erro interno: 500 (Internal Server Error).

- **Atualização de Ponto de Coleta:**

  - Endpoint: `PUT /local/:local_id`
  - Informações necessárias: nome, descrição, tipos de reciclagem, CEP, rua, bairro, cidade, estado, número.
  - Validações:
    - Apenas o usuário que criou o ponto de coleta pode atualizá-lo.
    - Nome: Obrigatório.
    - Endereço: CEP, rua, bairro, cidade, estado e número são obrigatórios.
    - Tipos de Reciclagem: Obrigatórios.
  - Geolocalização:
    - Se o CEP for alterado e não for encontrado na API do Nominatim, as colunas latitude, longitude e map_link serão preenchidas com null.
  - Respostas:
    - Sucesso: 200 (OK) com informações atualizadas do ponto de coleta.
    - Ponto de coleta não encontrado: 404 (Not Found).
    - Erro de validação: 400 (Bad Request) com mensagem detalhada.
    - Erro interno: 500 (Internal Server Error).

- **Deleção de Ponto de Coleta:**

  - Endpoint: `DELETE /local/:local_id`
  - Validações:
    - Apenas o usuário que criou o ponto de coleta pode deletá-lo.
  - Respostas:
    - Sucesso: 200 (OK) com mensagem de sucesso.
    - Ponto de coleta não encontrado: 404 (Not Found).
    - Erro interno: 500 (Internal Server Error).

- **Obtenção de Link do Google Maps:**
  - Endpoint: `GET /local/:local_id/maps`
  - Validações:
    - Apenas o usuário que criou o ponto de coleta pode acessar essa rota.
  - Respostas:
    - Sucesso: 200 (OK) com link do Google Maps.
    - Ponto de coleta ou CEP não encontrado: 404 (Not Found) com mensagem explicativa.
    - Erro interno: 500 (Internal Server Error).

### Autenticação e Segurança

- **Login:**
  - Endpoint: `POST /login`
  - Informações necessárias: e-mail, senha.
  - Validações:
    - E-mail e senha são obrigatórios.
    - Geração de token JWT após autenticação bem-sucedida.
  - Respostas:
    - Sucesso: 200 (OK) com token JWT.
    - Usuário ou senha inválidos: 401 (Unauthorized).
    - Erro de validação: 400 (Bad Request) com mensagem detalhada.
    - Erro interno: 500 (Internal Server Error).

### Variáveis de Ambiente

- Armazenar informações críticas em variáveis de ambiente.
- Incluir um arquivo de exemplo listando as variáveis utilizadas no sistema ou na documentação.

## Tecnologias e Dependências Utilizadas

[![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![postgresSql](https://img.shields.io/badge/pg-336760?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![nodemon](https://img.shields.io/badge/nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)](https://nodemon.io/)
[![axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![bcryptjs](https://img.shields.io/badge/bcryptjs-4B4B4B?style=for-the-badge&logo=javascript&logoColor=white)](https://github.com/dcodeIO/bcrypt.js)
[![cors](https://img.shields.io/badge/cors-00AFFF?style=for-the-badge&logo=javascript&logoColor=white)](https://github.com/expressjs/cors)
[![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)](https://github.com/motdotla/dotenv)
[![express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![pg](https://img.shields.io/badge/pg-336791?style=for-the-badge&logo=nodepgsql&logoColor=white)](https://node-postgres.com/)
[![sequelize](https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![Trello](https://img.shields.io/badge/Trello-5E4955?style=for-the-badge&logo=Trello&logoColor=white)](https://trello.com/b/goHFnQ89/destino-certo-api)

O projeto **Destino Certo - API** adota uma arquitetura inspirada no modelo MVC, aplicando-se como REST API. O sistema é desenvolvido utilizando Node.js, PostgreSQL e Sequelize, proporcionando uma base sólida e escalável para o gerenciamento de dados e operações.

### Componentes e Bibliotecas

- **Node.js**: Plataforma de desenvolvimento utilizada para construir a API.
- **nodemon**: Ferramenta que reinicia automaticamente o servidor Node.js sempre que detecta alterações nos arquivos, facilitando o desenvolvimento.
- **axios**: Biblioteca para realizar requisições HTTP, permitindo comunicação entre a API e outros serviços.
- **bcryptjs**: Biblioteca para hashing de senhas, garantindo a segurança dos dados de autenticação dos usuários.
- **cors**: Middleware para habilitar o CORS (Cross-Origin Resource Sharing) nas requisições HTTP.
- **dotenv**: Carrega variáveis de ambiente de um arquivo .env para a aplicação, permitindo a configuração de ambientes de forma segura.
- **express**: Framework web para Node.js, utilizado para gerenciamento de rotas, middlewares, requests e responses para API.
- **jsonwebtoken**: Biblioteca para gerar e verificar tokens JWT (JSON Web Tokens), implementando autenticação segura.
- **pg**: Cliente PostgreSQL para Node.js, utilizado para conectar e interagir com o banco de dados.
- **sequelize**: ORM (Object-Relational Mapping) para Node.js, facilitando a interação com o banco de dados PostgreSQL através de modelos JavaScript.
- **Swagger**: Ferramenta para documentar a API, fornecendo uma interface interativa para explorar os endpoints disponíveis.

### Estrutura do projeto

![estruturaDoProjeto](https://github.com/user-attachments/assets/18577b35-d609-4489-ab2f-ff8672a1546f)

## Documentação com Swagger

https://github.com/user-attachments/assets/e22eb0db-b928-45c5-8bc2-5986c89d016f

### Visão Geral

A documentação da **Destino Certo - API** é feita utilizando o Swagger, que fornece uma interface interativa para explorar os endpoints disponíveis na API. O Swagger permite visualizar e testar os endpoints diretamente do navegador, facilitando o desenvolvimento e a integração com outras aplicações.

### Acessando a Documentação

Após iniciar o servidor, a documentação do Swagger pode ser acessada pelo seguinte endereço:

http://seuservidorlocal:porta/docs exemplo: **http://localhost:3000/docs**

### Utilizando o Swagger

1. **Navegando pelos Endpoints:**

   - A documentação apresenta todos os endpoints disponíveis, organizados por tags. As tags agrupam endpoints relacionados, como os de "Usuários" e "Pontos de Coleta".
   - Clique em uma tag para expandir e visualizar os endpoints associados.

2. **Visualizando Detalhes do Endpoint:**

   - Clique em um endpoint para expandir e ver os detalhes.
   - Para cada endpoint, você verá informações como o método HTTP (GET, POST, PUT, DELETE), a URL, os parâmetros necessários, e as possíveis respostas.

3. **Testando Endpoints:**

   - Você pode testar os endpoints diretamente da interface do Swagger.
   - Para endpoints que requerem parâmetros, você pode preencher os campos diretamente na interface.
   - Clique no botão "Try it out" para habilitar a edição dos parâmetros e enviar a requisição.
   - Após preencher os parâmetros, clique em "Execute" para enviar a requisição e ver a resposta da API.

4. **Autenticação com Bearer Token:**
   - Endpoints protegidos requerem um token de autenticação JWT.
   - Para fornecer o token, clique no botão "Authorize" no topo da página.
   - Na janela que se abre, insira o token precedido de "Bearer ", por exemplo: `Bearer seu_token_aqui`.
   - Clique em "Authorize" para aplicar o token a todas as requisições subsequentes.

### Exemplo de Requisição

#### Endpoint de Criação de Ponto de Coleta

- **Método:** POST
- **URL:** `/local`
- **Descrição:** Cria um novo ponto de coleta.
- **Parâmetros:**
  - `name` (string): Nome do ponto de coleta.
  - `description` (string): Descrição do ponto de coleta.
  - `recycle_types` (string): Tipos de reciclagem aceitos (ex: "Vidro, Papel, Plástico").
  - `postalcode` (string): CEP do ponto de coleta.
  - `street` (string): Rua do ponto de coleta.
  - `neighborhood` (string): Bairro do ponto de coleta.
  - `city` (string): Cidade do ponto de coleta.
  - `state` (string): Estado do ponto de coleta.
  - `number` (string): Número do ponto de coleta.
- **Resposta de Sucesso:**
  - **Status:** 201 Created
  - **Corpo:**
    ```json
    {
      "id": 1,
      "name": "Ponto Dakir Polidoro",
      "description": "Este é um ponto de coleta da comcap para recolhimento de vidros",
      "recycle_types": "Vidro, Papel, Plástico",
      "postalcode": "88063-565",
      "street": "Rua Radialista Dakir Polidoro",
      "neighborhood": "Campeche",
      "city": "Florianópolis",
      "state": "SC",
      "number": "123",
      "latitude": -27.5969,
      "longitude": -48.5495,
      "map_link": "https://www.google.com/maps?q=-27.5969,-48.5495",
      "user_id": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
    ```
- **Respostas de Erro:**
  - **Status:** 400 Bad Request
    - **Descrição:** Erro de validação, campo obrigatório não preenchido.
  - **Status:** 500 Internal Server Error
    - **Descrição:** Erro interno do servidor.

### Atualizando a Documentação

A documentação do Swagger é gerada automaticamente com base nos comentários presentes nas rotas da aplicação. Para atualizar a documentação:

1. **Adicionar Comentários nas Rotas:**

   - Utilize a notação `#swagger` nos comentários das rotas para descrever os endpoints.
   - Exemplo de comentário em uma rota:
     ```javascript
     collectionPointsRoutes.post(
       '/',
       validateToken,
       CollectionPointController.createCollectionPoint /*
          #swagger.tags = ['Pontos de Coleta'],
          #swagger.description = 'Cria um novo ponto de coleta.',
          #swagger.parameters['criarPontoDeColeta'] = {
              in: 'body',
              description: 'Dados do ponto de coleta',
              required: true,
              schema: {
                  $name: "Ponto Dakir Polidoro",
                  $description: "Este é um ponto de coleta da comcap para recolhimento de vidros",
                  $recycle_types: "Vidro, Papel, Plástico",
                  $postalcode: "88063-565",
                  $street: "Rua Radialista Dakir Polidoro",
                  $neighborhood: "Campeche",
                  $city: "Florianópolis",
                  $state: "SC",
                  $number: "123"
              }
          }
      */
     );
     ```

2. **Gerar a Documentação:**
   - Execute o comando para gerar a documentação do Swagger:
     ```bash
     npm run swagger
     ```
   - Esse comando irá atualizar o arquivo `doc.swagger.json` com base nos comentários presentes nas rotas.

### Conclusão

A documentação do Swagger é uma ferramenta poderosa para desenvolver e integrar a **Destino Certo - API**. Utilize-a para explorar os endpoints, testar requisições e garantir que a API esteja funcionando conforme o esperado.

## Melhorias Futuras

### Geolocalização Aprimorada:

- Usar uma API que encontre mais CEPs e seja mais precisa no local do ponto de coleta.
- Registrar o Local do usuário, para poder traçar rotas entre o usuário e o ponto de coleta.
- Permitir ao usuário buscar o local mais próximo dele para um determinado ponto de coleta.

### Sistema de validação dos pontos de coleta através do uso por outros usuários:

- Outros usuários poderem confirmar a existência daquele ponto de coleta.
- Colocarem observações (Ex. este local agora coleta lâmpadas, etc)
- Contabilizar quantos usuários usaram um ponto de coleta

### Regionalização da Interface:

Criar na API uma tabela para armazenar as para expressões regionais, permitindo que a aplicação se adapte ao linguajar local de diferentes regiões. Por exemplo a versão do
frontend utiliza expressões típicas de Florianópolis (o "dialeto manezês"). A ideia é expandir essa funcionalidade para incluir outras variantes regionais, permitindo aos usuários escolher o "sotaque" da interface de acordo com suas preferências ou localidade.

### Enriquecimento de Conteúdo:

Ampliar o conteúdo informativo disponível na aplicação incluindo textos e vídeos educativos sobre a importância do descarte correto de resíduos. Isso reforçaria o caráter educativo do **Destino Certo** e aumentaria a conscientização sobre reciclagem e gestão de resíduos.

Essas melhorias não só aumentariam a utilidade e a relevância da aplicação , mas também ajudariam a engajar ainda mais os usuários na causa ambiental.

Sites

- Gerar pessoas: [4Devs](https://www.4devs.com.br/gerador_de_pessoas)
- Roteiro da aplicação: [ Trello ](https://trello.com/)
- Gerar Diagramas ER: [DrawSql](https://drawsql.io)
- Destino Certo FrontEnd: [DestinoCerto](https://github.com/charlesbiveu/destinoCerto)
