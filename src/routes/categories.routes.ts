import { Router } from 'express';
import { check } from 'express-validator';
import { validate_fields } from '../middlewares/validate-fields';
import {
  deleteCategory,
  getCategories,
  getCategory,
  postCategory,
  putCategory
} from '../controllers/categories.controllers';
import isAuth from '../middlewares/isAuth';
const router = Router();

router.get('/', [isAuth], getCategories);
router.get('/:id', [isAuth], getCategory);
router.post('/', [isAuth, check('name', 'El nombre es obligatorio').notEmpty(), validate_fields], postCategory);
router.put('/:id', [isAuth], putCategory);
router.delete(
  '/:id',
  [isAuth, check('name', 'El nombre es obligatorio').notEmpty(), validate_fields],
  deleteCategory
);

export default router;
