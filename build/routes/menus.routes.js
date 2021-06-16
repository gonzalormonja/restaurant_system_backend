"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menus_controllers_1 = require("../controllers/menus.controllers");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate_fields");
const db_validators_1 = require("../middlewares/db_validators");
const router = express_1.Router();
router.get('/', [
    express_validator_1.query('search', 'El campo de search debe ser tipo string').isString().optional({ nullable: true }),
    express_validator_1.query('start', 'El campo start debe ser numerico').isInt().optional({ nullable: true }),
    express_validator_1.query('limit', 'El campo limit debe ser numerico').isInt().optional({ nullable: true }),
    express_validator_1.query('columnOrder', 'El campo columnOrder debe ser tipo string').isString().optional({ nullable: true }),
    express_validator_1.query('order', 'Los valores permitidos son ASC o DESC').isIn(['ASC', 'DESC']).optional({ nullable: true }),
    express_validator_1.query('idCategories').isArray().custom(db_validators_1.validateCategories).optional({ nullable: true }),
    validate_fields_1.validate_fields
], menus_controllers_1.getMenus);
router.get('/:id', [express_validator_1.param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields_1.validate_fields], menus_controllers_1.getMenu);
router.post('/', [
    express_validator_1.body('state', 'El estado debe ser un booleano valido').isBoolean().optional({ nullable: true }),
    express_validator_1.body('name', 'El nombre es obligatorio').isString().notEmpty(),
    express_validator_1.body('short_name', 'El nombre corto es obligatorio').isString().notEmpty(),
    express_validator_1.body('price', 'El precio es obligatorio').isFloat().notEmpty(),
    express_validator_1.body('idCategory').isInt().custom(db_validators_1.validateCategory).optional({ nullable: true }),
    express_validator_1.body('ingrdients').isArray().custom(db_validators_1.validateIngredients).optional({ nullable: true }),
    express_validator_1.body('idCharacteristics').isArray().custom(db_validators_1.validateCharacteristics).optional({ nullable: true }),
    express_validator_1.body('garnishes').isArray().custom(db_validators_1.validateGarnishes).optional({ nullable: true }),
    validate_fields_1.validate_fields
], menus_controllers_1.postMenu);
router.patch('/:id', [
    express_validator_1.param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(),
    express_validator_1.body('state', 'El estado debe ser un booleano valido').isBoolean().optional({ nullable: true }),
    express_validator_1.body('name', 'El nombre es obligatorio').isString().optional({ nullable: true }),
    express_validator_1.body('short_name', 'El nombre corto es obligatorio').isString().optional({ nullable: true }),
    express_validator_1.body('price', 'El precio debe ser de tipo numerico').isFloat().optional({ nullable: true }),
    express_validator_1.body('idCategory').isInt().custom(db_validators_1.validateCategory).optional({ nullable: true }),
    express_validator_1.body('ingrdients').isArray().custom(db_validators_1.validateIngredients).optional({ nullable: true }),
    express_validator_1.body('idCharacteristics').isArray().custom(db_validators_1.validateCharacteristics).optional({ nullable: true }),
    express_validator_1.body('garnishes').isArray().custom(db_validators_1.validateGarnishes).optional({ nullable: true }),
    validate_fields_1.validate_fields
], menus_controllers_1.patchMenu);
router.delete('/:id', [express_validator_1.param('id', 'El id debe ser de tipo numerico y es obligatorio').isInt().notEmpty(), validate_fields_1.validate_fields], menus_controllers_1.deleteMenu);
exports.default = router;
//# sourceMappingURL=menus.routes.js.map