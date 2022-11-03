import { Request, Response } from "express";
import * as cardServices from "../services/cardsServices";

export async function createCard(req: Request, res: Response) {
    const headers = req.headers;
    const body = req.body;
    const { apikey } = headers;
    const { employeeId, password, isVirtual, originalCardId, isBlocked ,type } = body;

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
        password,
        isVirtual,
        originalCardId,
        isBlocked,
        type
    }

    await cardServices.insertCard(newCard);

    return res.status(201).send('Created.');
}