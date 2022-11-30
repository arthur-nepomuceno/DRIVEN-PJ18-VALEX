import { Request, Response, NextFunction } from "express";

export function errorHandler(error: Error | any, req: Request, res: Response, next: NextFunction) {
    const { type, message } = error;
    const status = {
        bad_request: 400,
        unauthorized: 401,
        not_found: 404,
        not_acceptable: 406,
    }

    if (type === "invalid_user") return res.status(status.bad_request).send(message);
    if (type === "invalid_api_key") return res.status(status.unauthorized).send(message);
    if (type === "unavailable_card_type") return res.status(status.not_acceptable).send(message);
    if (type === "invalid_card_id") return res.status(status.not_found).send(message);
    if (type === "card_expired") return res.status(status.not_acceptable).send(message);
    if (type === "active_card") return res.status(status.not_acceptable).send(message);
    if (type === "invalid_security_code") return res.status(status.not_acceptable).send(message);
    if (type === "blocked_card") return res.status(status.not_acceptable).send(message);
    if (type === "invalid_password") return res.status(status.not_acceptable).send(message);

    return res.status(500).send(`Unexpected server error: ${error}.`)
}