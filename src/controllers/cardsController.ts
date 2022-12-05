import { Request, Response } from "express";
import * as cardServices from "../services/cardsServices";

export async function createCard(req: Request, res: Response) {
    const headers = req.headers;
    const body = req.body;
    const { apikey } = headers;
    const { employeeId, isVirtual, isBlocked, type } = body;

    await cardServices.checkApiKey(apikey)
    await cardServices.checkEmployeeId(employeeId);
    await cardServices.checkCardType(type, employeeId);

    const cardNumber = await cardServices.setCardNumber();
    const cardholderName = await cardServices.setCardHolderName(employeeId);
    const expirationDate = await cardServices.setExpirationDate();
    const securityCode = await cardServices.setSecurityCode();
    const hiddenSecurityCode = await cardServices.hideData(`${securityCode}`);

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

export async function activateCard(req: Request, res: Response) {
    const { id } = req.params;
    const { securityCode, password } = req.body;

    await cardServices.checkCardId(Number(id));
    await cardServices.checkCardExpirationDate(Number(id));
    await cardServices.checkIfCardIsActive(Number(id));
    await cardServices.checkSecurityCode(Number(id), Number(securityCode));

    const hiddenPassword = await cardServices.hideData(password);
    await cardServices.activateCard(Number(id), hiddenPassword);

    return res.status(200).send('Activated.');
}

export async function viewEmployeeCards(req: Request, res: Response) {
    const { id } = req.body;

    const list = await cardServices.viewEmployeeCards(Number(id))

    return res.status(200).send(list);
}

export async function getCardBalance(req: Request, res: Response) {
    const { id } = req.body;
    const response = await cardServices.getCardBalance(id)
    return res.status(200).send(response)
}

export async function blockCard(req: Request, res: Response) {
    const { cardId, password } = req.body;
    await cardServices.checkCardId(cardId);
    await cardServices.checkCardExpirationDate(cardId);
    await cardServices.checkIfCardIsBlocked(cardId);
    await cardServices.checkPassword(cardId, password);
    await cardServices.blockCard(cardId);
    return res.status(200).send(`Card with id '${cardId}' blocked successfully.`)
}

export async function unblockCard(req: Request, res: Response) {
    const { cardId, password } = req.body;
    await cardServices.checkCardId(cardId);
    await cardServices.checkCardExpirationDate(cardId);
    await cardServices.checkIfCardIsUnblocked(cardId);
    await cardServices.checkPassword(cardId, password);
    await cardServices.unblockCard(cardId);
    return res.status(200).send(`Card with id '${cardId}' unblocked successfully.`)
}

export async function rechargeCard(req: Request, res: Response) {
    const { apikey } = req.headers;
    const { cardId, rechargeValue } = req.body;

    await cardServices.checkApiKey(apikey);
    await cardServices.checkCardId(cardId);

    return res.status(200).send(apikey)
}