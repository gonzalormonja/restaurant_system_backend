"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTimezoneObject = void 0;
const luxon_1 = require("luxon");
const datetime_functions_1 = require("./datetime-functions");
const changeTimezoneObject = (object, tz) => {
    Object.keys(object).map((field) => {
        if (object[field] instanceof Date) {
            object[field] = luxon_1.DateTime.fromJSDate(object[field], { zone: datetime_functions_1.default_tz })
                .setZone(tz)
                .toFormat(datetime_functions_1.dateTimeFormat.format_date_time);
            console.log('aca');
        }
        else if (typeof object[field] === 'object' && object[field]) {
            object[field] = exports.changeTimezoneObject(object[field], tz);
        }
    });
    return object;
};
exports.changeTimezoneObject = changeTimezoneObject;
//# sourceMappingURL=chage-timezone-object.js.map