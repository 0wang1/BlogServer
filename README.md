# starter express app template

* node with babel
* expressjs
* airbnb eslint rules

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

For the blog server backend for HW5P2 authentication, we basically created a means of authenticating and keeping track of who the current user is and whether he/she has an account using passport.js. In order to do this, we needed to create user models and controllers to keep track of all the fields a user will have, as well as what happens to those fields when the user signs in, signs out, or signs up. Still using mongodb, we modified our server with a mongo presave hook in order to generate a hash for every user password, and also added extra security by requiring authentication for specific routes that the end-user will take.
