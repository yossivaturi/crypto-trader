import React from 'react'
import './Wallet.css';
const Wallet = ({coins}) => {
    
    return (
        
        <div className="wallet">
            <h3>My Wallet</h3>
            { 
                Object.keys(coins).map((item, i) => (
                    <li key={i}>
                        {console.log(item)}
                        {console.log(coins)}
                        {item} : { coins[item] }
                    </li>
                ))
            }  
        </div>
    )
}

export default Wallet;
