import React from 'react'

const Wallet = ({coins}) => {
    
    return (
        
        <div>
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
