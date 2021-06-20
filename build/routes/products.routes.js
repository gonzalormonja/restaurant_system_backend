"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controllers_1 = require("../controllers/products.controllers");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const db_validators_1 = require("../middlewares/db_validators");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = express_1.Router();
router.get('/', [
    isAuth_1.default,
    express_validator_1.query('search', 'El campo de search debe ser tipo string').isString().optional({ nullable: true }),
    express_validator_1.query('start', 'El campo start debe ser numerico').isInt().optional({ nullable: true }),
    express_validator_1.query('limit', 'El campo limit debe ser numerico').isInt().optional({ nullable: true }),
    express_validator_1.query('columnOrder', 'El campo columnOrder debe ser tipo string').isString().optional({ nullable: true }),
    express_validator_1.query('order', 'Los valores permitidos son ASC o DESC').isIn(['ASC', 'DESC']).optional({ nullable: true }),
    express_validator_1.query('idCategories').isArray().custom(db_validators_1.validateCategories).optional({ nullable: true }),
    validate_fields_1.validate_fields
], products_controllers_1.getProducts);
router.get('/:id', [isAuth_1.default, express_validator_1.param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields_1.validate_fields], products_controllers_1.getProduct);
router.post('/', [
    isAuth_1.default,
    express_validator_1.body('state', 'El estado debe ser un booleano valido').isBoolean().optional({ nullable: true }),
    express_validator_1.body('name', 'El nombre es obligatorio').isString().notEmpty(),
    express_validator_1.body('short_name', 'El nombre corto es obligatorio').isString().notEmpty(),
    express_validator_1.body('price', 'El precio es obligatorio').isFloat().notEmpty(),
    express_validator_1.body('approximate_delay_minutes', 'El approximate_delay_minutes debe ser un entero valido')
        .isInt()
        .optional({ nullable: true }),
    express_validator_1.body('idCategory').isInt().custom(db_validators_1.validateCategory).optional({ nullable: true }),
    express_validator_1.body('ingrdients').isArray().custom(db_validators_1.validateIngredients).optional({ nullable: true }),
    express_validator_1.body('idCharacteristics').isArray().custom(db_validators_1.validateCharacteristics).optional({ nullable: true }),
    express_validator_1.body('garnishes').isArray().custom(db_validators_1.validateGarnishes).optional({ nullable: true }),
    validate_fields_1.validate_fields
], products_controllers_1.postProduct);
router.patch('/:id', [
    isAuth_1.default,
    express_validator_1.param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    express_validator_1.body('state', 'El estado debe ser un booleano valido').isBoolean().optional({ nullable: true }),
    express_validator_1.body('name', 'El nombre es obligatorio').isString().optional({ nullable: true }),
    express_validator_1.body('short_name', 'El nombre corto es obligatorio').isString().optional({ nullable: true }),
    express_validator_1.body('price', 'El precio debe ser de tipo numerico').isFloat().optional({ nullable: true }),
    express_validator_1.body('approximate_delay_minutes', 'El approximate_delay_minutes debe ser un entero valido')
        .isInt()
        .optional({ nullable: true }),
    express_validator_1.body('idCategory').isInt().custom(db_validators_1.validateCategory).optional({ nullable: true }),
    express_validator_1.body('ingrdients').isArray().custom(db_validators_1.validateIngredients).optional({ nullable: true }),
    express_validator_1.body('idCharacteristics').isArray().custom(db_validators_1.validateCharacteristics).optional({ nullable: true }),
    express_validator_1.body('garnishes').isArray().custom(db_validators_1.validateGarnishes).optional({ nullable: true }),
    validate_fields_1.validate_fields
], products_controllers_1.patchProduct);
router.delete('/:id', [isAuth_1.default, express_validator_1.param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields_1.validate_fields], products_controllers_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=products.routes.js.map