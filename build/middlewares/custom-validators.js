"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTime = void 0;
const validateTime = (field, fieldName) => {
    const time_regExp = new RegExp(/^(([0][0-9]|[01][0-9]|2[0-3]):[0-5]([0-9]))$/);
    if (!time_regExp.test(field)) {
        throw new Error(`El campo ${fieldName} no posee el formato correcto. Formato requerido HH:ii`);
    }
};
exports.validateTime = validateTime;
//# sourceMappingURL=custom-validators.js.map