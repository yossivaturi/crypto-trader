import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coins from "./Coins/Coins";
import Wallet from "./Wallet/Wallet";

const Profile = (props)=>{ 
  const [coins, setCoins] = useState([]);
  const [wallet, setWallet] = useState(props.user.wallet);
  const [balance, setBalance] = useState(props.user.balance)
  
console.log("WALLET:",props);
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=ils&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    })
    .catch(error => console.log(error));
  }, []);

  
  const purchaseReq = (amount, coin, email) => {
    if(email) {
      fetch('http://localhost:4000/purchase',{
        method: 'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          amount: amount,
          coin: coin,
          email: email
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log("THERE YOU GO",data);
        setWallet({...wallet, [coin]: data.newAmount });
        setBalance(data.newBalance)
      })
      .catch(e => {
        console.log(e);
      })
    }
  }
    
  //goal:validate the purchase in the browser and send the request to the server
  //using the function purchase()
  const handleBuy = (e, price) => {//handles the onClick event next to the coin
    e.preventDefault();
    const balance = parseFloat(props.user.balance);
    let coin = e.target.children[1].id;//coin name
    let amount = parseFloat(e.target.children[1].value);
    if(isNaN(amount)){ return;}//user didnt provided a number for the input
    if(balance < amount*price ){
      alert("you dont have enough money");
      return;
    }
    purchaseReq(amount, coin, props.user.email);
  }
  
  return (
    <>
      <h1>Profile</h1>
      <h3> Welcome {`${props.user.name}`}</h3>
      <h3> your balance: {`${balance}`}</h3>
      <Wallet coins={wallet} />
      <Coins coins={coins} handleBuy={handleBuy} />
    </>
  )
  }
  export default Profile;
  
