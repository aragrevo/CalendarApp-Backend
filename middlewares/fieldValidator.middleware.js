const { response } = require('express');
const { validationResult } = require('express-validator');

// Se importa response y se iguala solo para el intellisense
const fieldValidator = (req, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = {
  fieldValidator,
};
