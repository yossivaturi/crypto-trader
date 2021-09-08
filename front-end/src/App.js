import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, Link} from 'react-router-dom';
import Register from './components/Register'
import SignIn from './components/SignIn'
import Home from './components/Home'
import HomeUser from './components/HomeUser';
import About from './components/About'
import SignOut from './components/SignOut'
import Delete from './components/Delete'
import withAuth from './withAuth';
import Coins from './components/Coins';
import NavbarBootstrap from "./components/NavbarBootstrap";

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: {
        id: '',
        name: '',
        email:'',
        joined:''
      },
      token: null
    }
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        joined: data.user.joined
      },
      token: data.token
    })
    console.log('this.state',this.state);
  }
  render(){
    const {user,token} = this.state;
    return (
      <>
        <NavbarBootstrap />
        {/* <Coins /> */}
        <Switch>
          <Route path='/' exact  component={Coins} />
          <Route path='/homeuser' exact component={withAuth(HomeUser,user,token)}  />
          <Route path='/about' component={withAuth(About,user,token)}  />
          <Route path='/register' render={(props) => <Register {...props} loadUser={this.loadUser}/> }/>
          <Route path='/signin' render={(props) => <SignIn {...props} loadUser={this.loadUser}/> } />
          <Route path='/signout' render={(props) => <SignOut {...props} loadUser={this.loadUser}/> } />
          <Route path='/delete' render={(props) => <Delete {...props} user={user}/> } />
        </Switch>
      </>
    )
  }
}

export default App;
