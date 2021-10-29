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
exports.deleteTimeOfDay = exports.putTimeOfDay = exports.getTimeOfDay = exports.postTimeOfDay = exports.getTimesOfDay = void 0;
const sequelize_1 = require("sequelize");
const timesOfDay_1 = __importDefault(require("../models/timesOfDay"));
const datetime_functions_1 = require("../utils/datetime-functions");
const getTimesOfDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timesOfDay = yield timesOfDay_1.default.findAll({
            where: { idCustomer: req['user'].idCustomer }
        });
        res.json(timesOfDay.map((timeOfDay) => (0, datetime_functions_1.changeTimezoneObject)(timeOfDay.toJSON(), req['tz'])));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[getTimesOfDay] Error al obtener los periodos del día'
        });
    }
});
exports.getTimesOfDay = getTimesOfDay;
const postTimeOfDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const timeOfDay = yield timesOfDay_1.default.create(Object.assign(Object.assign({}, body), { hour_start: (0, datetime_functions_1.convert_stringHour_to_date)(body['hour_start'], req['tz']), hour_end: (0, datetime_functions_1.convert_stringHour_to_date)(body['hour_end'], req['tz']), idCustomer: req['user'].idCustomer }));
        (0, datetime_functions_1.changeTimezoneObject)(timeOfDay.toJSON(), req['tz']);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[postTimeOfDay] Error al crear un periodo del día'
        });
    }
});
exports.postTimeOfDay = postTimeOfDay;
const getTimeOfDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const timeOfDay = yield timesOfDay_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { id: id },
                {
                    idCustomer: req['user'].idCustomer
                }
            ]
        }
    });
    if (!timeOfDay) {
        return res.status(404).json({
            msg: `No existe un periodo del día con el id ${id}`
        });
    }
    (0, datetime_functions_1.changeTimezoneObject)(timeOfDay.toJSON(), req['tz']);
});
exports.getTimeOfDay = getTimeOfDay;
const putTimeOfDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const timeOfDay = yield timesOfDay_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { id: id },
                    {
                        idCustomer: req['user'].idCustomer
                    }
                ]
            }
        });
        if (!timeOfDay) {
            return res.status(404).json({
                msg: `No existe un periodo del día con el id ${id}`
            });
        }
        yield timeOfDay.update(body);
        (0, datetime_functions_1.changeTimezoneObject)(timeOfDay.toJSON(), req['tz']);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[putTimeOfDay] Error al actualizar un product'
        });
    }
});
exports.putTimeOfDay = putTimeOfDay;
const deleteTimeOfDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const timeOfDay = yield timesOfDay_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { id: id },
                    {
                        idCustomer: req['user'].idCustomer
                    }
                ]
            }
        });
        if (!timeOfDay) {
            return res.status(404).json({
                msg: `No existe un periodo del día con el id ${id}`
            });
        }
        yield timeOfDay.update({ state: false });
        return (0, datetime_functions_1.changeTimezoneObject)(timeOfDay.toJSON(), req['tz']);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[deleteTimeOfDay] Error al eliminar un periodo del día'
        });
    }
});
exports.deleteTimeOfDay = deleteTimeOfDay;
//# sourceMappingURL=timesOfDay.controllers.js.map