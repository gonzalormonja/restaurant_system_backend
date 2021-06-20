"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate_fields");
const categories_controllers_1 = require("../controllers/categories.controllers");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = express_1.Router();
router.get('/', [isAuth_1.default], categories_controllers_1.getCategories);
router.get('/:id', [isAuth_1.default], categories_controllers_1.getCategory);
router.post('/', [isAuth_1.default, express_validator_1.check('name', 'El nombre es obligatorio').notEmpty(), validate_fields_1.validate_fields], categories_controllers_1.postCategory);
router.put('/:id', [isAuth_1.default], categories_controllers_1.putCategory);
router.delete('/:id', [isAuth_1.default, express_validator_1.check('name', 'El nombre es obligatorio').notEmpty(), validate_fields_1.validate_fields], categories_controllers_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categories.routes%20copy.js.map