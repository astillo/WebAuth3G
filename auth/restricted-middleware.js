const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')
const Users = require('../users/users-model.js');
const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
  const { username, password } = req.headers;
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'you are not authenitcated' })
      }
      else {
        req.user = { username: decodedToken.username }
        next()
      }
    })
  }
  else {
    res.status(400).json({ message: 'no credentials provided' })
  }
};
