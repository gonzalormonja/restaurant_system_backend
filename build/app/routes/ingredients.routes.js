"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ingredients_controllers_1 = require("../../controllers/ingredients.controllers");
const validate_fields_1 = require("../../middlewares/validate_fields");
const router = express_1.Router();
router.get('/', ingredients_controllers_1.getIngredients);
router.get('/:id', ingredients_controllers_1.getIngredient);
router.post('/', [express_validator_1.check('name', 'El nombre es obligatorio').notEmpty(), validate_fields_1.validate_fields], ingredients_controllers_1.postIngredient);
router.put('/:id', [express_validator_1.check('name', 'El nombre es obligatorio').notEmpty(), validate_fields_1.validate_fields], ingredients_controllers_1.putIngredient);
router.delete('/:id', ingredients_controllers_1.deleteIngredient);
exports.default = router;
//# sourceMappingURL=ingredients.routes.js.map