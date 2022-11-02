import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

export function checkSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        const check = schema.validate(body);

        if(check.error) return res.status(500).send(check.error.message);
        
        next();
    }

}