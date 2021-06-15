"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const characteristics_controllers_1 = require("../controllers/characteristics.controllers");
const validate_fields_1 = require("../middlewares/validate_fields");
const router = express_1.Router();
router.get('/', characteristics_controllers_1.getCharacteristics);
router.get('/:id', characteristics_controllers_1.getCharacteristic);
router.post('/', [express_validator_1.check('name', 'El nombre es obligatorio').notEmpty(), validate_fields_1.validate_fields], characteristics_controllers_1.postCharacteristic);
router.put('/:id', [express_validator_1.check('name', 'El nombre es obligatorio').notEmpty(), validate_fields_1.validate_fields], characteristics_controllers_1.putCharacteristic);
router.delete('/:id', characteristics_controllers_1.deleteCharacteristic);
exports.default = router;
//# sourceMappingURL=characteristics.routes.js.map