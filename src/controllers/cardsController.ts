import { Request, Response } from "express";
import * as cardServices from "../services/cardsServices";

export async function createCard(req: Request, res: Response) {
    const headers = req.headers;
    const body = req.body;
    const { apikey } = headers;
    const { employeeId, isVirtual, isBlocked ,type } = body;

    await cardServices.checkApiKey(apikey)
    await cardServices.checkEmployeeId(employeeId);
    await cardServices.checkCardType(type, employeeId);
    
    const cardNumber = await cardServices.setCardNumber();
    const cardholderName = await cardServices.setCardHolderName(employeeId);
    const expirationDate = await cardServices.setExpirationDate();
    const securityCode = await cardServices.setSecurityCode();
    const hiddenSecurityCode = await cardServices.hideSecurityCode(`${securityCode}`);

    const newCard = {
        number: cardNumber,
        employeeId,
        cardholderName,
        securityCode: hiddenSecurityCode,
        expirationDate,
        password: null,
        isVirtual,
        originalCardId: null,
        isBlocked,
        type
    }

    await cardServices.insertCard(newCard);

    return res.status(201).send({
        number: cardNumber,
        cardholderName,
        expirationDate,
        securityCode
    });
}

export async function activateCard(req: Request, res: Response){
    //receber id pelo req.params
    //receber cvc e password pelo req.body
    //a senha deve ter 4 números
    //verificar se existe um cadastro de cartão com esse id
    //verificar se o cartão não expirou
    //verificar se o cartão já tem senha cadastrada
    //criptografar a senha
    //registrar a senha
    
    return res.status(200).send('ok')
}