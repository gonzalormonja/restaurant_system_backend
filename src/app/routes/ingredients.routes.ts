import { Router } from 'express';
import { check } from 'express-validator';
import {
  deleteIngredient,
  getIngredient,
  getIngredients,
  postIngredient,
  putIngredient
} from '../../controllers/ingredients.controllers';
import { validate_fields } from '../../middlewares/validate_fields';
const router = Router();

router.get('/', getIngredients);
router.get('/:id', getIngredient);
router.post('/', [check('name', 'El nombre es obligatorio').notEmpty(), validate_fields], postIngredient);
router.put('/:id', [check('name', 'El nombre es obligatorio').notEmpty(), validate_fields], putIngredient);
router.delete('/:id', deleteIngredient);

export default router;
