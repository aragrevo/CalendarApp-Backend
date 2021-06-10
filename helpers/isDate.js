const moment = require('moment');

const isDate = (value) => {
  if (!value) {
    return false;
  }

  const date = moment(new Date(value));
  if (date.isValid()) {
    return true;
  }
  return false;
};

module.exports = { isDate };
