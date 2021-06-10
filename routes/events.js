/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { jwtValidator } = require('../middlewares/jwtValidator.middleware');
const { fieldValidator } = require('../middlewares/fieldValidator.middleware');
const { isDate } = require('../helpers/isDate');

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events.controller');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use(jwtValidator);

// Obtener eventos
router.get('/', getEvents);

// Crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start Date is required').custom(isDate),
    check('end', 'End Date is required').custom(isDate),
    fieldValidator,
  ],
  createEvent
);

// Actualizar Evento
router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Start Date is required').custom(isDate),
    check('end', 'End Date is required').custom(isDate),
    fieldValidator,
  ],
  updateEvent
);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;
