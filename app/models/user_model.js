import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  username: String,
});

UserSchema.set('toJSON', {
  virtuals: true,
});


UserSchema.pre('save', function beforeyYourModelSave(next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  } else {
    // generate a salt then run callback
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }

    // hash (encrypt) our password using the salt
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) { return next(err); }

      // overwrite plain text password with encrypted password
        user.password = hash;
        return next();
      });
    });
  }
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
