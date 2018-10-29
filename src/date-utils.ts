// the following function is based on https://github.com/date-fns/date-fns/blob/master/src/toDate/index.js
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;

const patterns = {
    dateTimeDelimeter: /[T ]/,
    plainTime: /:/,
    timeZoneDelimeter: /[Z ]/i,

    // year tokens
    YY: /^(\d{2})$/,
    YYY: [
        /^([+-]\d{2})$/, // 0 additional digits
        /^([+-]\d{3})$/, // 1 additional digit
        /^([+-]\d{4})$/ // 2 additional digits
    ],
    YYYY: /^(\d{4})/,
    YYYYY: [
        /^([+-]\d{4})/, // 0 additional digits
        /^([+-]\d{5})/, // 1 additional digit
        /^([+-]\d{6})/ // 2 additional digits
    ],

    // date tokens
    MM: /^-(\d{2})$/,
    // tslint:disable-next-line:object-literal-sort-keys
    DDD: /^-?(\d{3})$/,
    MMDD: /^-?(\d{2})-?(\d{2})$/,
    Www: /^-?W(\d{2})$/,
    WwwD: /^-?W(\d{2})-?(\d{1})$/,

    HH: /^(\d{2}([.,]\d*)?)$/,
    HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
    HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,

    // timezone tokens
    timezone: /([Z+-].*)$/,
    timezoneZ: /^(Z)$/,
    timezoneHH: /^([+-])(\d{2})$/,
    timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 * If the function cannot parse the string or the values are invalid, it returns Invalid Date.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|String|Number} argument - the value to convert
 */
export default function toDate(argument) {
    if (argument === null) {
        return new Date(NaN);
    }

    const additionalDigits = 2;

    // Clone the date
    if (argument instanceof Date ||
        (typeof argument === 'object' && Object.prototype.toString.call(argument) === '[object Date]')
    ) {
        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new Date(argument.getTime());
    } else if (typeof argument === 'number' || Object.prototype.toString.call(argument) === '[object Number]') {
        return new Date(argument);
    } else if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
        return new Date(NaN);
    }

    const dateStrings: any = splitDateString(argument);

    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    const year = parseYearResult.year;
    const restDateString = parseYearResult.restDateString;

    const date = parseDate(restDateString, year);

    if (isNaN(date)) {
        return new Date(NaN);
    }

    if (date) {
        const timestamp = date.getTime();
        let time = 0;
        let offset;

        if (dateStrings.time) {
            time = parseTime(dateStrings.time);

            if (isNaN(time)) {
                return new Date(NaN);
            }
        }

        if (dateStrings.timezone) {
            offset = parseTimezone(dateStrings.timezone);
            if (isNaN(offset)) {
                return new Date(NaN);
            }
        } else {
            // get offset accurate to hour in timezones that change offset
            offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time));
            offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time + offset));
        }

        return new Date(timestamp + time + offset);
    } else {
        return new Date(NaN);
    }
}

function getTimezoneOffsetInMilliseconds(dirtyDate) {
    const date = new Date(dirtyDate.getTime());
    const baseTimezoneOffset = date.getTimezoneOffset();
    date.setSeconds(0, 0);
    const millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE;

    return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;
}

function splitDateString(dateString) {
    const dateStrings: any = {};
    const array = dateString.split(patterns.dateTimeDelimeter);
    let timeString;

    if (patterns.plainTime.test(array[0])) {
        dateStrings.date = null;
        timeString = array[0];
    } else {
        dateStrings.date = array[0];
        timeString = array[1];
        if (patterns.timeZoneDelimeter.test(dateStrings.date)) {
            dateStrings.date = dateString.split(patterns.timeZoneDelimeter)[0];
            timeString = dateString.substr(dateStrings.date.length, dateString.length);
        }
    }

    if (timeString) {
        const token = patterns.timezone.exec(timeString);
        if (token) {
            dateStrings.time = timeString.replace(token[1], '');
            dateStrings.timezone = token[1];
        } else {
            dateStrings.time = timeString;
        }
    }

    return dateStrings;
}

function parseYear(dateString, additionalDigits) {
    const patternYYY = patterns.YYY[additionalDigits];
    const patternYYYYY = patterns.YYYYY[additionalDigits];

    let token;

    // YYYY or ±YYYYY
    token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
    if (token) {
        const yearString = token[1];
        return {
            restDateString: dateString.slice(yearString.length),
            year: parseInt(yearString, 10)
        };
    }

    // YY or ±YYY
    token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);
    if (token) {
        const centuryString = token[1];
        return {
            restDateString: dateString.slice(centuryString.length),
            year: parseInt(centuryString, 10) * 100
        };
    }

    // Invalid ISO-formatted year
    return {
        year: null
    };
}

