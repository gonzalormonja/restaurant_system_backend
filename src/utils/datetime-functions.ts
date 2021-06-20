import { DateTime } from 'luxon';

export const dateTimeFormat = {
  format_date_time: 'yyyy-MM-dd HH:mm',
  format_date_time_human: 'dd-MM-yyyy HH:mm',
  format_time: 'HH:mm',
  format_date: 'yyyy-MM-dd',
  format_date_human: 'dd-MM-yyyy',
  format_time_bd: 'HH:mm:ss'
};

export const default_tz = 'UTC+00:00';

export const changeTimezoneObject = (object: object, tz: string) => {
  const regExTimeDB = new RegExp(/^(([0][0-9]|[01][0-9]|2[0-3]):[0-5]([0-9]):[0-5]([0-9]))$/);
  Object.keys(object).map((field) => {
    if (object[field] instanceof Date) {
      object[field] = DateTime.fromJSDate(object[field], { zone: default_tz })
        .setZone(tz)
        .toFormat(dateTimeFormat.format_date_time);
    } else if (typeof object[field] === 'object' && object[field]) {
      object[field] = changeTimezoneObject(object[field], tz);
    } else if (regExTimeDB.test(object[field])) {
      object[field] = DateTime.fromFormat(`${object[field]}`, dateTimeFormat.format_time_bd, { zone: default_tz })
        .setZone(tz)
        .toFormat(dateTimeFormat.format_time);
    }
  });
  return object;
};

export const convert_stringHour_to_date = (field, tz) => {
  return DateTime.fromFormat(field, dateTimeFormat.format_time, { zone: tz }).setZone(default_tz).toJSDate();
};
