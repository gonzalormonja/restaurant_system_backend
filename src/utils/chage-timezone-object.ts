import { DateTime } from 'luxon';
import { dateTimeFormat, default_tz } from './datetime-functions';
export const changeTimezoneObject = (object: object, tz: string) => {
  Object.keys(object).map((field) => {
    if (object[field] instanceof Date) {
      object[field] = DateTime.fromJSDate(object[field], { zone: default_tz })
        .setZone(tz)
        .toFormat(dateTimeFormat.format_date_time);
      console.log('aca');
    } else if (typeof object[field] === 'object' && object[field]) {
      object[field] = changeTimezoneObject(object[field], tz);
    }
  });
  return object;
};
