"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const celebrate_1 = require("celebrate");
// import routes from '../api/index';
exports.default = ({ app }) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use(cors_1.default());
    // app.use('/',routes());
    app.get('/status', (req, res) => {
        res.status(200).json({ ok: true }).end();
    });
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    /// error handlers
    app.use((err, req, res, next) => {
        console.log('express_error');
        let id = null;
        let name = null;
        let parameters = null;
        if (celebrate_1.isCelebrateError(err)) {
            err.details.forEach((value) => {
                var _a, _b, _c;
                const typeError = value.details[0].type.split('.');
                if (typeError[1] == 'required') {
                    id = 'VALIDATION_ERROR_REQUIRED';
                    name = 'VALIDATION_ERROR_REQUIRED';
                    parameters = { field: convertPath(value.details[0].path) };
                }
                else if (typeError[1] == 'empty') {
                    id = 'VALIDATION_ERROR_EMPTY';
                    name = 'VALIDATION_ERROR_EMPTY';
                    parameters = { field: convertPath(value.details[0].path) };
                }
                else if (typeError[1] == 'base') {
                    id = 'VALIDATION_ERROR_TYPE';
                    name = 'VALIDATION_ERROR_TYPE';
                    parameters = { field: convertPath(value.details[0].path), type: typeError[0] };
                }
                else if (typeError[1] == 'max') {
                    if (value.details[0].type == 'number.max') {
                        id = 'VALIDATION_ERROR_MAX_NUMBER';
                    }
                    else {
                        if (((_a = value.details[0].context) === null || _a === void 0 ? void 0 : _a.limit) <= 1) {
                            id = 'VALIDATION_ERROR_MAX1';
                        }
                        else {
                            id = 'VALIDATION_ERROR_MAX';
                        }
                    }
                    name = 'VALIDATION_ERROR_MAX';
                    parameters = { field: convertPath(value.details[0].path), max: (_b = value.details[0].context) === null || _b === void 0 ? void 0 : _b.limit };
                }
                else if (typeError[1] == 'min') {
                    if (value.details[0].type == 'number.min') {
                        id = 'VALIDATION_ERROR_MIN_NUMBER';
                    }
                    name = 'VALIDATION_ERROR_MIN_NUMBER';
                    parameters = { field: convertPath(value.details[0].path), min: (_c = value.details[0].context) === null || _c === void 0 ? void 0 : _c.limit };
                }
                else if (typeError[1] == 'pattern' && typeError[2] == 'base' && typeError[0] == 'string') {
                    if (convertPath(value.details[0].path) == 'first_letter') {
                        //revisar
                        id = 'VALIDATION_ERROR_FORMAT_FIRST_LETTER';
                        name = 'VALIDATION_ERROR_FORMAT_FIRST_LETTER';
                        parameters = { field: convertPath(value.details[0].path), format: 'hh:mm' };
                    }
                    else if (convertPath(value.details[0].path) == 'dates.date' ||
                        convertPath(value.details[0].path) == 'date_end' ||
                        convertPath(value.details[0].path) == 'date_start' ||
                        convertPath(value.details[0].path) == 'appointment_date' ||
                        convertPath(value.details[0].path) == 'birthdates') {
                        id = 'VALIDATION_ERROR_FORMAT';
                        name = 'VALIDATION_ERROR_FORMAT';
                        parameters = { field: convertPath(value.details[0].path), format: 'yyyy-mm-dd' };
                    }
                    else if (convertPath(value.details[0].path) == 'limit_date') {
                        id = 'VALIDATION_ERROR_FORMAT';
                        name = 'VALIDATION_ERROR_FORMAT';
                        parameters = { field: convertPath(value.details[0].path), format: 'yyyy-mm-dd HH:mm' };
                    }
                    else {
                        id = 'VALIDATION_ERROR_FORMAT';
                        name = 'VALIDATION_ERROR_FORMAT';
                        parameters = { field: convertPath(value.details[0].path), format: 'hh:mm' };
                    }
                }
                else if (typeError[1] == 'only') {
                    if (value.details[0].path[0] == 'modality') {
                        id = 'MODALITY_ERROR';
                        name = 'MODALITY_ERROR';
                        parameters = null;
                    }
                    else if (value.details[0].path[0] == 'type_practice') {
                        id = 'TYPE_PRACTICE_ERROR';
                        name = 'TYPE_PRACTICE_ERROR';
                        parameters = null;
                    }
                    else if (value.details[0].path[2] == 'type') {
                        id = 'TYPE_FIELD_ERROR';
                        name = 'TYPE_FIELD_ERROR';
                        parameters = null;
                    }
                }
            });
        }
        if (id && req['intl']) {
            return res.status(400).json({
                error: {
                    code: 400,
                    type: name,
                    message: id
                }
            });
        }
        else {
            console.log(err);
            res.status(err.status || 500).json({
                error: {
                    message: err
                }
            });
        }
    });
});
function convertPath(path) {
    let new_path = '';
    let i = 0;
    path.forEach((p) => {
        if (typeof p == 'string') {
            if (i < 1) {
                new_path += p;
            }
            else {
                new_path += '.' + p;
            }
        }
        i++;
    });
    return new_path;
}
//# sourceMappingURL=express.js.map