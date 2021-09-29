import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coins from "./Coins/Coins";
import Wallet from "./Wallet/Wallet";
import SendLink from './SendLink';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import OverlayFriend from './OverlayFriend';
import OverlayWallet from './OverlayWallet';
import OverlayInfo from './OverlayInfo';


const Profile = (props)=>{ 
  const [coins, setCoins] = useState([]);
  const [wallet, setWallet] = useState(props.user.wallet);
  const [balance, setBalance] = useState(props.user.balance);
  const [showInfo, setShowInfo] = useState(false);
  const [show, setShow] = useState(true);
  


  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=ils&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    })
    .catch(error => console.log(error));
  }, []);




  const purchaseReq = (amount, coin, email, submitter) => {
    if(email) {
      fetch('http://localhost:4000/purchase',{
        method: 'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          amount: amount,
          coin: coin,
          email: email,
          submitter: submitter
        })
      })
      .then(response => response.json())
      .then(data => {
        setWallet({...wallet, [coin]: data.newAmount });
        setBalance(data.newBalance)
      })
      .catch(e => {
        console.log(e);
      })
    }
  }
    
 
  const handleBuy = (e, price, coinName) => {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter.id;//buy or sell
    const balance = parseFloat(props.user.balance);
    let amount = parseFloat(e.target.children[2].value);
    if(isNaN(amount)){ return;}//user didnt provided a number for the input
    
    if(submitter === 'buy' && balance < amount*price ){
      alert("you dont have enough money");
      return;
    }
    
    if(submitter === 'sell' && ((wallet[coinName] < amount) || ( typeof wallet[coinName] === 'undefined'))){
      alert("you dont have enough amount of this specific coin");
      return;
    }
    purchaseReq(amount, coinName, props.user.email, submitter);
  }

  
  return (
    
    <div style={{height: '100vh'}}>
     
      <h3> Welcome {`${props.user.name}, your current balance is: ${balance}₪`}</h3>
      
      <OverlayFriend email={props.user.email}/>
      <OverlayWallet wallet={wallet} />
      <OverlayInfo />
      <Coins coins={coins} handleBuy={handleBuy} />
    </div>
  )
  }
  export default Profile;
  
