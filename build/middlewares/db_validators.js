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
const category_1 = __importDefault(require("../models/category"));
const characteristic_1 = __importDefault(require("../models/characteristic"));
const ingredient_1 = __importDefault(require("../models/ingredient"));
const product_1 = __importDefault(require("../models/product"));
exports.validateCategory = (idCategory) => __awaiter(void 0, void 0, void 0, function* () {
    if (idCategory) {
        const existCategory = yield category_1.default.findByPk(idCategory);
        if (!existCategory) {
            throw new Error(`La categoria ${idCategory} no existe`);
        }
    }
    return true;
});
exports.validateCategories = (categories) => __awaiter(void 0, void 0, void 0, function* () {
    if (categories) {
        yield Promise.all(categories.map((category) => __awaiter(void 0, void 0, void 0, function* () {
            const existcategory = yield category_1.default.findByPk(category);
            if (!existcategory) {
                throw new Error(`La categoria ${category} no existe`);
            }
        })));
    }
    return true;
});
exports.validateIngredients = (ingredients) => __awaiter(void 0, void 0, void 0, function* () {
    if (ingredients) {
        yield Promise.all(ingredients.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
            const existIngredient = yield ingredient_1.default.findByPk(ingredient.idIngredient);
            if (!existIngredient) {
                throw new Error(`El ingrediente ${ingredient.idIngredient} no existe`);
            }
        })));
    }
    return true;
});
exports.validateCharacteristics = (idCharacteristics) => __awaiter(void 0, void 0, void 0, function* () {
    if (idCharacteristics) {
        yield Promise.all(idCharacteristics.map((idCharacteristic) => __awaiter(void 0, void 0, void 0, function* () {
            const existCharacteristic = yield characteristic_1.default.findByPk(idCharacteristic);
            if (!existCharacteristic) {
                throw new Error(`La caracteristica ${idCharacteristic} no existe`);
            }
        })));
    }
    return true;
});
exports.validateGarnishes = (garnishes) => __awaiter(void 0, void 0, void 0, function* () {
    if (garnishes) {
        yield Promise.all(garnishes.map((garnish) => __awaiter(void 0, void 0, void 0, function* () {
            const existGarnish = yield product_1.default.findByPk(garnish.id);
            if (!existGarnish) {
                throw new Error(`La guarnicion ${garnish.id} no existe`);
            }
            if (!existGarnish.isGarnish) {
                throw new Error(`El product ${garnish.name} no es una guarnicion valida`);
            }
        })));
    }
    return true;
});
//# sourceMappingURL=db_validators.js.map