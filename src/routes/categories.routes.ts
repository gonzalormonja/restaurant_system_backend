import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { validate_fields } from '../middlewares/validate-fields';
import {
  deleteCategory,
  getCategories,
  getCategory,
  postCategory,
  putCategory
} from '../controllers/categories.controllers';
import isAuth from '../middlewares/isAuth';
import { validateCategories, validateCategory } from '../middlewares/db_validators';
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
  getCategories
);
router.get(
  '/:id',
  [isAuth, param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  getCategory
);
router.post(
  '/',
  [
    isAuth,
    body('name', 'El nombre es obligatorio').notEmpty(),
    query('idCategory').isNumeric().custom(validateCategory).optional({ nullable: true }),
    validate_fields
  ],
  postCategory
);
router.put(
  '/:id',
  [
    isAuth,
    param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    query('idCategory').isNumeric().custom(validateCategory).optional({ nullable: true }),
    validate_fields
  ],
  putCategory
);
router.delete(
  '/:id',
  [isAuth, param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  deleteCategory
);

export default router;
