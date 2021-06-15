"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../../middlewares/validate_fields");
const categories_controllers_1 = require("../../controllers/categories.controllers");
const router = express_1.Router();
router.get('/', categories_controllers_1.getCategories);
router.get('/:id', categories_controllers_1.getCategory);
router.post('/', [express_validator_1.check('name', 'El nombre es obligatorio').notEmpty(), validate_fields_1.validate_fields], categories_controllers_1.postCategory);
router.put('/:id', categories_controllers_1.putCategory);
router.delete('/:id', categories_controllers_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categories.routes.js.map