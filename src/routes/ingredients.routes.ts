import { Router } from 'express';
import { body, check, param, query } from 'express-validator';
import {
  deleteIngredient,
  getIngredient,
  getIngredients,
  postIngredient,
  putIngredient
} from '../controllers/ingredients.controllers';
import { validate_fields } from '../middlewares/validate_fields';
const router = Router();

router.get(
  '/',
  [
    query('search', 'El campo de search debe ser tipo string').isString().optional({ nullable: true }),
    query('start', 'El campo start debe ser numerico').isInt().optional({ nullable: true }),
    query('limit', 'El campo limit debe ser numerico').isInt().optional({ nullable: true }),
    query('columnOrder', 'El campo columnOrder debe ser tipo string').isString().optional({ nullable: true }),
    query('order', 'Los valores permitidos son ASC o DESC').isIn(['ASC', 'DESC']).optional({ nullable: true }),
    validate_fields
  ],
  getIngredients
);
router.get(
  '/:id',
  [param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  getIngredient
);
router.post(
  '/',
  [
    body('name', 'El nombre es obligatorio').isString().notEmpty(),
    body('unit_of_measure', 'La unidad de medida debe ser de tipo string').isString().optional({ nullable: true }),
    validate_fields
  ],
  postIngredient
);
router.put(
  '/:id',
  [
    param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    body('name', 'El nombre debe ser de tipo string').isString().optional({ nullable: true }),
    body('unit_of_measure', 'La unidad de medida debe ser de tipo string').isString().optional({ nullable: true }),
    validate_fields
  ],
  putIngredient
);
router.delete(
  '/:id',
  [param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  deleteIngredient
);

export default router;
