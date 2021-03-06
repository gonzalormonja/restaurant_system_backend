"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const categories_controllers_1 = require("../controllers/categories.controllers");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const db_validators_1 = require("../middlewares/db_validators");
const router = (0, express_1.Router)();
router.get('/', [
    isAuth_1.default,
    (0, express_validator_1.query)('search', 'El campo de search debe ser tipo string').isString().optional({ nullable: true }),
    (0, express_validator_1.query)('pageNumber', 'El número de página debe ser numerico').isInt().optional({ nullable: true }),
    (0, express_validator_1.query)('pageSize', 'El tamaño de página debe ser numerico').isInt().optional({ nullable: true }),
    (0, express_validator_1.query)('columnOrder', 'El campo columnOrder debe ser tipo string').isString().optional({ nullable: true }),
    (0, express_validator_1.query)('order', 'Los valores permitidos son asc o desc').isIn(['asc', 'desc', '']).optional({ nullable: true }),
    (0, express_validator_1.query)('idCategories').isArray().custom(db_validators_1.validateCategories).optional({ nullable: true }),
    validate_fields_1.validate_fields
], categories_controllers_1.getCategories);
router.get('/:id', [isAuth_1.default, (0, express_validator_1.param)('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields_1.validate_fields], categories_controllers_1.getCategory);
router.post('/', [
    isAuth_1.default,
    (0, express_validator_1.body)('name', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.query)('idCategory').isNumeric().custom(db_validators_1.validateCategory).optional({ nullable: true }),
    validate_fields_1.validate_fields
], categories_controllers_1.postCategory);
router.put('/:id', [
    isAuth_1.default,
    (0, express_validator_1.param)('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    (0, express_validator_1.query)('idCategory').isNumeric().custom(db_validators_1.validateCategory).optional({ nullable: true }),
    validate_fields_1.validate_fields
], categories_controllers_1.putCategory);
router.delete('/:id', [isAuth_1.default, (0, express_validator_1.param)('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields_1.validate_fields], categories_controllers_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categories.routes.js.map