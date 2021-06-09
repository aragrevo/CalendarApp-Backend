const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User.model');
const { generateJWT } = require('../helpers/jwt');

// Se importa response y se iguala solo para el intellisense
const createUser = async (req, res = response) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'An user exist with that email',
      });
    }

    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      msg: 'User created successfully',
      user: { name, email, uid: user.id, token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please, talk to the admin',
    });
  }
};

const loginUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'User is not exist with that email',
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password is wrong',
      });
    }

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      user: { email, uid: user.id, token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please, talk to the admin',
    });
  }
};

const validateToken = async (req, res = response) => {
  const { uid, name } = req;

  // Generar JWT
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  validateToken,
};
