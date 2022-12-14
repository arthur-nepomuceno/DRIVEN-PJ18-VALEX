<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg" alt="ValeX" style="width: 89px; height: 89px"/>
</p>

# <p align = "center">  - Valex - </p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Arthur Nepomuceno-093D04?style=flat-square" />
</p>


##  :clipboard: Apresentação
   Este projeto se trata de uma API de cartões. O Valex torna possível que colaboradores de uma empresa tenham cartões de benefícios, físicos e virtuais, para utilizar nos estabelecimentos cadastrados na rede de opções e para compras online.

***

##  :clipboard: Introdução
   Este é um projeto desenvolvido em TypeScript e com um banco de dados previamente construído. Seus elementos são:
   - _companies_: tabela com as empresas as quais pertecem os colaboradores. Cada empresa deve possuir uma chave de registro que a possibilita realizar as demais operações necessárias.
   - _employees_: tabela de colaboradores associados à empresa. Um colaborador pode ter mais de um cartão.
   - _cards_: tabela de cartões, que podem ser físicos e virtuais, variando em tipo de estabelecimento onde podem ser utilizados.
   - _payments_: tabela de registros de pagamentos.
   - _recharges_: tabela de registros de recargas.
   - _businesses_: tabela para cadastro dos establecimentos que aceitam os cartões da empresa.
   
***

## :computer:	Conceitos & Tecnologias 
   :construction: ... em construção ... :construction:
***

## 🏁 Rodando a aplicação
Este projeto foi inicializado com o Node Package Manager, então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/arthur-nepomuceno/pj18-valex.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor
```
npm run dev
```

***

## :rocket: Rotas

```yml
POST /cards
    - Rota para inserir um novo cartão.
    - headers: {apikey: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0}
    - params: {}
    - query: {}
    - body: 
        {
            "employeeId": 1,
            "isVirtual": true || false,
            "isBlocked": true,
            "type": 'groceries' || 'restaurants' || 'transport' || 'education' || 'health'
        }
    - response: 
        {
            "number": 5595 4412 9823 1109,
            "cardholderName": "FULANO N SILVA",
            "expirationDate": "04/30",
            "securityCode": "397"
        }
```

```yml
POST /cards/:id/activate
    - Rota para ativar um cartão
    - headers: {}
    - params: { id }
    - query: {}
    - body: 
       {
           "securityCode": 397,
           "password": 1234
       }
    - response: {}
```

```yml
GET /cards
    - Rota para visualizar os cartões de um empregado
    - headers: {}
    - params: {}
    - body: 
        {
            "employeeId": 1,
        }
    - response: 
        {
            "cards": 
               [{
                   "number": 5595 5595 5595 5595,
                   "cardholderName": "FULANO N SILVA",
                   "expirationDate": "04/30",
                   "securityCode": "397",
                   "isBlocked": boolean,
                   "isVirtual": boolean
               }]
        }
```

```yml
GET /cards/balance
    - Rota para visualizar as transações de um cartão (pagamentos e recargas)
    - headers: {}
    - params: {}
    - query: {}
    - body: 
        {
            "cardId": 1
        }
    - response: 
        {
            "balance": 35000,
            "transactions": 
               [
                   { 
                     "id": 1, 
                     "cardId": 1, 
                     "businessId": 1, 
                     "businessName": "DrivenEats", 
                     "timestamp": "22/01/2022", 
                     "amount": 5000 
                   }
               ],
            "recharges": 
               [
                   { 
                     "id": 1, 
                     "cardId": 1, 
                     "timestamp": "21/01/2022", 
                     "amount": 40000 
                   }
               ]
        }
```

```yml
PUT /block
    - Rota para bloquear um cartão
    - headers: {}
    - params: {}
    - query: {}
    - body: 
        {
            "cardId": 2,
            "password": 1234
        }
    - response: `Card with id '2' blocked successfully.`
```

```yml
PUT /unblock
    - Rota para desbloquear um cartão
    - headers: {}
    - params: {}
    - query: {}
    - body: 
        {
            "cardId": 2,
            "password": 1234
        }
    - response: `Card with id '2' unblocked successfully.`
```

```yml
POST /recharge
    - Rota para desbloquear um cartão
    - headers: {apikey: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0}
    - params: {}
    - query: {}
    - body: 
        {
            "cardId": 2,
            "rechargeValue": 3000
        }
    - response: `Recharge of $3000 done successfully.`
```

```yml
POST /payment
    - Rota para realizar compras no cartão.
    - headers: {}
    - params: {}
    - query: {}
    - body: 
        {
            "cardId": 2,
            "password": 1234,
            "businessId": 1,
            "paymentValue": 30
        }
    - response: `Payment of $30 done successfully.`
```

```yml
POST /virtual-card
    - Rota para criar um cartão virtual associado à um cartão físico.
    - headers: {}
    - params: {}
    - query: {}
    - body: 
        {
            "cardId": 9,
            "password": 1234
        }
    - response: 
        {
            "number": 6686 7523 4008 3940,
            "cardholderName": "FULANO N SILVA",
            "expirationDate": "04/30",
            "securityCode": "130"
        }
```

```yml
DELETE /virtual-card
    - Rota para deletar um cartão virtual.
    - headers: {}
    - params: {}
    - query: {}
    - body: 
        {
            "cardId": 9,
            "password": 1234
        }
    - response: `Virtual card with id 9 deleted successfully.`
```

```yml
POST /online-payment
    - Rota para realizar compras online.
    - headers: {}
    - params: {}
    - query: {}
    - body: 
        {
            "cardId": 10,
            "password": 1234,
            "businessId": 1,
            "paymentValue": 77
        }
    - response: `Payment of $30 done successfully.`
```
