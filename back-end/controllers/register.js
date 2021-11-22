const bcrypt = require('bcrypt');
const db = require('../modules/db').db;

const handleRegister = (req,res) => {
  const {email,name,password} = req.body;
  let response = {};
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
      console.log("loginEmail",loginEmail);
      return trx('users')
        .insert({
          email: email,
          name:name,
          balance:100000
        })
        .returning('*')
    })

    .then(user => {
      console.log("user",user);
      response = user[0];
      console.log("response",response);
      // res.json({user:user[0]})
    })

    .then(data => {
      console.log("affiliate", data );
      // NEED TO CHECK IF HAS AFFILIATE AND ONLY THEN CHAIN ANOTHER PROMISE
      return trx('affiliate')
        .where({
          friendemail: email
        })
        .returning('email')
        .then(data => {
          console.log("data:", data.length);
          if(data.length !== 0){
            console.log("INSIDE IF",data.length);
            // db('users').where({email: data[0].email}).increment({balance: 1000}).returning('*')            
            return trx('users')
            .where({email: data[0].email}).increment({balance: 1000}).returning('*')
            .then(data => {
              response = {...response, affiliate: "success"}

            })
          }
        })
    })
    .then(user => {
      console.log("response",response);
      res.json(response)
    })
    .then(trx.commit)
    .catch(e => {
      console.log(e);
      trx.rollback;
    })
  })//END OF TRANSACTION
  .catch(err => {
    console.log(err);
    res.status(404).json('unable to register')
  })
}//END OF handleRegister

module.exports = {
  handleRegister
}
