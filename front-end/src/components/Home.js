import News from "./News/News";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Switch, Route, Link} from 'react-router-dom';
import Coins from "./Coins/Coins";

const Home = (props)=>{
  const [coins, setCoins] = useState([]);

  const handleBuy = (e, price, coinName) => {
    alert("want to buy crypto?:) you will need to sign in for that");
  }

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=ils&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    })
    .catch(error => console.log(error));
  }, []);

  return (
    <>
      <h1>Crypto Trader</h1> 
      <Link to="/signin">Sign In</Link>  <br></br> 
      <Link to="/register">Register</Link>   
      <Coins coins={coins} handleBuy={handleBuy} />
    </>
  )
}
export default Home;
