<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg" alt="ValeX" style="width: 89px; height: 89px"/>
</p>

## <p align = "center">  - Valex - </p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Arthur Nepomuceno-093D04?style=flat-square" />
</p>

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
                - searchs for the API key on the database
                - if there is no register, it returns the error "invalid_api_key"
                - if there is, it goes ahead
            }

            checkEmployeeId(employeeId: number){
                - searchs for the employee's id on the database 
                - if there is no register, it returns the error "invalid_user"
                - if there is, it goes ahead
            }

            setCardHolderName(employeeId: number){
                - searchs for the employee's id on the database
                - formats and returns the name of the employee
            }

            checkCardType(employeeId: number, type:number){
                - checks if the employee already has a card of this type
                - if it does, returns the error "unavailable_card_type"
                - if it doesn't, goes ahead
            }

            setCardNumber(){
                - uses faker to generate a random number of 16 digits
                - returns this number
            }

            setExpirationDate(){
                - uses dayjs to get current year and month
                - generates an expiration date, five years ahead
            }

            setSecurityCode() {
                - uses faker to generate a random number of 3 digits
                - returns this number
            }

            hideData(data: string){
                - uses cryptr to encrypt a string
                - returns the encrypted data
            }

            showData(data: string){
                - uses cryptr to decrypt a string
                - returns the decrypted data
            }

            insertCard(object: CardInsertData) {
                - inserts a new card on the database
            }
    
            checkCardId(id: number) {
                - checks if the id is from a registered card
                - if it is, returns the error "invalid_card_id"
                - if it is not, goes ahead
            }

            checkCardExpirationDate(id: number) {
                - finds the card on the database
                - checks if the card has expired
                - if it has, returns the error "card_expired"
                - if it hasn't, goes ahead
            }

            checkIfCardIsActive(id: number) {
                - finds the card on the database
                - checks if it already has a password
                - if it does, returns the error "active_card"
                - if it doesn't, goes ahead
            }

            checkIfCardIsUnactive(id: number) {
                - finds the card on the database
                - checks if it already has a password
                - if it doesn't, returns the error "unactive_card"
                - if it does, goes ahead
            }

            checkSecurityCode(id: number, securityCode: number) {
                - finds the card on the database
                - gets the encrypted security code
                - compares it with the code recieved from the request
                - if they do not match, returns the error "invalid_security_code"
                - if they match, goes ahead
            }

            activateCard(id: number, password: string) {
                - passes two parameters to an update cards function:
                    - id
                    - {password, isBlocked: false}
            }

            getEmployeeCards(id: number){
                - returns all employee's cards based on employee's id
            }

            getCardBalance(id: number) {
                - with card's id, gets all payments and recharges registered
                - calculates balance
                - returns balance
            }

            checkPassword(id: number, password: string) {
                - gets card's data with card's id
                - decrypts password
                - compares it with the given password
                - if they do not match, it returns the error "invalid_password"
                - if they match, goes ahead
            }

            checkIfCardIsBlocked(id: number) {
                - gets card's data with card's id
                - checks if the card is blocked
                - if it is, it returns the error "blocked_card"
                - if it is not, goes ahead
            }

            blockCard(id: number) {
                - blocks a card with card's id
            }

            checkIfCardIsUnblocked(id: number) {
                - gets card's data with card's id
                - checks if card is unblocked
                - if it is, returns the error "unblocked_card"
                - if it is not, goes ahead
            }

            unblockCard(id: number) {
                - unblocks a card with card's id
            }

            rechargeCardById(cardId: number, amount: number) {
                - recieves the id of a card
                - recieves a value for recharge
                - makes the recharge
            }

            checkCardAndBusinessTypes(cardId: number, businessId: number) {
                - gets card's data with card's id
                - gets business' data with business' id
                - checks if card's type matches business' type
                - if they do not match, returns the error "invalid_card_and_business_types"
                - if they match, goes ahead
            }

            checkCardBalance(cardId: number, paymentValue: number) {
                - with card's id, calculates it's balance
                - compares the balance with the value of the payment
                - if it is lower, returns the error "not_enough_money"
                - if it is equal or higher, goes ahead
            }

            makePayment(cardId: number, businessId: number, paymentValue: number) {
                - recieves card's id
                - recieves business' id
                - recieves the value of the payment
                - makes the payment
            }

            getOriginalCardData(cardId: number) {
                - recieves card's id
                - gets the following card's data:
                    - employee's id
                    - name on the card
                    - expiration date
                    - type of card
                - returns the data
            }

            deleteCardById(cardId: number) {
                - recieves card's id
                - deletes the card
            }

            checkIfCardIsVirtual(cardId: number) {
                - gets card's data with card's id
                - checks if the card is virtual
                - if it is, returns the error "virtual_card" 
                - if it is not, goes ahead
            } 
```
```yml
        businessServices.ts
        
            checkBusinessId(id: number) {
                - recieves business' id
                - searchs for the register on the database
                - if there is no register, returns the error "invalid_business_id"
                - if there is, goes ahead
            }
```
###### [back to summary](#summary)

```yml
    utils
        sqlUtils.ts
```