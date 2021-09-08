import React from 'react';
import {Link, withRouter} from 'react-router-dom';


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    }
  }
  onEmailChange = (e) => {
    this.setState({email:e.target.value})
  }
  onPasswordChange = (e) => {
    this.setState({password:e.target.value})
  }
  onSubmitSignIn = () => {
    fetch('http://localhost:4000/signin', {
      method:'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(userdata=>{
      console.log(userdata);
      this.props.loadUser(userdata);
      this.props.history.push('/');
    })
    .catch(e => {
      console.log(e);
    })
  }
  render() {
    return(
    <>
      <h2>Sign In</h2>
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
        <button onClick={this.onSubmitSignIn}>Sign In</button>
      </div>
      <div>
        <Link to='/register'>Register</Link>
      </div>
    </>
  )
  }
}
export default withRouter(SignIn);
