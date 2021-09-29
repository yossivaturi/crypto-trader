import React from 'react'
import './Wallet.css';
const Wallet = ({coins}) => {
    //RECIEVE A OBJECT OF COINS FROM DB AND DISPLAY IT
    return (
        <div className="wallet">
            <h3>My Wallet</h3>
            { 
                Object.keys(coins).map((item, i) => (
                    <li key={i}>
                        {console.log("IN WALLET",item)}

                        {item} : { coins[item] }
                    </li>
                ))
            }  
        </div>
    )
}

export default Wallet;
