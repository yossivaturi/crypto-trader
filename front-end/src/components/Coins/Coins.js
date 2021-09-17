import React, {useState, useEffect} from 'react';
import Coin from '../Coin/Coin';
import './Coins.css';

const Coins = (props) => {
    const [search, setSearch] = useState('');
    
    const handleChange = e => {
      setSearch(e.target.value)
    }

    const filteredCoins = props.coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="coin-app">
            <div className="coin-search">
                <input onChange={handleChange} type="text" placeholder="you can filter for a specific coin" className="coin-input"/>      
            </div>
            <legend>prices could differ when purchased because
               were getting prices in real time when purchasing,</legend>
            <legend> and the prices you see was current when page loaded</legend>

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
                  handleBuy={props.handleBuy}/>  
              )
            })}    
        </div>
    )
}
export default Coins;
