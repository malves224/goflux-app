# Goflux app
Em goflux app é possível criar embarcadores, transportadores, ofertas e lances, facilitando contratação de freetes.
No frotend cada um tem sua interface (embarcador e transportador).

## Stacks utilizadas 

 ### Backend
 Utilizei um servidor node.js com express e como banco de dados postgres, para fazer o relacionamento com banco utilizei o sequelize com migrations e seeders para facilitar a manipulação do banco.
Arquitetura de camadas MSC (Model Service), ESlint para analise estática do código, Utilizei typescript seguindo conceitos POO.

### Frontend

Utilizei todo o eco sistema do React.js para criar a aplicação, Context API, React hooks e React router dom.
Como biblioteca CSS, Material UI.

## Rodando a aplicação

Clonando a aplicação: 

`git clone git@github.com:malves224/goflux-app.gitt && cd goflux-app/app`

### Com docker:

Após clonar o projeto basta montar a aplicação pelo docker utilizando o comando 
`npm run compose:up`, caso precise encerrar os container rode `npm run compose:down`.

Após terminar de montar os containers das imagens o frontend estará acessível na porta 3000 e o backend na porta 3001.

:warning: As portas 3000 e 3001 devem estar livres :warning:

## Login

É preciso fazer login utilizando apenas o CNPJ segue alguns CNPJ para acessar caso não queira efetuar o cadastro para acessar: 

transportador: 99974145000150
embarcador: 60429484000110

## Documentação API.
Utilizei o Postaman para gerar documentação da API segue o link:
https://documenter.getpostman.com/view/17745625/UyrGCZqG
