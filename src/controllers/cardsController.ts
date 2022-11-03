import { Request, Response } from "express";
import * as cardServices from "../services/cardsServices";

export async function createCard(req: Request, res: Response) {
    const headers = req.headers;
    const body = req.body;
    const { apikey } = headers;
    const { employeeId, number, securityCode, type } = body;

    await cardServices.checkApiKey(apikey)
    await cardServices.checkEmployeeId(employeeId);
    await cardServices.checkCardType(type, employeeId);

    const cardholderName = await cardServices.setCardHolderName(employeeId);

    return res.status(201).send('ok');
}