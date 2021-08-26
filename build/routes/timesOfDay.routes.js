"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const timesOfDay_controllers_1 = require("../controllers/timesOfDay.controllers");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = express_1.Router();
router.get('/', [isAuth_1.default], timesOfDay_controllers_1.getTimesOfDay);
router.get('/:id', [isAuth_1.default], timesOfDay_controllers_1.getTimeOfDay);
router.post('/', [
    isAuth_1.default,
    express_validator_1.body('hour_start')
        .isString()
        .custom((input) => validate_fields_1.validate_time(input, 'hour_start')),
    express_validator_1.body('hour_end')
        .isString()
        .custom((input) => validate_fields_1.validate_time(input, 'hour_end')),
    express_validator_1.body('name', 'El nombre es obligatorio').notEmpty(),
    validate_fields_1.validate_fields
], timesOfDay_controllers_1.postTimeOfDay);
router.put('/:id', [
    isAuth_1.default,
    express_validator_1.param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    express_validator_1.body('hour_start')
        .isString()
        .custom((input) => validate_fields_1.validate_time(input, 'hour_start')),
    express_validator_1.body('hour_end')
        .isString()
        .custom((input) => validate_fields_1.validate_time(input, 'hour_end')),
    express_validator_1.body('name', 'El nombre es obligatorio').notEmpty(),
    validate_fields_1.validate_fields
], timesOfDay_controllers_1.putTimeOfDay);
router.delete('/:id', [isAuth_1.default, express_validator_1.param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields_1.validate_fields], timesOfDay_controllers_1.deleteTimeOfDay);
exports.default = router;
//# sourceMappingURL=timesOfDay.routes.js.map