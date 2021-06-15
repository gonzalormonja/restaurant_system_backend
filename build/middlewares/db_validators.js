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
exports.validateCharacteristics = exports.validateIngredients = exports.validateCategory = void 0;
const category_1 = __importDefault(require("../models/category"));
const characteristic_1 = __importDefault(require("../models/characteristic"));
const ingredient_1 = __importDefault(require("../models/ingredient"));
const validateCategory = (idCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const existCategory = yield category_1.default.findByPk(idCategory);
    if (!existCategory) {
        throw new Error(`La categoria ${idCategory} no existe`);
    }
});
exports.validateCategory = validateCategory;
const validateIngredients = (idIngredients) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(idIngredients.map((idIngredient) => __awaiter(void 0, void 0, void 0, function* () {
        const existIngredient = yield ingredient_1.default.findByPk(idIngredient);
        if (!existIngredient) {
            throw new Error(`El ingrediente ${idIngredient} no existe`);
        }
    })));
});
exports.validateIngredients = validateIngredients;
const validateCharacteristics = (idCharacteristics) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(idCharacteristics.map((idCharacteristic) => __awaiter(void 0, void 0, void 0, function* () {
        const existCharacteristic = yield characteristic_1.default.findByPk(idCharacteristic);
        if (!existCharacteristic) {
            throw new Error(`La caracteristica ${idCharacteristic} no existe`);
        }
    })));
});
exports.validateCharacteristics = validateCharacteristics;
//# sourceMappingURL=db_validators.js.map