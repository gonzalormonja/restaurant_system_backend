import { Router } from 'express';
import { deleteMenu, getMenu, getMenus, postMenu, putMenu } from '../controllers/menus.controllers';
import { check } from 'express-validator';
import { validate_fields } from '../middlewares/validate_fields';
import {
  validateCategory,
  validateCharacteristics,
  validateGarnishes,
  validateIngredients
} from '../middlewares/db_validators';
const router = Router();

router.get('/', getMenus);
router.get('/:id', getMenu);
router.post(
  '/',
  [
    check('state', 'El estado debe ser un booleano valido').isBoolean(),
    check('name', 'El nombre es obligatorio').isString().notEmpty(),
    check('short_name', 'El nombre corto es obligatorio').isString().notEmpty(),
    check('price', 'El precio es obligatorio').isFloat().notEmpty(),
    check('idCategory').custom(validateCategory),
    check('ingrdients').custom(validateIngredients),
    check('idCharacteristics').custom(validateCharacteristics),
    check('garnishes').custom(validateGarnishes),
    validate_fields
  ],
  postMenu
);
router.put('/:id', putMenu);
router.delete('/:id', deleteMenu);

export default router;
