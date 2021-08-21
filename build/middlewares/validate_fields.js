"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.validate_fields = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
//# sourceMappingURL=validate_fields.js.map