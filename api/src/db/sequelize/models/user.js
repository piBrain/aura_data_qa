'use strict';
import argon2 from 'argon2'
import { generateSalt } from 'argon2'

module.exports = function(sequelize, DataTypes) {
  const attributes = {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        isLongEnough: function (val) {
          if(val.length < 16) {
            throw new Error('Password is not long enough. Must be at least 16 characters.')
          }
        },
        isSufficientlyComplex: function (val) {
          var arrayPass = new Array(val)
          let passesSymCheck = arrayPass.some((chr) => {
            return chr.match(/[ !"#\$%&'\(\)\?\*\+\,\-\./\:;\<\=\>?@\[\\\]\^_`\{\|\}~]/)
          })
          let passesNumericCheck = arrayPass.some((chr) => { return chr.match(/\d/) })
          let passesAlphaCheck = arrayPass.some((chr) => { return chr.match(/[a-zA-Z]/)})
          if(!(passesSymCheck && passesNumericCheck && passesAlphaCheck)) { 
            throw new Error('Must have at least 1 of each:  number, letter, and symbol("#$%&\'()*+,-./:;<=>?@[\]^_`{|}~)')
          }
        }
      },
    },
    secQuestion1: DataTypes.ENUM('What was the name of your first pet?', 'What was your most rewarding moment in life?', 'What was the name of your first kiss?', 'What celebrity do you most resemble?'),
    secQuestion2: DataTypes.ENUM('What was the name of your first pet?', 'What was your most rewarding moment in life?', 'What was the name of your first kiss?', 'What celebrity do you most resemble?'),
    secQuestionResponse1: DataTypes.STRING,
    secQuestionResponse2: DataTypes.STRING,
    token: DataTypes.STRING,
    activationNonce: DataTypes.STRING,
    activationExpiry: DataTypes.DATE,
    signInType: DataTypes.ENUM('password', 'google'),
    active: DataTypes.BOOLEAN,
    locked: DataTypes.BOOLEAN,
    resetToken: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    resetExpiry: DataTypes.DATE,
    inPasswordReset: DataTypes.BOOLEAN,
  }

  const hashPassword = (user, options) => {
    if (!user.changed('password')) { return };
    return argon2.hash(user.password, { type: argon2.argon2i }).then((hash) => {
      user.setDataValue('password', hash)
    })
  }

  const options = {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    }
  }

  var User = sequelize.define('User', attributes, options);
  return User;
};
