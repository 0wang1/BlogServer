import User from '../models/user_model';
import jwt from 'jwt-simple';
import config from '../config.js';

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.userName;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }
  // check mongodb to see if user is already registered with that email
  User.findOne({ email: req.body.email })
  .then(result => {
    if (!result) {
      const user = new User({
        email,
        password,
        userName,
      });
      user.save();
      console.log(user);
      res.send({ token: tokenForUser(req.user) });
    }
  })
  .catch(error => {
    res.json({ error });
  });
};
