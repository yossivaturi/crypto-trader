import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, Link} from 'react-router-dom';
import Register from './components/Register'
import Home from './components/Home'
import News from './components/News/News';
import Profile from './components/Profile';
import About from './components/About'
import SignOut from './components/SignOut'
import Delete from './components/Delete'
import withAuth from './withAuth';
import Coins from './components/Coins/Coins';
import NavbarBootstrap from "./components/NavbarBootstrap";
import SignIn from './components/SignIn/SignIn';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: {
        id: '',
        name: '',
        email:'',
        joined:'',
        balance: 0,
        wallet: {}
      },
      token: null
    }
  }
  loadUser = (data) => {
    console.log("LOAD USER",data);
    this.setState({
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        joined: data.user.joined,
        balance: data.user.balance,
        wallet: data.user.wallet
      },
      token: data.token
    })
    console.log('this.state',this.state);
  }
  render(){
    const {user,token} = this.state;
    return (
      <div className='App'>     
        <NavbarBootstrap />
  
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/news'  component={News} />
          {/* userdata & token is being passed as props to <Profile /> from within <WithAuth /> */}
          <Route path='/profile' exact component={withAuth(Profile,user,token)}  />
          <Route path='/about' component={withAuth(About,user,token)}  />
          <Route path='/register' render={(props) => <Register {...props} loadUser={this.loadUser}/> }/>
          <Route path='/signin' render={(props) => <SignIn {...props} loadUser={this.loadUser}/> } />
          <Route path='/signout' render={(props) => <SignOut {...props} loadUser={this.loadUser}/> } />
          <Route path='/delete' render={(props) => <Delete {...props} user={user}/> } />
        </Switch>
      </div>
    )
  }
}

export default App;
