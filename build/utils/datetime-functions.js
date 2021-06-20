"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert_stringHour_to_date = exports.changeTimezoneObject = exports.default_tz = exports.dateTimeFormat = void 0;
const luxon_1 = require("luxon");
exports.dateTimeFormat = {
    format_date_time: 'yyyy-MM-dd HH:mm',
    format_date_time_human: 'dd-MM-yyyy HH:mm',
    format_time: 'HH:mm',
    format_date: 'yyyy-MM-dd',
    format_date_human: 'dd-MM-yyyy',
    format_time_bd: 'HH:mm:ss'
};
exports.default_tz = 'UTC+00:00';
const changeTimezoneObject = (object, tz) => {
    const regExTimeDB = new RegExp(/^(([0][0-9]|[01][0-9]|2[0-3]):[0-5]([0-9]):[0-5]([0-9]))$/);
    Object.keys(object).map((field) => {
        if (object[field] instanceof Date) {
            object[field] = luxon_1.DateTime.fromJSDate(object[field], { zone: exports.default_tz })
                .setZone(tz)
                .toFormat(exports.dateTimeFormat.format_date_time);
        }
        else if (typeof object[field] === 'object' && object[field]) {
            object[field] = exports.changeTimezoneObject(object[field], tz);
        }
        else if (regExTimeDB.test(object[field])) {
            object[field] = luxon_1.DateTime.fromFormat(`${object[field]}`, exports.dateTimeFormat.format_time_bd, { zone: exports.default_tz })
                .setZone(tz)
                .toFormat(exports.dateTimeFormat.format_time);
        }
    });
    return object;
};
exports.changeTimezoneObject = changeTimezoneObject;
const convert_stringHour_to_date = (field, tz) => {
    return luxon_1.DateTime.fromFormat(field, exports.dateTimeFormat.format_time, { zone: tz }).setZone(exports.default_tz).toJSDate();
};
exports.convert_stringHour_to_date = convert_stringHour_to_date;
//# sourceMappingURL=datetime-functions.js.map