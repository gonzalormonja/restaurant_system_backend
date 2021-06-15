import { Router } from 'express';
import { check } from 'express-validator';
import {
  deleteCharacteristic,
  getCharacteristic,
  getCharacteristics,
  postCharacteristic,
  putCharacteristic
} from '../../controllers/characteristics.controllers';
import { validate_fields } from '../../middlewares/validate_fields';
const router = Router();

router.get('/', getCharacteristics);
router.get('/:id', getCharacteristic);
router.post('/', [check('name', 'El nombre es obligatorio').notEmpty(), validate_fields], postCharacteristic);
router.put('/:id', [check('name', 'El nombre es obligatorio').notEmpty(), validate_fields], putCharacteristic);
router.delete('/:id', deleteCharacteristic);

export default router;
