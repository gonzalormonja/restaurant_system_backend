import { Router } from 'express';
import { deleteMenu, getMenu, getMenus, postMenu, patchMenu } from '../controllers/menus.controllers';
import { body, param, query } from 'express-validator';
import { validate_fields } from '../middlewares/validate_fields';
import {
  validateCategories,
  validateCategory,
  validateCharacteristics,
  validateGarnishes,
  validateIngredients
} from '../middlewares/db_validators';
const router = Router();

router.get(
  '/',
  [
    query('search', 'El campo de search debe ser tipo string').isString().optional({ nullable: true }),
    query('start', 'El campo start debe ser numerico').isInt().optional({ nullable: true }),
    query('limit', 'El campo limit debe ser numerico').isInt().optional({ nullable: true }),
    query('columnOrder', 'El campo columnOrder debe ser tipo string').isString().optional({ nullable: true }),
    query('order', 'Los valores permitidos son ASC o DESC').isIn(['ASC', 'DESC']).optional({ nullable: true }),
    query('idCategories').isArray().custom(validateCategories).optional({ nullable: true }),
    validate_fields
  ],
  getMenus
);
router.get(
  '/:id',
  [param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  getMenu
);
router.post(
  '/',
  [
    body('state', 'El estado debe ser un booleano valido').isBoolean().optional({ nullable: true }),
    body('name', 'El nombre es obligatorio').isString().notEmpty(),
    body('short_name', 'El nombre corto es obligatorio').isString().notEmpty(),
    body('price', 'El precio es obligatorio').isFloat().notEmpty(),
    body('idCategory').isInt().custom(validateCategory).optional({ nullable: true }),
    body('ingrdients').isArray().custom(validateIngredients).optional({ nullable: true }),
    body('idCharacteristics').isArray().custom(validateCharacteristics).optional({ nullable: true }),
    body('garnishes').isArray().custom(validateGarnishes).optional({ nullable: true }),
    validate_fields
  ],
  postMenu
);
router.patch(
  '/:id',
  [
    param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    body('state', 'El estado debe ser un booleano valido').isBoolean().optional({ nullable: true }),
    body('name', 'El nombre es obligatorio').isString().optional({ nullable: true }),
    body('short_name', 'El nombre corto es obligatorio').isString().optional({ nullable: true }),
    body('price', 'El precio debe ser de tipo numerico').isFloat().optional({ nullable: true }),
    body('idCategory').isInt().custom(validateCategory).optional({ nullable: true }),
    body('ingrdients').isArray().custom(validateIngredients).optional({ nullable: true }),
    body('idCharacteristics').isArray().custom(validateCharacteristics).optional({ nullable: true }),
    body('garnishes').isArray().custom(validateGarnishes).optional({ nullable: true }),
    validate_fields
  ],
  patchMenu
);
router.delete(
  '/:id',
  [param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  deleteMenu
);

export default router;
