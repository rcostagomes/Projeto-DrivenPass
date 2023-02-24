import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

 function validateSchema(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const validation = schema.validate(user, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    res.locals.user = user;

    next();
  };
}

 function validateCredential(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const validation = schema.validate(user, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    res.locals.user = user;

    next();
  };
}
export function validateWifi(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const validation = schema.validate(user, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    res.locals.user = user;

    next();
  };
}

const validate = {
  validateSchema,
  validateCredential,
  validateWifi
}

export default validate