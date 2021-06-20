import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validate_fields = (req: Request, res: Response, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

export const validate_time = (field, fieldName) => {
  const time_regExp = new RegExp(/^(([0][0-9]|[01][0-9]|2[0-3]):[0-5]([0-9]))$/);
  if (!time_regExp.test(field)) {
    throw new Error(`El campo ${fieldName} no posee el formato correcto. Formato requerido HH:ii`);
  }
  return true;
};
