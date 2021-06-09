const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/fieldValidator.middleware');
const { jwtValidator } = require('../middlewares/jwtValidator.middleware');
const {
  createUser,
  loginUser,
  validateToken,
} = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').isLength({ min: 6 }),
    fieldValidator,
  ],
  createUser
);
router.post('/', loginUser);

router.get('/renew', jwtValidator, validateToken);

module.exports = router;
