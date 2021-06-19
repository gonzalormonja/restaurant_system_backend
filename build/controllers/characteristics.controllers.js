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
exports.deleteCharacteristic = exports.putCharacteristic = exports.getCharacteristic = exports.postCharacteristic = exports.getCharacteristics = void 0;
const characteristic_1 = __importDefault(require("../models/characteristic"));
const getCharacteristics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characteristics = yield characteristic_1.default.findAll({
            where: { idCustomer: req['user'].idCustomer }
        });
        res.json(characteristics);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[getCharacteristics] Error al crear una caracteristica'
        });
    }
});
exports.getCharacteristics = getCharacteristics;
const postCharacteristic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const category = yield characteristic_1.default.create(Object.assign(Object.assign({}, body), { idCustomer: req['user'].idCustomer }));
        res.json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[postCharacteristic] Error al crear una caracteristica'
        });
    }
});
exports.postCharacteristic = postCharacteristic;
const getCharacteristic = (req, res) => {
    const { id } = req.params;
    const category = characteristic_1.default.findOne({
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
            msg: `No existe una caracteristica con el id ${id}`
        });
    }
    res.json(category);
};
exports.getCharacteristic = getCharacteristic;
const putCharacteristic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const category = yield characteristic_1.default.findOne({
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
                msg: `No existe una caracteristica con el id ${id}`
            });
        }
        yield category.update(body);
        res.json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[putCharacteristic] Error al actualizar un product'
        });
    }
});
exports.putCharacteristic = putCharacteristic;
const deleteCharacteristic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield characteristic_1.default.findOne({
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
                msg: `No existe una caracteristica con el id ${id}`
            });
        }
        yield category.update({ state: false });
        return res.json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[deleteCharacteristic] Error al eliminar una caracteristica'
        });
    }
});
exports.deleteCharacteristic = deleteCharacteristic;
//# sourceMappingURL=characteristics.controllers.js.map