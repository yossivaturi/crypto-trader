const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../modules/db').db;
const env = require('dotenv').config();
const secret = process.env.SECRET;

const handleSignIn = (req,res) => {
  const {email, password} = req.body;
  console.log(req.body);
  if(!email || !password){
    return res.status(404).json('incorrect form submission')
  }
  db('login')
  .select('email','hash')
  .where({email})//{email: email}
  .then(data => {
    console.log('hash',data[0].hash);
    const isValid = bcrypt.compareSync(password, data[0].hash);
    if(isValid){
      return db.select('*').from('users')
        .where({email})//because email is UNIQUE in db
        .then(user => {
          // jsonwebtoken
          const payload = {email};
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          console.log('token', token);

          //GET WALLET FROM DB -> build object from output
          db('wallet').select('*').where({email})
          .then((data) => {
            let wallet = {}
            data.forEach(x => wallet = {...wallet, [x["coin"]]: x["total_amount"]})
            user[0] = {...user[0], wallet}
            res.status(200).json({user:user[0], token:token})
          })
        })  
        .catch(err => {
          console.log(err);
          res.status(400).json('unable to get user');
        })
    }
    else {
      res.status(404).json('wrong password')
    }
  })
  .catch(e=>{
    res.status(404).json('wrong credentials')
  })
}
module.exports = {
  handleSignIn
}
