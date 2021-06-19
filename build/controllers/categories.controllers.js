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
exports.deleteCategory = exports.putCategory = exports.getCategory = exports.postCategory = exports.getCategories = void 0;
const category_1 = __importDefault(require("../models/category"));
const product_1 = __importDefault(require("../models/product"));
const chage_timezone_object_1 = require("../utils/chage-timezone-object");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.findAll({
            where: { idCustomer: req['user'].idCustomer },
            include: [{ model: category_1.default }, { model: product_1.default }]
        });
        res.json(categories.map((category) => chage_timezone_object_1.changeTimezoneObject(category.toJSON(), req['tz'])));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[getCategories] Error al crear una categoria'
        });
    }
});
exports.getCategories = getCategories;
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const category = yield category_1.default.create(Object.assign(Object.assign({}, body), { idCustomer: req['user'].idCustomer }));
        chage_timezone_object_1.changeTimezoneObject(category.toJSON(), req['tz']);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[postCategory] Error al crear una categoria'
        });
    }
});
exports.postCategory = postCategory;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield category_1.default.findOne({
        where: {
            $and: [
                { id: id },
                {
                    idCustomer: req['user'].idCustomer
                }
            ]
        }
    });
    if (!category) {
        return res.status(404).json({
            msg: `No existe una categoria con el id ${id}`
        });
    }
    chage_timezone_object_1.changeTimezoneObject(category.toJSON(), req['tz']);
});
exports.getCategory = getCategory;
const putCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const category = yield category_1.default.findOne({
            where: {
                $and: [
                    { id: id },
                    {
                        idCustomer: req['user'].idCustomer
                    }
                ]
            }
        });
        if (!category) {
            return res.status(404).json({
                msg: `No existe una categoria con el id ${id}`
            });
        }
        yield category.update(body);
        chage_timezone_object_1.changeTimezoneObject(category.toJSON(), req['tz']);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[putCategory] Error al actualizar un product'
        });
    }
});
exports.putCategory = putCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_1.default.findOne({
            where: {
                $and: [
                    { id: id },
                    {
                        idCustomer: req['user'].idCustomer
                    }
                ]
            }
        });
        if (!category) {
            return res.status(404).json({
                msg: `No existe una categoria con el id ${id}`
            });
        }
        yield category.update({ state: false });
        return chage_timezone_object_1.changeTimezoneObject(category.toJSON(), req['tz']);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[deleteCategory] Error al eliminar una categoria'
        });
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categories.controllers.js.map