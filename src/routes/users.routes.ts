import { Router } from 'express';
import { body } from 'express-validator';
import { validate_fields } from '../middlewares/validate-fields';
import { signIn } from '../controllers/users.controllers';
const router = Router();

router.post(
  '/signIn',
  [
    body('username', 'El usuario es obligatorio').isString().notEmpty(),
    body('password', 'La constraseña es obligatora').isString().notEmpty(),
    validate_fields
  ],
  signIn
);

export default router;
