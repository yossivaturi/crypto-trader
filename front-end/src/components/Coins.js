import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from './Coin';
import './Coins.css';
import Wallet from './Wallet';





const Coins = () => {
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

    const handleBuy = e => {
      e.preventDefault();       
      let currValue = 0;
      let coin = e.target.children[1].id;//coin name
      let amount = parseFloat(e.target.children[1].value);
      if(isNaN(amount)){//user didnt provided a number for the input
        return;
      }
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
