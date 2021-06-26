import { Router } from 'express';
import {
  deleteProduct,
  getProduct,
  getProducts,
  postProduct,
  patchProduct
} from '../controllers/products.controllers';
import { body, param, query } from 'express-validator';
import { validate_fields } from '../middlewares/validate-fields';
import {
  validateCategories,
  validateCategory,
  validateCharacteristics,
  validateGarnishes,
  validateIngredients
} from '../middlewares/db_validators';
import isAuth from '../middlewares/isAuth';
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
    query('idCategories').isArray().custom(validateCategories).optional({ nullable: true }),
    validate_fields
  ],
  getProducts
);
router.get(
  '/:id',
  [isAuth, param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  getProduct
);
router.post(
  '/',
  [
    isAuth,
    body('state', 'El estado debe ser un booleano valido').isBoolean().optional({ nullable: true }),
    body('name', 'El nombre es obligatorio').isString().notEmpty(),
    body('short_name', 'El nombre corto es obligatorio').isString().notEmpty(),
    body('price', 'El precio es obligatorio').isFloat().notEmpty(),
    body('approximate_delay_minutes', 'El approximate_delay_minutes debe ser un entero valido')
      .isInt()
      .optional({ nullable: true }),
    body('idCategory').isInt().custom(validateCategory).optional({ nullable: true }),
    body('ingrdients').isArray().custom(validateIngredients).optional({ nullable: true }),
    body('idCharacteristics').isArray().custom(validateCharacteristics).optional({ nullable: true }),
    body('garnishes').isArray().custom(validateGarnishes).optional({ nullable: true }),
    validate_fields
  ],
  postProduct
);
router.patch(
  '/:id',
  [
    isAuth,
    param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    body('state', 'El estado debe ser un booleano valido').isBoolean().optional({ nullable: true }),
    body('name', 'El nombre es obligatorio').isString().optional({ nullable: true }),
    body('short_name', 'El nombre corto es obligatorio').isString().optional({ nullable: true }),
    body('price', 'El precio debe ser de tipo numerico').isFloat().optional({ nullable: true }),
    body('approximate_delay_minutes', 'El approximate_delay_minutes debe ser un entero valido')
      .isInt()
      .optional({ nullable: true }),
    body('idCategory').isInt().custom(validateCategory).optional({ nullable: true }),
    body('ingrdients').isArray().custom(validateIngredients).optional({ nullable: true }),
    body('idCharacteristics').isArray().custom(validateCharacteristics).optional({ nullable: true }),
    body('garnishes').isArray().custom(validateGarnishes).optional({ nullable: true }),
    validate_fields
  ],
  patchProduct
);
router.delete(
  '/:id',
  [isAuth, param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  deleteProduct
);

export default router;
