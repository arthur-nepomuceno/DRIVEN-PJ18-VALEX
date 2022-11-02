import { Request, Response } from "express";
import * as cardServices from "../services/cardsServices";

export async function createCard(req: Request, res: Response) {
    const body = req.body;
    const { employeeId, number, securityCode } = body;

    const result = await cardServices.getCardHolderName(employeeId);

    return res.status(201).send(result);
}