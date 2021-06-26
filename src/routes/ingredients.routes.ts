import { Router } from 'express';
import { body, check, param, query } from 'express-validator';
import {
  deleteIngredient,
  getIngredient,
  getIngredients,
  postIngredient,
  putIngredient
} from '../controllers/ingredients.controllers';
import isAuth from '../middlewares/isAuth';
import { validate_fields } from '../middlewares/validate-fields';
const router = Router();

router.get(
  '/',
  [
    isAuth,
    query('search', 'El campo de search debe ser tipo string').isString().optional({ nullable: true }),
    query('pageNumber', 'El número de página debe ser numerico').isInt().optional({ nullable: true }),
    query('pageSize', 'El tamaño de página debe ser numerico').isInt().optional({ nullable: true }),
    query('columnOrder', 'El campo columnOrder debe ser tipo string').isString().optional({ nullable: true }),
    query('order', 'Los valores permitidos son asc o desc').isIn(['asc', 'desc', '']).optional({ nullable: true }),
    validate_fields
  ],
  getIngredients
);
router.get(
  '/:id',
  [isAuth, param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  getIngredient
);
router.post(
  '/',
  [
    isAuth,
    body('name', 'El nombre es obligatorio').isString().notEmpty(),
    body('unit_of_measure', 'La unidad de medida es obligatoria')
      .isString()
      .isIn(['weight', 'liter', 'length', 'unit']),
    validate_fields
  ],
  postIngredient
);
router.put(
  '/:id',
  [
    isAuth,
    param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    body('name', 'El nombre debe ser de tipo string').isString().optional({ nullable: true }),
    body('unit_of_measure', 'La unidad de medida debe ser de tipo string').isString().optional({ nullable: true }),
    validate_fields
  ],
  putIngredient
);
router.delete(
  '/:id',
  [isAuth, param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  deleteIngredient
);

export default router;
