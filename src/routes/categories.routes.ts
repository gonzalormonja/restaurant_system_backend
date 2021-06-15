import { Router } from 'express';
import { check } from 'express-validator';
import { validate_fields } from '../middlewares/validate_fields';
import {
  deleteCategory,
  getCategories,
  getCategory,
  postCategory,
  putCategory
} from '../controllers/categories.controllers';
const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', [check('name', 'El nombre es obligatorio').notEmpty(), validate_fields], postCategory);
router.put('/:id', putCategory);
router.delete('/:id', [check('name', 'El nombre es obligatorio').notEmpty(), validate_fields], deleteCategory);

export default router;
