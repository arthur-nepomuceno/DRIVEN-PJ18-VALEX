import { Router } from "express";
import { checkSchema } from "../schemas/checkSchema";
import { cardSchema, activateSchema } from "../schemas/cardSchema";
import { createCard, activateCard } from "../controllers/cardsController";

export const cardsRouter = Router();

cardsRouter.post('/cards', checkSchema(cardSchema), createCard)
cardsRouter.post('/cards/:id/activate', checkSchema(activateSchema), activateCard)