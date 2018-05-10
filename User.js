const bcrypt = require('bcryptjs');

class User {
  constructor(name, pw) {
    this.name = name.trim();
    this.pw = pw;
  }

  static errorMessage(msg) {
    return msg;
  }

  nameIsValid() {
    return /^[a-zA-Z]+$/.test(this.name);
  }

  makeNameValid() {
    this.name = this.name.replace(/[^a-zA-Z]+/g, '');
    return this.name;
  }

  passwordIsValid() {
    return this.pw.length >= 4;
  }

  _hashPassword() {
    if (!this.passwordIsValid) {
      return false;
    }
    return new Promise((resolve, rej) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.pw, salt, (err, hash) => {
          if (err) throw err;
          this.pw = hash;
          resolve({ name: this.name, password: this.pw });
        });
      });
    });
  }

  submitData() {
    return this._hashPassword();
  }


}

module.exports = User;