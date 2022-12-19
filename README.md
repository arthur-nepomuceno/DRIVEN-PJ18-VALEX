<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg" alt="ValeX" style="width: 89px; height: 89px"/>
</p>

## <p align = "center">  - Valex - </p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Arthur Nepomuceno-093D04?style=flat-square" />
</p>

:construction: ...building... :construction:
##### **Leia em português:** 
[![pt-br](https://img.shields.io/badge/lang-pt--br-yellow.svg)](https://github.com/arthur-nepomuceno/pj18-valex/blob/main/README-pt-br.md)

## Summary
   - [Brief in](#brief-in)
   - [Introduction](#introduction)
   - [Concepts and Technologies](#concepts-and-technologies)
   - [Running the app](#running-the-app)
   - [End-points](#end-points)
   - [Architecture](#architecture)

***


## Brief in
   This project is about an API for cards. Valex makes possible that members from a company have their benefit cards, real and virtual, to use at the establishments registered and for online shopping.

***

## Introduction
   This project is coded in TypeScripand with a database previously built. It's elements are:
   - _companies_: table with the companies to wich the members belong. Each company must have a register key wich allows it to execute every other necessary operation.
   - _employees_: table with the companies' members. A member may have more than one card.
   - _cards_: table of cards, either virtual cards and real cards, varying in type os establishment where they can be used.
   - _payments_: table with the register of all payments.
   - _recharges_: table with the registers of all recharges.
   - _businesses_: table to register the establishments where the cards can be used.
   
***

## Concepts and Technologies 
   :construction: ... em construção ... :construction:
***

## Running-the-app
This project was built with Node Package Manager, so be sure you have the last version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

First, clone this repository to your machine:

```
git clone https://github.com/arthur-nepomuceno/pj18-valex.git
```

After, inside the folder, run the following command to install the dependencies.

```
npm install
```

To finish the process, you simply start the server.
```
npm run dev
```
###### [back to summary](#summary)
***

## End-points

```yml
POST /cards
    - Route to insert a new card.
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
    - Route to activate a card.
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
    - Route to visualize all the cards of an employee.
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
    - Route to visualize the transactions of a card (payments and recharges)
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
    - Route to block a card.
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
    - Route to unblock a card.
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
    - Route to recharge a card.
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
    - Route to make payments with a card.
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
    - Route to create a virtual card linked with a real card.
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
    - Route to delete a virtual card.
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
    - Route to make online payments.
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
###### [back to summary](#summary)

## Architecture
```yml
src
```
```yml
    server.ts
```
```yml
    database.ts
```
```yml
    controllers
```
```yml    
        cardsController.ts
        
            createCard(req: Request, res: Response) {
                - recieves api-key from req.headers
                - recieves card's data from req.body
                
                Services:
                    - check api-key
                    - check employee's id
                    - check card's type
                    - generate a card number
                    - generate a name for the card based on employee's name
                    - calculate card's expiration date
                    - generate a secutiry code
                    - encrypt security code
                    - insert data on database
            }

            activateCard(req: Request, res: Response){
                - recieves card's id from req.params
                - recieves security code and password from req.body
                - password must have 4 numbers

                Services:
                    - check if card's id is real
                    - check if the card is virtual
                    - check if the card hasn't expired
                    - check if the card already has a password registered
                    - check security code
                    - encrypt password
                    - register password on database
            }

            viewEmployeeCards(req: Request, res: Response){
                - recieves employee's id from req.body
                - returns all cards from this employee

                Services:
                    - search all cards registered with this employee's id
                    - format data
                    - decrypt the secutiry code
            }

            getCardBalance(req: Request, res: Response) {
                - recieves a card's id from the req.body
                - returns the card's balance, with the list of payments and recharges

                Services:
                    - search for the register of payments
                    - search for the register of recharges
                    - calculate balance
                    - format data and return it.
            }

            blockCardById(req: Request, res: Response) {
                - recieves an id and a password of a card from req.body
                - blocks the card

                Services:
                    - check card's id
                    - check expiration date
                    - check if card is already blocked
                    - check password
                    - block card
                    - return success message
            }

            unblockCardById(req: Request, res: Response) {
                - recieves an id and a password of a card from req.body
                - unblock card

                Services:
                    - check card's id
                    - check expiration date
                    - check if card is already unblocked
                    - check password
                    - unblock card
                    - return success message
            }

            rechargeCard(req: Request, res: Response) {
                - recieves API key from req.headers
                - recieves card's id from req.body

                Services:
                    - check API key
                    - check card's id
                    - accept only recharge values bigger than zero
                    - check if card is active
                    - check expiration date
                    - register recharge on database
            }

            makePayment(req: Request, res: Response) {
                - recieves from req.body:
                    - card's id
                    - card's password
                    - business' id
                    - payment value
                
                Services:
                    - check card's id
                    - check if card is activated or not
                    - check expiration date
                    - check if card is blocked
                    - check password
                    - check business' id
                    - check if card type matches 
                      business type
                    - check if card balance is enough
                    - register payment on database
            }

            createVirtualCard(req: Request, res: Response) {
                - recieves from req.body:
                    - id from the real card, as reference
                    - password from the real card

                Services:
                    - check card's id
                    - check password
                    - get data from the original card:
                        - employee's id
                        - name registered on the card
                        - expiration date
                        - type of card
                    - generate new card number
                    - generate new security code
                    - encrypt password
                    - encrypt security code
                    - insert card on database
            }

            deleteVirtualCard(req: Request, res: Response) {
                - recieves from req.body:
                    - id of the virtual card that is going to be deleted
                    - password of he virtual card

                Services:
                    - check card's id
                    - check password
                    - delete card
            }

            makeOnlinePayment(req: Request, res: Response) {
                - recieves from req.body:
                    - card's id
                    - card's password
                    - business' id
                    - payment value

                - searchs for the id of the original card
                
                Services:
                    - check card's id
                    - check if the original card is activated or not
                    - check expiration date
                    - check if card is blocked
                    - check password
                    - check business' id
                    - check if card type matches business type
                    - check if card balance is enough
                    - register payment on database
            }
```
```yml            
    database
```
```yml
    middlewares
        errorHandler.ts
```
```yml
    repositories
    
        businessRepository.ts
        cardRepository.ts
        companyRepository.ts
        employeeRepository.ts
        paymentRepository.ts
        rechargeRepository.ts
```
```yml
    routers
        cardsRouter.ts
```
```yml
    schemas
        cardSchema.ts
```
```yml
    services
```
```yml
        cardServices.ts
        
            checkApiKey(key: string | string[]){
                - procura pela chave recebida na base de dados
                - se não existir, retorna o erro "invalid_api_key"
                - se existir, segue adiante
            }

            checkEmployeeId(employeeId: number){
                - procura pelo id na base de dados
                - se não existir, retorna o erro "invalid_user"
                - se existir, segue adiante
            }

            setCardHolderName(employeeId: number){
                - procura pelo id na base de dados
                - retorna o nome do registro no formato
                  para ser inserido no cartão.
            }

            checkCardType(employeeId: number, type:number){
                - verifica se o empregado já tem um cartão do tipo que
                  ele está tentando cadastrar
                - se tiver, retornar o erro "unavailable_card_type"
                - se não tiver, seguir adiante
            }

            setCardNumber(){
                - usa a lib faker para gerar um número aleatório de 16 dígitos
                - retorna esse número
            }

            setExpirationDate(){
                - usar a lib dayjs para pegar o mês e o ano atual
                - gerar a expiration date, 5 anos à frente
            }

            setSecurityCode() {
                - usa a lib faker para gerar um número aleatório de 3 dígitos
                - retorna esse número
            }

            hideData(data: string){
                - usar a lib cryptr para criptografar uma informação
                - instalação: npm i cryptr & npm i -D @types/cryptr
                - retornar esse valor
            }

            showData(data: string){
                - usar a lib cryptr para descriptografar uma informação
                - retornar esse valor
            }

            insertCard(object: CardInsertData) {
                - insere um novo cartão no banco de dados
            }
    
            checkCardId(id: number) {
                - verifica se o id é de um cartão existente
                - se não, retorna o erro "invalid_card_id"
                - se sim, segue adiante
            }

            checkCardExpirationDate(id: number) {
                - encontra o cartão no banco de dados
                - verifica se a data de expiração já venceu
                - se sim, retorna o erro "card_expired"
                - se não, segue adiante
            }

            checkIfCardIsActive(id: number) {
                - encontra o cartão no banco de dados
                - verifica se ele já tem senha cadastrada
                - se sim, retorna o erro "active_card"
                - se nao, segue adiante
            }

            checkIfCardIsUnactive(id: number) {
                - encontra o cartão no banco de dados
                - verifica se ele já tem senha cadastrada
                - se não, retorna o erro "unactive_card"
                - se sim, segue adiante
            }

            checkSecurityCode(id: number, securityCode: number) {
                - encontra o cartão no banco de dados
                - pega o código de segurança criptografado
                - compara ele com o código fornecido na requisição
                - se forem diferentes, retorna o erro "invalid_security_code"
                - se forem iguais, segue adiante
            }

            activateCard(id: number, password: string) {
                - passa 2 parâmetros para a função de atualização de cartões:
                    - id
                    - {password, isBlocked: false}
            }

            getEmployeeCards(id: number){
                - passa o id do empregado como parâmetro para o repository
            }

            getCardBalance(id: number) {
                - passa o id do cartão como parâmetro
                - busca os pagamentos
                - busca as recargas
                - calcula o saldo
            }

            checkPassword(id: number, password: string) {
                - busca o registro de cartão com o id
                - descriptografa a senha do registro
                - compara com a senha fornecida pelo usuário
                - se forem diferentes, retorna o erro "invalid_password"
                - se forem iguais, segue adiante
            }

            checkIfCardIsBlocked(id: number) {
                - busca o registro do cartão com o id
                - acessa a propriedade que informa se o cartão está bloqueado
                - se já estiver bloqueado, retorna o erro "blocked_card"
                - se não estiver, segue adiante
            }

            blockCard(id: number) {
                - mediante o id, bloqueia o cartão
            }

            checkIfCardIsUnblocked(id: number) {
                - busca o registro do cartão com o id
                - acessa a propriedade que informa se o cartão está bloqueado
                - se já estiver desbloqueado, retorna o erro "unblocked_card"
                - se não estiver, segue adiante
            }

            unblockCard(id: number) {
                - mediante o id, desbloqueia o cartão
            }

            rechargeCardById(cardId: number, amount: number) {
                - recebe o id do cartão que vai receber a recarga
                - recebe o valor de recarga
                - realiza a recarga
            }

            checkCardAndBusinessTypes(cardId: number, businessId: number) {
                - busca os dados do cartão com o id
                - busca os dados do estabelecimento com o id
                - compara o tipo do cartão com o do estabelecimento
                - se forem diferentes, retorna o erro "invalid_card_and_business_types"
                - se forem iguais, segue adiante
            }

            checkCardBalance(cardId: number, paymentValue: number) {
                - com o id do cartão, calcula seu saldo
                - compara o saldo com o valor do pagamento
                - se for menor, retorna o erro "not_enough_money"
                - se for maior ou igual, segue adiante
            }

            makePayment(cardId: number, businessId: number, paymentValue: number) {
                - recebe o id do cartão
                - recebe o id so estabelecimento
                - recebe o valor do pagamento
                - realiza o pagamento
            }

            getOriginalCardData(cardId: number) {
                - recebe o id do cartão
                - busca informações do cartão:
                    - id do empregado
                    - nome de registro no cartão
                    - data de expiração
                    - tipo do cartão
                - retorna essas informações
            }

            deleteCardById(cardId: number) {
                - recebe o id do cartão
                - deleta o cartão
            }

            checkIfCardIsVirtual(cardId: number) {
                - busca o registro do cartão com o id
                - acessa a propriedade que informa se o cartão é virtual
                - se for virtual, retorna o erro "virtual_card"
                - se não for, segue adiante
            } 
```
```yml
        businessServices.ts
        
            checkBusinessId(id: number) {
                - recebe o id do estabelecimento
                - busca o estabelecimento no banco de dados
                - se não houver resposta, retorna o erro "invalid_business_id"
                - se houver, segue adiante
            }
```
###### [back to summary](#summary)

```yml
    utils
        sqlUtils.ts
```
