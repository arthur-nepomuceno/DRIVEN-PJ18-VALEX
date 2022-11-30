import { Router } from "express";
import { checkSchema } from "../schemas/checkSchema";
import { cardSchema, activateSchema, viewCardSchema, getBalanceSchema } from "../schemas/cardSchema";
import { createCard, activateCard, viewEmployeeCards, getCardBalance, blockCardById } from "../controllers/cardsController";

export const cardsRouter = Router();

cardsRouter.post('/cards', checkSchema(cardSchema), createCard)
cardsRouter.post('/cards/:id/activate', checkSchema(activateSchema), activateCard)
cardsRouter.get('/cards', checkSchema(viewCardSchema), viewEmployeeCards)
cardsRouter.get('/cards/balance', checkSchema(getBalanceSchema), getCardBalance)
cardsRouter.put('/block', blockCardById)