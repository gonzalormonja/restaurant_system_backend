import { Router } from 'express';
import { deleteMenu, getMenu, getMenus, postMenu, putMenu } from '../controllers/menus.controllers';
import { check, param } from 'express-validator';
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
    param('search', 'El campo de search debe ser tipo string').isString(),
    param('start', 'El campo start debe ser numerico').isInt(),
    param('limit', 'El campo limit debe ser numerico').isInt(),
    param('columnOrder', 'El campo columnOrder debe ser tipo string').isString(),
    param('order', 'Los valores permitidos son ASC o DESC').isIn(['ASC', 'DESC']),
    param('idCategories').isArray().custom(validateCategories)
  ],
  getMenus
);
router.get('/:id', getMenu);
router.post(
  '/',
  [
    check('state', 'El estado debe ser un booleano valido').isBoolean(),
    check('name', 'El nombre es obligatorio').isString().notEmpty(),
    check('short_name', 'El nombre corto es obligatorio').isString().notEmpty(),
    check('price', 'El precio es obligatorio').isFloat().notEmpty(),
    check('idCategory').isInt().custom(validateCategory),
    check('ingrdients').isArray().custom(validateIngredients),
    check('idCharacteristics').isArray().custom(validateCharacteristics),
    check('garnishes').isArray().custom(validateGarnishes),
    validate_fields
  ],
  postMenu
);
router.put('/:id', putMenu);
router.delete('/:id', deleteMenu);

export default router;
