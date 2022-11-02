import { Request, Response, NextFunction } from "express";

export function errorHandler(error: Error | any, req: Request, res: Response, next: NextFunction) {
    const { type, message } = error;
    const status = {
        bad_request: 400,
    }

    if (type === "invalid_user") return res.status(status.bad_request).send(message)

    return res.status(500).send(`Unexpected server error: ${error}.`)
}