"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_time = exports.validate_fields = void 0;
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
const validate_time = (field, fieldName) => {
    const time_regExp = new RegExp(/^(([0][0-9]|[01][0-9]|2[0-3]):[0-5]([0-9]))$/);
    if (!time_regExp.test(field)) {
        throw new Error(`El campo ${fieldName} no posee el formato correcto. Formato requerido HH:ii`);
    }
    return true;
};
exports.validate_time = validate_time;
//# sourceMappingURL=validate-fields.js.map