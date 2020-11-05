import moment from 'moment-timezone';

/* eslint-disable import/prefer-default-export */
export function videoUrlIsValid(url) {
  const regex = /(?:https:\/\/(?:www\.)?)?youtube.com\/watch\?v=([A-Za-z0-9-_]*)/;
  const result = url.match(regex);
  return (result ? result[1] : false);
}

export function emailIsValid(email) {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


export function passwordIsValid(password) {
  if (password.length < 8) {
    return (false);
  }
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonalphas = /\W/.test(password);
  if (hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas < 3) {
    return (false);
  }
  return (true);
}

export function formatSubsCount(subs) {
  if (subs >= 1000000) {
    return (`${subs / 1000000}M`);
  }
  if (subs >= 1000) {
    return (`${Math.ceil(subs / 1000)}K`);
  }
  return (subs);
}

export function sortCommentsByDate(a, b) {
  const dateA = moment(a.publishedDate);
  const dateB = moment(b.publishedDate);
  if (dateA.isBefore(dateB)) {
    return (1);
  }
  if (dateB.isBefore(dateA)) {
    return (-1);
  }
  return (0);
}

export function getCurrentDate() {
  return (moment().tz('Europe/Madrid', new Date()).format('DD-MM-YYYY HH:mm'));
}

/**
 *
 * @param {number} temp - celsius
 * @param {number} hum - relative humidity percentage
 * @return {number} celsius
 */
export function calculateDewPoint(temp, hum) {
  const calculation = ((hum / 100) ** (1 / 8)) * (112 + (0.9 * temp)) + 0.1 * temp - 112;
  return (calculation.toFixed(2));
}

/**
 * Calculates THS
 * @param {number} temp celsius
 * @param {number} hum relative humidity %
 * @param {number} wind km/h
 */
export function calculateTHWIndex(temp, hum, wind) {
  const e = (hum / 100) * 6.105 * Math.exp((17.27 * temp) / (237.7 + temp));
  return (temp + 0.33 * e - 0.70 * (wind / 3.6) - 4.00).toFixed(2);
}

/**
 * Only valid for temperature values between 27-43 celsius and humidity values higher than 40%
 * See: https://www.toppr.com/guides/physics-formulas/heat-index-formula/
 * @param {number} temp - ambient temperature in Fahrenheit
 * @param {number} hum - % relative humidity
 * @return {number} fahrenheit
 */
export function calculateHeatIndex(temp, hum) {
  const c1 = -42.379;
  const c2 = -2.04901523;
  const c3 = -10.14333127;
  const c4 = -0.22475541;
  const c5 = -6.83783 * 10 ** -3;
  const c6 = -5.481717 * 10 ** -2;
  const c7 = -1.22874 * 10 ** -3;
  const c8 = 8.5282 * 10 ** -4;
  const c9 = -1.99 * 10 ** -6;
  return (c1 + c2 * temp + c3 * hum + c4 * temp * hum + c5 * temp ** 2
    + c6 * hum ** 2 + c7 * temp ** 2 * hum + c8 * temp * hum ** 2 + c9 * temp ** 2 * hum ** 2);
}

/**
 * See: https://physics.stackexchange.com/questions/32857/how-to-calculate-temperature-humidity-wind-index
 * @param {*} heatIndex
 * @param {*} windSpeed - in miles per hour
 */
export function calculateThw(heatIndex, windSpeed) {
  return (heatIndex - (1.072 * windSpeed));
}

export function mph2kmh(speed) {
  return (speed * 1.609);
}

export function kmh2mph(speed) {
  return (speed / 1.609);
}

export function fahrenheit2Celsius(temp) {
  return (((temp + 40) / 1.8) - 40);
}

export function celsius2Fahrenheit(temp) {
  return (((temp + 40) * 1.8) - 40);
}

/* eslint-enable import/prefer-default-export */
