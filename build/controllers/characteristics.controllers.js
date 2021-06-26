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
const sequelize_1 = require("sequelize");
const characteristic_1 = __importDefault(require("../models/characteristic"));
const datetime_functions_1 = require("../utils/datetime-functions");
const getCharacteristics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characteristics = yield characteristic_1.default.findAll({
            where: { idCustomer: req['user'].idCustomer }
        });
        res.json(characteristics.map((characteristic) => datetime_functions_1.changeTimezoneObject(characteristic.toJSON(), req['tz'])));
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
        const characteristic = yield characteristic_1.default.create(Object.assign(Object.assign({}, body), { idCustomer: req['user'].idCustomer }));
        return res.json(datetime_functions_1.changeTimezoneObject(characteristic.toJSON(), req['tz']));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[postCharacteristic] Error al crear una caracteristica'
        });
    }
});
exports.postCharacteristic = postCharacteristic;
const getCharacteristic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const characteristic = yield characteristic_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { id: id },
                {
                    idCustomer: req['user'].idCustomer
                }
            ]
        }
    });
    if (!characteristic) {
        return res.status(404).json({
            msg: `No existe una caracteristica con el id ${id}`
        });
    }
    return res.json(datetime_functions_1.changeTimezoneObject(characteristic.toJSON(), req['tz']));
});
exports.getCharacteristic = getCharacteristic;
const putCharacteristic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const characteristic = yield characteristic_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { id: id },
                    {
                        idCustomer: req['user'].idCustomer
                    }
                ]
            }
        });
        if (!characteristic) {
            return res.status(404).json({
                msg: `No existe una caracteristica con el id ${id}`
            });
        }
        yield characteristic.update(body);
        return res.json(datetime_functions_1.changeTimezoneObject(characteristic.toJSON(), req['tz']));
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
        const characteristic = yield characteristic_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { id: id },
                    {
                        idCustomer: req['user'].idCustomer
                    }
                ]
            }
        });
        if (!characteristic) {
            return res.status(404).json({
                msg: `No existe una caracteristica con el id ${id}`
            });
        }
        yield characteristic.update({ state: false });
        return res.json(datetime_functions_1.changeTimezoneObject(characteristic.toJSON(), req['tz']));
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