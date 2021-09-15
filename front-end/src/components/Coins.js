import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from './Coin';
import './Coins.css';
import Wallet from './Wallet';





const Coins = (props) => {
  
    const SCALE = 5;
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [buy, setBuy] = useState({});

    useEffect(() => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=ils&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error));
    }, []);

    const handleChange = e => {
      setSearch(e.target.value)
    }

    
    //taking the money from account in db
    const purchaseReq = (amount, price, email) => {
      console.log('props:',props);
      console.log(amount, price, email);
      if(email) {
        fetch('http://localhost:4000/purchase',{
          method: 'POST',
          headers: {
            'Content-type':'application/json'
          },
          body: JSON.stringify({
            amount: amount,
            price: price,
            email: email
            
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
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
      let currValue = 0;
      let coin = e.target.children[1].id;//coin name
      let amount = parseFloat(e.target.children[1].value);
      if(isNaN(amount)){ return;}//user didnt provided a number for the input
      if(balance < amount*price ){
        console.log(typeof balance, "you dont have enough money");
        return;
      }
      


      console.log(amount, price, props.user.email);
      purchaseReq(amount, price, props.user.email);


      //need to do in server
      if(buy.hasOwnProperty(coin)){//coin exists already in the user coins
        currValue = buy[coin] + amount;
      }else {
        currValue = amount;
      }
      currValue = parseFloat(currValue.toFixed(SCALE));
      setBuy({...buy, [coin]: currValue });
      console.log(buy);
    }
    



    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="coin-app">

            <div className="coin-search">
                <input type="text" placeholder="you can filter for a specific coin" className="coin-input"
                  onChange={handleChange} /> 
            </div>

            <Wallet coins={buy} />

            {filteredCoins.map(coin => {
              return(
                <Coin 
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  symbol={coin.symbol}
                  marketcap={coin.market_cap}
                  price={coin.current_price}
                  priceChange={coin.price_change_percentage_24h}
                  volume={coin.total_volume}
                  handleBuy={handleBuy}
                />  
              )
            })}
            
        </div>
    )
}

export default Coins;