function parseDate(dateString, year) {
    // Invalid ISO-formatted year
    if (year === null) {
        return null;
    }

    let token;
    let date;
    let month;
    let week;

    // YYYY
    if (dateString.length === 0) {
        date = new Date(0);
        date.setUTCFullYear(year);
        return date;
    }

    // YYYY-MM
    token = patterns.MM.exec(dateString);
    if (token) {
        date = new Date(0);
        month = parseInt(token[1], 10) - 1;

        if (!validateDate(year, month)) {
            return new Date(NaN);
        }

        date.setUTCFullYear(year, month);
        return date;
    }

    // YYYY-DDD or YYYYDDD
    token = patterns.DDD.exec(dateString);
    if (token) {
        date = new Date(0);
        const dayOfYear = parseInt(token[1], 10);

        if (!validateDayOfYearDate(year, dayOfYear)) {
            return new Date(NaN);
        }

        date.setUTCFullYear(year, 0, dayOfYear);
        return date;
    }

    // YYYY-MM-DD or YYYYMMDD
    token = patterns.MMDD.exec(dateString);
    if (token) {
        date = new Date(0);
        month = parseInt(token[1], 10) - 1;
        const day = parseInt(token[2], 10);

        if (!validateDate(year, month, day)) {
            return new Date(NaN);
        }

        date.setUTCFullYear(year, month, day);
        return date;
    }

    // YYYY-Www or YYYYWww
    token = patterns.Www.exec(dateString);
    if (token) {
        week = parseInt(token[1], 10) - 1;

        if (!validateWeekDate(year, week)) {
            return new Date(NaN);
        }

        return dayOfISOWeekYear(year, week);
    }

    // YYYY-Www-D or YYYYWwwD
    token = patterns.WwwD.exec(dateString);
    if (token) {
        week = parseInt(token[1], 10) - 1;
        const dayOfWeek = parseInt(token[2], 10) - 1;

        if (!validateWeekDate(year, week, dayOfWeek)) {
            return new Date(NaN);
        }

        return dayOfISOWeekYear(year, week, dayOfWeek);
    }

    // Invalid ISO-formatted date
    return null;
}

function parseTime(timeString) {
    let token;
    let hours;
    let minutes;

    // hh
    token = patterns.HH.exec(timeString);
    if (token) {
        hours = parseFloat(token[1].replace(',', '.'));

        if (!validateTime(hours)) {
            return NaN;
        }

        return (hours % 24) * MILLISECONDS_IN_HOUR;
    }

    // hh:mm or hhmm
    token = patterns.HHMM.exec(timeString);
    if (token) {
        hours = parseInt(token[1], 10);
        minutes = parseFloat(token[2].replace(',', '.'));

        if (!validateTime(hours, minutes)) {
            return NaN;
        }

        return (hours % 24) * MILLISECONDS_IN_HOUR +
            minutes * MILLISECONDS_IN_MINUTE;
    }

    // hh:mm:ss or hhmmss
    token = patterns.HHMMSS.exec(timeString);
    if (token) {
        hours = parseInt(token[1], 10);
        minutes = parseInt(token[2], 10);
        const seconds = parseFloat(token[3].replace(',', '.'));

        if (!validateTime(hours, minutes, seconds)) {
            return NaN;
        }

        return (hours % 24) * MILLISECONDS_IN_HOUR +
            minutes * MILLISECONDS_IN_MINUTE +
            seconds * 1000;
    }

    // Invalid ISO-formatted time
    return null;
}

function parseTimezone(timezoneString) {
    let token;
    let absoluteOffset;

    // Z
    token = patterns.timezoneZ.exec(timezoneString);
    if (token) {
        return 0;
    }

    let hours;

    // ±hh
    token = patterns.timezoneHH.exec(timezoneString);
    if (token) {
        hours = parseInt(token[2], 10);
        absoluteOffset = hours * MILLISECONDS_IN_HOUR;
        return (token[1] === '+') ? -absoluteOffset : absoluteOffset;
    }

    // ±hh:mm or ±hhmm
    token = patterns.timezoneHHMM.exec(timezoneString);
    if (token) {
        hours = parseInt(token[2], 10);
        const minutes = parseInt(token[3], 10);

        if (!validateTimezone(minutes)) {
            return NaN;
        }

        absoluteOffset = hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
        return (token[1] === '+') ? -absoluteOffset : absoluteOffset;
    }

    return 0;
}

function dayOfISOWeekYear(isoWeekYear, week, day?) {
    week = week || 0;
    day = day || 0;
    const date = new Date(0);
    date.setUTCFullYear(isoWeekYear, 0, 4);
    const fourthOfJanuaryDay = date.getUTCDay() || 7;
    const diff = week * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
}

// Validation functions

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function validateDate(year, month, date?) {
    if (month < 0 || month > 11) {
        return false;
    }

    if (date != null) {
        if (date < 1) {
            return false;
        }

        const isLeapYear = isLeapYearIndex(year);
        if (isLeapYear && date > DAYS_IN_MONTH_LEAP_YEAR[month]) {
            return false;
        }
        if (!isLeapYear && date > DAYS_IN_MONTH[month]) {
            return false;
        }
    }

    return true;
}

function validateDayOfYearDate(year, dayOfYear) {
    if (dayOfYear < 1) {
        return false;
    }

    const isLeapYear = isLeapYearIndex(year);
    if (isLeapYear && dayOfYear > 366) {
        return false;
    }
    if (!isLeapYear && dayOfYear > 365) {
        return false;
    }

    return true;
}

function validateWeekDate(year, week, day?) {
    if (week < 0 || week > 52) {
        return false;
    }

    if (day != null && (day < 0 || day > 6)) {
        return false;
    }

    return true;
}

function validateTime(hours, minutes?, seconds?) {
    if (hours != null && (hours < 0 || hours >= 25)) {
        return false;
    }

    if (minutes != null && (minutes < 0 || minutes >= 60)) {
        return false;
    }

    if (seconds != null && (seconds < 0 || seconds >= 60)) {
        return false;
    }

    return true;
}

function validateTimezone(minutes) {
    return !(minutes < 0 || minutes > 59);
}
