"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_fields = void 0;
const express_validator_1 = require("express-validator");
const validate_fields = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validate_fields = validate_fields;
//# sourceMappingURL=validate_fields.js.map