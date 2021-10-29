"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const characteristics_controllers_1 = require("../controllers/characteristics.controllers");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.get('/', [isAuth_1.default], characteristics_controllers_1.getCharacteristics);
router.get('/:id', [isAuth_1.default], characteristics_controllers_1.getCharacteristic);
router.post('/', [isAuth_1.default, (0, express_validator_1.check)('name', 'El nombre es obligatorio').notEmpty(), validate_fields_1.validate_fields], characteristics_controllers_1.postCharacteristic);
router.put('/:id', [isAuth_1.default, (0, express_validator_1.check)('name', 'El nombre es obligatorio').notEmpty(), validate_fields_1.validate_fields], characteristics_controllers_1.putCharacteristic);
router.delete('/:id', [isAuth_1.default], characteristics_controllers_1.deleteCharacteristic);
exports.default = router;
//# sourceMappingURL=characteristics.routes.js.map