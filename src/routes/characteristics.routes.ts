import { Router } from 'express';
import { check } from 'express-validator';
import {
  deleteCharacteristic,
  getCharacteristic,
  getCharacteristics,
  postCharacteristic,
  putCharacteristic
} from '../controllers/characteristics.controllers';
import isAuth from '../middlewares/isAuth';
import { validate_fields } from '../middlewares/validate-fields';
const router = Router();

router.get('/', [isAuth], getCharacteristics);
router.get('/:id', [isAuth], getCharacteristic);
router.post(
  '/',
  [isAuth, check('name', 'El nombre es obligatorio').notEmpty(), validate_fields],
  postCharacteristic
);
router.put(
  '/:id',
  [isAuth, check('name', 'El nombre es obligatorio').notEmpty(), validate_fields],
  putCharacteristic
);
router.delete('/:id', [isAuth], deleteCharacteristic);

export default router;
