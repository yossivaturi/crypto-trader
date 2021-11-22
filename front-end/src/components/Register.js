import React from 'react';
import {Link} from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      show: true
    }
  }



  onNameChange = (e) => {
    this.setState({name:e.target.value})
  }
  onEmailChange = (e) => {
    this.setState({email:e.target.value})
  }
  onPasswordChange = (e) => {
    this.setState({password:e.target.value})
  }
  onSubmitSignIn =() => {
    console.log('onSubmitSignIn');
    console.log(process.env.REACT_APP_BASE_NODE_URL);

    fetch(`${process.env.REACT_APP_BASE_NODE_URL}/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:this.state.email,
        password:this.state.password,
        name:this.state.name

      })
    })
    .then(response => response.json())
    .then(user => {
      this.setState({show: false})
      console.log(user);

    })
    .catch(e => {
      console.log(e);
    })
  }
  render() {
    return (

      <div>
          
        { this.state.show ? 
          <>
                  <h2>Register</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text"
                name="name" id="name"
                onChange={this.onNameChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email"
                name="email" id="email"
                onChange={this.onEmailChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password"
                name="password" id="password"
                onChange={this.onPasswordChange} />
        </div>
        <div>
          <input type="submit"
                onClick={this.onSubmitSignIn}
                value="Register"/>
        </div>
        <div>
          <Link to='/signin'>Sign In</Link>
        </div>
        </>
          
        : 
          
        <h1>Welcome to the crypto club!</h1> 
        }

      </div>
      

        
        
    )
  }
}

export default Register
