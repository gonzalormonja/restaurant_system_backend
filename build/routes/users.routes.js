"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const users_controllers_1 = require("../controllers/users.controllers");
const router = express_1.Router();
router.post('/signIn', [
    express_validator_1.body('username', 'El usuario es obligatorio').isString().notEmpty(),
    express_validator_1.body('password', 'La constraseña es obligatora').isString().notEmpty(),
    validate_fields_1.validate_fields
], users_controllers_1.signIn);
exports.default = router;
//# sourceMappingURL=users.routes.js.map