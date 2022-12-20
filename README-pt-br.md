##### **Read in english:**
[![en](https://img.shields.io/badge/lang-en-blue.svg)](https://github.com/arthur-nepomuceno/pj18-valex/blob/main/README.md)

<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg" alt="ValeX" style="width: 89px; height: 89px"/>
</p>

## <p align = "center">  - Valex - </p>

<p align = "center">
   <img src="https://img.shields.io/badge/autor-Arthur Nepomuceno-093D04?style=flat-square" />
</p>

## Comece aqui

Este projeto tem por objetivo o exercício da programação em TypeScript. Parte de sua arquitetura e estrutura de arquivos foi recebida pronta. Por isso, ao ler este arquivo, o leitor irá notar que alguns trechos do código não possuem detalhamento nesta documentação. Estes trechos são justamente aqueles que não foram criados por este desenvolvedor. Para os demais casos, o leitor encontrará uma documentação objetiva, detalhada e o mais clara possível.

## Sumário
   - [Apresentação](#apresentação)
   - [Introdução](#introdução)
   - [Conceitos e Tecnologias](#conceitos-e-tecnologias)
   - [Rodando a aplicação](#rodando-a-aplicação)
   - [Rotas](#rotas)
   - [Arquitetura](#arquitetura)

***


## Apresentação
   Este projeto se trata de uma API de cartões. O Valex torna possível que colaboradores de uma empresa tenham cartões de benefícios, físicos e virtuais, para utilizar nos estabelecimentos cadastrados na rede de opções e para compras online.

***

## Introdução
   Este é um projeto desenvolvido em TypeScript e com um banco de dados previamente construído. Seus elementos são:
   - _companies_: tabela com as empresas as quais pertecem os colaboradores. Cada empresa deve possuir uma chave de registro que a possibilita realizar as demais operações necessárias.
   - _employees_: tabela de colaboradores associados à empresa. Um colaborador pode ter mais de um cartão.
   - _cards_: tabela de cartões, que podem ser físicos e virtuais, variando em tipo de estabelecimento onde podem ser utilizados.
   - _payments_: tabela de registros de pagamentos.
   - _recharges_: tabela de registros de recargas.
   - _businesses_: tabela para cadastro dos establecimentos que aceitam os cartões da empresa.
   
***

## Conceitos e Tecnologias
    - typeScript
    - nodeJs
    - nodemon
    - express
    - express-async-errors
    - cors
    - dotenv
    - postgreSQL
    - faker
    - dayjs
    - cryptr

***

## Rodando a aplicação
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
###### [voltar para o sumário](#sumário)
***

## Rotas

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
    - Rota para recarregar um cartão.
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
###### [voltar para o sumário](#sumário)

## Arquitetura
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
                - recebe a api-key pelo req.headers
                - recebe os dados do cartão pelo req.body
                
                Serviços:
                    - verifica a api-key
                    - verifica o id do trabalhador
                    - verifica o tipo do cartão
                    - gera um número de cartão
                    - gera um nome para o cartão
                    - gera uma data de expiração
                    - gera um código de segurança
                    - criptografa o código de segurança
                    - insere os dados no banco de dados
            }

            activateCard(req: Request, res: Response){
                - receber id pelo req.params
                - receber cvc e password pelo req.body
                - a senha deve ter 4 números

                Serviços:
                    - verificar se existe um cadastro de cartão com esse id
                    - verificar se o cartão é virtual
                    - verificar se o cartão não expirou
                    - verificar se o cartão já tem senha cadastrada
                    - verificar código de segurança
                    - criptografar a senha
                    - registrar a senha
            }

            viewEmployeeCards(req: Request, res: Response){
                - receber id do empregado pelo req.body
                - retornar os cartões desse empregado

                Serviços:
                    - buscar os cartões registrados com o id do empregado
                    - tratar a informação para mostrar o necessário
                    - descriptografar o código de segurança
            }

            getCardBalance(req: Request, res: Response) {
                - receber um id de cartão pelo req.body
                - retornar o saldo do cartão, com lista de pagamentos e recargas

                Serviços:
                    - buscar os registros de pagamentos
                    - buscar os registros de recargas
                    - calcular o saldo
                    - retornar as informações no formato correto
            }

            blockCardById(req: Request, res: Response) {
                - receber um id e senha de cartão pelo req.body
                - executar o bloqueio do cartão

                Serviços:
                    - verificar o id do cartão
                    - verificar a data de expiração
                    - verificar se o cartão já está bloqueado
                    - verificar se a senha fornecida está correta
                    - bloquear o cartão
                    - retornar mensagem de sucesso
            }

            unblockCardById(req: Request, res: Response) {
                - receber um id e senha de cartão pelo req.body
                - executar o desbloqueio do cartão

                Serviços:
                    - verificar o id do cartão
                    - verificar a data de expiração
                    - verificar se o cartão já está desbloqueado
                    - verificar se a senha fornecida está correta
                    - desbloquear o cartão
                    - retornar mensagem de sucesso
            }

            rechargeCard(req: Request, res: Response) {
                - receber API key pelo req.headers
                - receber id do cartão pelo req.body

                Serviços:
                    - validar a API key
                    - validar o id do cartão
                    - aceitar somente valores de recarga maiores que zero
                    - verificar se o cartão está ativo
                    - verificar se o cartão já expirou
                    - registrar recarga no banco de dados
            }

            makePayment(req: Request, res: Response) {
                - receber pelo req.body:
                    - id do cartão
                    - senha do cartão
                    - id do estabelecimento
                    - valor do pagamento
                
                Serviços:
                    - validar id do cartão
                    - verificar se o cartão está ativado ou não
                    - verificar a data de expiração
                    - verificar se o cartão está bloqueado
                    - verificar a senha
                    - verificar o id do estabelecimento
                    - verificar se o tipo do cartão é compatível 
                      com o tipo do estabelecimento
                    - verificar se há saldo suficiente no cartão
                    - registrar pagamento no banco de dados
            }

            createVirtualCard(req: Request, res: Response) {
                - receber pelo body da request:
                    - id do cartão físico de referência
                    - senha do cartão físico

                Serviços:
                    - verificar id do cartão
                    - verificar senha
                    - buscar dados do cartão original
                        - id do empregado
                        - nome de registro no cartão
                        - data de expiração
                        - tipo do cartão
                    - gerar um número para o novo cartão
                    - gerar um código de segurança
                    - criptografar a senha
                    - criptografar o código de segurança
                    - inserir cartão no banco de dados
            }

            deleteVirtualCard(req: Request, res: Response) {
                - receber pelo body:
                    - id do cartão virtual que vai ser deletado
                    - senha do cartão virtual

                Serviços:
                    - verificar id do cartão
                    - verificar senha
                    - deletar cartão
            }

            makeOnlinePayment(req: Request, res: Response) {
                - receber pelo body da request:
                    - id do cartão
                    - senha do cartão
                    - id do estabelecimento
                    - valor do pagamento

                - buscar o id do cartão original
                
                Serviços:
                    - validar id do cartão
                    - verificar se o cartão original está ativado ou não
                    - verificar a data de expiração
                    - verificar se o cartão está bloqueado
                    - verificar a senha
                    - verificar o id do estabelecimento
                    - verificar se o tipo do cartão é compatível 
                      com o tipo do estabelecimento
                    - verificar se há saldo suficiente no cartão
                    - registrar pagamento no banco de dados
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
                - procura pela chave-da-API na base de dados
                - se não existir, retorna o erro "invalid_api_key"
                - se existir, segue adiante
            }

            checkEmployeeId(employeeId: number){
                - procura pelo id do funcionário na base de dados
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
###### [voltar para o sumário](#sumário)

```yml
    utils
        sqlUtils.ts
```
