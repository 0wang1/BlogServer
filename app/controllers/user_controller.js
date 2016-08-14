import User from '../models/user_model';
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.API_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  User.findOne({ email: req.body.email })
  .then(result => {
    if (!result) {
      const user = new User({
        email,
        password,
        username,
      });
      user.save();
      console.log(username);
      res.send({ token: tokenForUser(user) });
    } else {
      return res.status(422).send('Email already registered');
    }
  })
  .catch(error => {
    res.json({ error });
  });
};
