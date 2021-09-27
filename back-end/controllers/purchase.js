const db = require('../modules/db').db;
const axios = require('axios');


const handlePurchase = async (req,res) => { 
  let price = 0;
  let newBalance = 0;
  let newAmount = 0;
  const {amount, coin, email, submitter} = req.body;

  //GET THE CURRENT PRICE OF THE COIN PICKED FROM COINGECKO API
  await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}`)
  .then(data => price = data.data.market_data.current_price.ils) 
  // .then(()=> console.log(price)) 
  .catch(e => console.log(e))
  

  if(submitter === 'buy'){
  //GET THE USER BALANCE FROM DB (we need price here thats why we had to use await upstairs)
  db('users').select('balance').where({email})
  .then(bal => { 
    // console.log("old balance: ",bal[0]["balance"]);
    const currBalance = parseFloat(bal[0]["balance"])
    if(currBalance >= amount*price){
      // console.log("inside if", email,amount,price);
      //UPDATE USER BALANCE
      db('users').where({email}).decrement({balance: amount*price}).returning('*')
      .then((data) =>{
        newBalance = parseFloat(data[0]["balance"]);
        console.log("after balance update: ",data[0]["balance"])
      })
      .then(()=>{
        //UPDATE WALLET
        db('wallet').select('*').where({email, coin}).returning('*')
        .then(data => {
          if(data.length == 0){//COIN DOESNT EXIST FOR USER
            db('wallet')
            .insert({email: email, coin: coin, total_amount: amount})
            .returning('total_amount')
            .then(total_amount => {
              newAmount = parseFloat(total_amount[0]);
              console.log("new amount", newAmount);
              res.status(200).json({newAmount, coin, newBalance })

            })
            .catch(e => {
              console.log(e);
            })
          }else {//COIN ALREADY EXIST FOR USER, so we need to update amount
              db('wallet')
              .where({email, coin})
              .increment({total_amount: amount})
              .returning('total_amount')//so we log the updated amount
              .then(total_amount => {
                newAmount = parseFloat(total_amount[0]);
                console.log("new amount", newAmount);
                res.status(200).json({newAmount, coin, newBalance })
              })
              .catch(e => {
                console.log(e);
              })
              }
        })
        .catch(e => {
          console.log(e);
        })
        //END OF UPDATE WALLET
      })
    }
  })
  .catch(e => console.log(e))
  }else if(submitter === 'sell'){
  //GET THE USER BALANCE FROM DB (we need price here thats why we had to use await upstairs)
  db('wallet').select('total_amount').where({email, coin})
  .then(amo => { 
    if(amo.length == 0){return}//COIN DOESNT EXIST FOR USER
    // console.log("old balance: ",bal[0]["balance"]);
    const currAmount = parseFloat(amo[0]["total_amount"])
    if(currAmount >= amount){
      // console.log("inside if", email,amount,price);
      //UPDATE USER BALANCE
      db('users').where({email}).increment({balance: amount*price}).returning('*')
      .then((data) =>{
        newBalance = parseFloat(data[0]["balance"]);
        console.log("after balance update: ",data[0]["balance"])
      })
      .then(()=>{
        //UPDATE WALLET
        db('wallet').select('*').where({email, coin}).returning('*')
        .then(data => {
          //COIN ALREADY EXIST FOR USER, so we need to update total_amount
              db('wallet')
              .where({email, coin})
              .decrement({total_amount: amount})
              .returning('total_amount')//so we log the updated amount
              .then(total_amount => {
                newAmount = parseFloat(total_amount[0]);
                console.log("new amount", newAmount);
                res.status(200).json({newAmount, coin, newBalance })
              })
              .catch(e => {
                console.log(e);
              })
              
        })
        .catch(e => {
          console.log(e);
        })
        //END OF UPDATE WALLET
      })
    }
  })
  .catch(e => console.log(e))

  }

}//END OF handlePurchase()


  module.exports = {
    handlePurchase
  }
  