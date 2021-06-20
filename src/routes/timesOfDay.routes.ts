import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate_fields, validate_time } from '../middlewares/validate-fields';
import {
  deleteTimeOfDay,
  getTimeOfDay,
  getTimesOfDay,
  postTimeOfDay,
  putTimeOfDay
} from '../controllers/timesOfDay.controllers';
import isAuth from '../middlewares/isAuth';
const router = Router();

router.get('/', [isAuth], getTimesOfDay);
router.get('/:id', [isAuth], getTimeOfDay);
router.post(
  '/',
  [
    isAuth,
    body('hour_start')
      .isString()
      .custom((input) => validate_time(input, 'hour_start')),
    body('hour_end')
      .isString()
      .custom((input) => validate_time(input, 'hour_end')),
    body('name', 'El nombre es obligatorio').notEmpty(),
    validate_fields
  ],
  postTimeOfDay
);
router.put(
  '/:id',
  [
    isAuth,
    param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    body('hour_start')
      .isString()
      .custom((input) => validate_time(input, 'hour_start')),
    body('hour_end')
      .isString()
      .custom((input) => validate_time(input, 'hour_end')),
    body('name', 'El nombre es obligatorio').notEmpty(),
    validate_fields
  ],
  putTimeOfDay
);
router.delete(
  '/:id',
  [isAuth, param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields],
  deleteTimeOfDay
);

export default router;
