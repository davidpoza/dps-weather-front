import moment from 'moment';

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

/* eslint-enable import/prefer-default-export */
