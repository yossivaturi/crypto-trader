const db = require('../modules/db').db;


const handlePurchase = (req,res) => {
  // console.log(req.body);
  let b = 0; 
  const {amount, price, email} = req.body;
  db('users').where({email}).select('balance')
    .then(bal => { 
      balance = parseFloat(bal[0]["balance"])
      if(balance >= amount*price){
        transactionApproved(balance, amount, price, email);
      }
    })

      
    
    transactionApproved = (balance, amount, price, email) => {
      db('users')
      .where({email})
      // .update({balance: 100000})
      .update({balance: balance - amount*price})
      .then(user => {
        console.log(user);
      })
      .catch(e => {
        res.status(404).json('Can not buy crypto')
      })
    }

  }
  module.exports = {
    handlePurchase
  }
  