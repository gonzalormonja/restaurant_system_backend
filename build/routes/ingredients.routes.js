"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ingredients_controllers_1 = require("../controllers/ingredients.controllers");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.get('/', [
    isAuth_1.default,
    (0, express_validator_1.query)('search', 'El campo de search debe ser tipo string').isString().optional({ nullable: true }),
    (0, express_validator_1.query)('pageNumber', 'El número de página debe ser numerico').isInt().optional({ nullable: true }),
    (0, express_validator_1.query)('pageSize', 'El tamaño de página debe ser numerico').isInt().optional({ nullable: true }),
    (0, express_validator_1.query)('columnOrder', 'El campo columnOrder debe ser tipo string').isString().optional({ nullable: true }),
    (0, express_validator_1.query)('order', 'Los valores permitidos son asc o desc').isIn(['asc', 'desc', '']).optional({ nullable: true }),
    validate_fields_1.validate_fields
], ingredients_controllers_1.getIngredients);
router.get('/:id', [isAuth_1.default, (0, express_validator_1.param)('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields_1.validate_fields], ingredients_controllers_1.getIngredient);
router.post('/', [
    isAuth_1.default,
    (0, express_validator_1.body)('name', 'El nombre es obligatorio').isString().notEmpty(),
    (0, express_validator_1.body)('unit_of_measure', 'La unidad de medida es obligatoria')
        .isString()
        .isIn(['weight', 'liter', 'length', 'unit']),
    validate_fields_1.validate_fields
], ingredients_controllers_1.postIngredient);
router.put('/:id', [
    isAuth_1.default,
    (0, express_validator_1.param)('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    (0, express_validator_1.body)('name', 'El nombre debe ser de tipo string').isString().optional({ nullable: true }),
    (0, express_validator_1.body)('unit_of_measure', 'La unidad de medida debe ser de tipo string').isString().optional({ nullable: true }),
    validate_fields_1.validate_fields
], ingredients_controllers_1.putIngredient);
router.delete('/:id', [isAuth_1.default, (0, express_validator_1.param)('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields_1.validate_fields], ingredients_controllers_1.deleteIngredient);
exports.default = router;
//# sourceMappingURL=ingredients.routes.js.map