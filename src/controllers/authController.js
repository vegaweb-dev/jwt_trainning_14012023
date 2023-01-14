const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.get('/', (req, res) => {
  res.send(' I send a string');
});

router.post('/api/post', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  user.password = await user.encryptPassword(password);
  await user.save();

  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });

  console.log(user);
  res.json({ auth: true, token: token });
});

router.get('/me', async (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'no noten provided' });
  }
  const decoded = jwt.verify(token, config.secret);
  const user = await User.findById(decoded.id, { password: 0 });
  if (!user) {
    return res.status(404).send('no user found');
  }
  //   console.log('aqui', decoded);
  res.json(user);
});

module.exports = router;
