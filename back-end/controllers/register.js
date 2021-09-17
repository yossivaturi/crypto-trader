const bcrypt = require('bcrypt');
const db = require('../modules/db').db;

const handleRegister = (req,res) => {
  const {email,name,password} = req.body;
  console.log(req.body);
  if(!email || !name || !password){
    return res.status(404).json('incorrect form submission')
  }
// hashSync is used to Synchronously generates a hash for the given string.
// 2nd parameter called salt.
// It returns the hashed string
  const hash = bcrypt.hashSync(password,10);
  db.transaction(trx => {
    trx('login')
    .insert({
      hash:hash,
      email:email
    })
    .returning('email')
    .then(loginEmail => {
      return trx('users')
        .insert({
          email: email,
          name:name,
          balance:100000
        })
        .returning('*')
        .then(user => {
          res.json({user:user[0]})
        })
    })
    .then(trx.commit)
    .catch(e => {
      console.log(e);
      trx.rollback;
    })
  })
  .catch(err => {
    console.log(err);
    res.status(404).json('unable to register')
  })
}

module.exports = {
  handleRegister
}

