import React from 'react';
import './Coin.css';


const Coin = ({ name, image, symbol ,price, volume, priceChange, marketcap, handleBuy }) => {
    return (
        <>    
          <tr>
            <td><img style={{height:'6vh', width:'3vw'}} src={image} alt="crypto"/></td>
            <td style={{paddingTop:'20px'}} >{name}</td>
            <td style={{paddingTop:'20px'}}>{symbol.toUpperCase()}</td>
            <td style={{paddingTop:'20px'}}>
            { priceChange < 0 ? 
                (<p className="red">{priceChange.toFixed(3)}%</p>)
                :
                (<p className="green"> {priceChange.toFixed(3)}%</p>)
            } 
            </td>
            <td style={{paddingTop:'20px'}}>{price}₪</td>

            <td style={{paddingTop:'20px'}}>    
                <form onSubmit={(e) => handleBuy(e, price, name)}>
                    <button id={'buy'} type="submit">Buy</button>
                    <button id={'sell'} type="submit">Sell</button>
                    <input id={name} type="number" step="0.00001" placeholder="Enter a number" ></input>
                </form>
            </td>
          </tr>
       
      

        {/* <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    <img src={image} alt="crypto"/>
                    <h1>{name}</h1>
                    <h1>{symbol.toUpperCase()}</h1>
                    <h1>{price}₪</h1>
                    <h1>Daily change: </h1>
                    { priceChange < 0 ? 
                        (<h1 className="red">{priceChange.toFixed(3)}%</h1>)
                        :
                        (<h1 className="green"> {priceChange.toFixed(3)}%</h1>)
                    }
                </div>

                    <form onSubmit={(e) => handleBuy(e, price, name)}>
                        <button id={'buy'} type="submit">Buy</button>
                        <button id={'sell'} type="submit">Sell</button>
                        <input id={name} type="number" step="0.00001" placeholder="Enter a number" ></input>
                    </form>
            </div>  
        </div> */}
       </>
    )
}

export default Coin