# Desafio lista de tarefas

O projeto lista de tarefas foi desenvolvido como solução para um desafio técnico de uma vaga de estágio full stack.

## Índice

- [Sobre](#sobre)
- [Instalação](#instalação)
- [Uso](#uso)
- [Testes](#testes)
- [Desenvolvimento](#desenvolvimento)
- [Deploy](#deploy)

## Sobre

O objetivo do projeto era criar uma lista de tarefas com funcionalidades completas de CRUD, além de implementar autenticação de usuários. Foram utilizadas diversas referências, como a estrutura de quadros do Trello, que inspirou a divisão de tarefas no sistema, proporcionando uma organização eficiente e intuitiva.

## Tecnologias utilizadas

- **React.js:** Framework React para desenvolvimento de aplicações web ([link para o repositório](https://github.com/EversonDoNascimento/Desafio_Jack_Experts_FRONT)).
- **Outras tecnologias:** Back-end desenvolvido em Nodejs, utilizando a biblioteca express.

## Instalação

Siga as instruções abaixo para configurar e executar o projeto localmente.

- Requisitos:

  - Node instalado
  - Npm instalado
  - Mysql instalado e configurado

```bash

  # Comando para verificar se o node está instalado
  node --version

```

```bash

  # Comando para verificar se o npm está instalado
  npm --version

```

```bash

  # Comando para verificar se o SGBD mysql está instalado
  mysql --version

```

- Clone o projeto

```bash

# Clone o repositório via SSH
git clone git@github.com:EversonDoNascimento/Desafio_Jack_Experts.git

# Clone o repositório via HTTPS
git https://github.com/EversonDoNascimento/Desafio_Jack_Experts.git

```

- Entre no diretório do projeto

```bash

  cd Desafio_Jack_Experts/Back-end

```

- Crie o arquivo .env que irá conter a url de conexão do banco de dados que o prisma irá utilizar, e a chave do JWT

```bash
# No linux você pode utilizar o comando nano

  nano .env

```

- Crie as variáveis JWT_KEY e DATABASE_URL

```bash
# Conteúdo do .env

  JWT_KEY=""
  DATABASE_URL="mysql://user_name:password@localhost:3306/db_name"


```

Observação: A variável JWT_KEY pode ser configurada com qualquer valor numérico à sua escolha ou com um código hash gerado aleatoriamente.

Modifique as informações da variável DATABASE_URL conforme as configurações do mysql instalado na sua máquina.

- Em seguida, execute o seguinte comando para instalar as depêndencias do projeto:

```bash
  npm i
```

- Em seguida, executaremos as migrations do Prisma para criar o banco de dados, incluindo todas as tabelas e colunas necessárias.

```bash

  npx prisma migrate dev

```

- Gerando cliente Prisma para que a aplicação possa interagir com o banco de dados:

```bash

  npx prisma generate

```

## Uso

- Para iniciar a API rode o seguinte comando:

```bash

  npm start

```

- Pronto! a API deve estar disponível na url: http://localhost:3333/api

## Testes

Os testes realizados no back-end do projeto foram testes de integração, onde cada um verifica a comunicação entre a API e o banco de dados.

- Para a realização dos testes, achei melhor criar um banco de dados só para testes. Sendo assim, no diretório raiz do projeto crie o .env.test

```bash
# No linux você pode utilizar o comando nano

  nano .env.test

```

```bash
# Conteúdo do .env

  DATABASE_URL="mysql://user_name:password@localhost:3306/db_test_name"

```

Modifique apenas o nome do banco de dados, as outras informações podem ser reaproveitadas.

- Para executar os testes execute o seguinte comando:

```bash

    npm run test

```

# Desenvolvimento

A API foi desenvolvida utilizando várias boas práticas de programação, como a Programação Orientada a Objetos (POO) e o uso de DAOs (Data Access Objects) para facilitar a implementação dos métodos.

Para a validação de dados, utilizei a biblioteca Zod, que é uma ferramenta poderosa para criar e validar esquemas de dados.

A escolha do Prisma como ORM foi baseada na facilidade de uso da ferramenta e nos benefícios que um ORM traz para o projeto, como a criação de migrations, que permitem gerenciar diferentes versões do esquema do banco de dados, e a facilidade em realizar uma eventual migração para outro SGBD no futuro.

Por fim, os testes foram realizados com a biblioteca Jest, desenvolvida pelo Facebook, que oferece uma excelente integração com JavaScript. A decisão de focar em testes de integração se deve à simplicidade do sistema, que é basicamente um CRUD de um gerenciador de tarefas. Nesse contexto, a parte mais significativa a ser testada era a comunicação entre a lógica de negócio e o banco de dados.

## Deploy

A API do projeto foi hospedada no Google Cloud. No entanto, como o certificado SSL é autoassinado, é necessário conceder as permissões apropriadas nos navegadores para acessá-la. Caso contrário, qualquer requisição feita pelo front-end à API poderá falhar, impedindo o funcionamento correto da aplicação.
Sendo assim, antes de acessar o site entre no seguinte link e conceda permissão no navegador:

[Link API](https://35.192.146.233/)

Logo após conceder a permissão para acessar o site, pode fechar a página padrão do nginx.

O Front-end do projeto foi hospedado na plataforma da Vercel.

[Link do site](https://desafio-jack-experts-fr-git-1d6f72-everson-nascimentos-projects.vercel.app)
