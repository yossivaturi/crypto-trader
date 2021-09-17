const db = require('../modules/db').db;
const axios = require('axios');


const handlePurchase = async (req,res) => { 
  let price = 0;
  const {amount, coin, email} = req.body;

  //GET THE CURRENT PRICE OF THE COIN PICKED FROM COINGECKO API
  await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}`)
  .then(data => price = data.data.market_data.current_price.ils) 
  // .then(()=> console.log(price)) 
  .catch(e => console.log(e))
  
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
        console.log("after balance update: ",data[0])
      })
    }
  })
  .catch(e => console.log(e))


  //UPDATE WALLET
  db('wallet').select('*').where({email, coin}).returning('*')
  .then(data => {
    console.log("data: ",data[0]);
    if(data.length == 0){//COIN DOESNT EXIST FOR USER
      db('wallet')
      .insert({email: email, coin: coin, total_amount: amount})
      .then(data => {
        console.log(data);
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
          console.log("total_amount: ", total_amount);
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


}//END OF handlePurchase()

  



  



  module.exports = {
    handlePurchase
  }
  