"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menus_controllers_1 = require("../../controllers/menus.controllers");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../../middlewares/validate_fields");
const router = express_1.Router();
router.get('/', menus_controllers_1.getMenus);
router.get('/:id', menus_controllers_1.getMenu);
router.post('/', [
    express_validator_1.check('state', 'El estado debe ser un booleano valido').isBoolean(),
    express_validator_1.check('maximum_of_flavors', 'La cantidad minima de sabores es 1').isLength({ min: 1 }),
    express_validator_1.check('name', 'El nombre es obligatorio').notEmpty(),
    express_validator_1.check('short_name', 'El nombre corto es obligatorio').notEmpty(),
    validate_fields_1.validate_fields
], menus_controllers_1.postMenu);
router.put('/:id', menus_controllers_1.putMenu);
router.delete('/:id', menus_controllers_1.deleteMenu);
exports.default = router;
//# sourceMappingURL=menus.routes%20copy.js.map