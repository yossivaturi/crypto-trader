import News from "./News/News";
import {Switch, Route, Link} from 'react-router-dom';

const Home = (props)=>{
  return (
    <>
      <h1>Crypto Trader</h1> 
      <Link to="/signin">Sign In</Link>  <br></br> 
      <Link to="/register">Register</Link>   
    </>
  )
}
export default Home;
