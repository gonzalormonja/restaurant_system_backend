import { Router } from 'express';
import { deleteMenu, getMenu, getMenus, postMenu, putMenu } from '../controllers/menus.controllers';
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
    query('search', 'El campo de search debe ser tipo string').isString(),
    query('start', 'El campo start debe ser numerico').isInt(),
    query('limit', 'El campo limit debe ser numerico').isInt(),
    query('columnOrder', 'El campo columnOrder debe ser tipo string').isString(),
    query('order', 'Los valores permitidos son ASC o DESC').isIn(['ASC', 'DESC']),
    query('idCategories').isArray().custom(validateCategories),
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
    body('state', 'El estado debe ser un booleano valido').isBoolean(),
    body('name', 'El nombre es obligatorio').isString().notEmpty(),
    body('short_name', 'El nombre corto es obligatorio').isString().notEmpty(),
    body('price', 'El precio es obligatorio').isFloat().notEmpty(),
    body('idCategory').isInt().custom(validateCategory),
    body('ingrdients').isArray().custom(validateIngredients),
    body('idCharacteristics').isArray().custom(validateCharacteristics),
    body('garnishes').isArray().custom(validateGarnishes),
    validate_fields
  ],
  postMenu
);
router.put(
  '/:id',
  [param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  putMenu
);
router.delete(
  '/:id',
  [
    param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    body('state', 'El estado debe ser un booleano valido').isBoolean(),
    body('price', 'El precio debe ser de tipo numerico').isFloat(),
    body('idCategory').isInt().custom(validateCategory),
    body('ingrdients').isArray().custom(validateIngredients),
    body('idCharacteristics').isArray().custom(validateCharacteristics),
    body('garnishes').isArray().custom(validateGarnishes),
    validate_fields
  ],
  deleteMenu
);

export default router;
