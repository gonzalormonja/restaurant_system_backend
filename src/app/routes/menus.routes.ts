import { Router } from 'express';
import { deleteMenu, getMenu, getMenus, postMenu, putMenu } from '../../controllers/menus.controllers';
import { check } from 'express-validator';
import { validate_fields } from '../../middlewares/validate_fields';
const router = Router();

router.get('/', getMenus);
router.get('/:id', getMenu);

router.post(
  '/',
  [
    check('state', 'El estado debe ser un booleano valido').isBoolean(),
    check('maximum_of_flavors', 'La cantidad minima de sabores es 1').isLength({ min: 1 }),
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('short_name', 'El nombre corto es obligatorio').notEmpty(),
    validate_fields
  ],
  postMenu
);

router.put('/:id', putMenu);
router.delete('/:id', deleteMenu);

export default router;
