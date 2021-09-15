import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';

class SignIn extends Component {
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
      onSubmitSignIn = (e) => {
        e.preventDefault();
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
          this.props.history.push('/profile');
        })
        .catch(e => {
          console.log(e);
        })
      }
    render() {
        return (
        
            <main class="pa4 black-80">
            <form class="measure center">
                <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                <legend class="f8 fw6 ph0 mh0">Sign In</legend>
                <div class="mt3">
                    <label class="db fw6 lh-copy f6" for="email-address">Email</label>
                    <input onChange={this.onEmailChange} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email" />
                </div>
                <div class="mv3">
                    <label class="db fw6 lh-copy f6" for="password">Password</label>
                    <input onChange={this.onPasswordChange} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                </div>
                <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                </fieldset>
                <div class="">
                <input onClick={this.onSubmitSignIn} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                </div>
                <div class="lh-copy mt3">
                <div>
                    <Link to='/register'>Register</Link>
                </div>
                <a href="#0" class="f6 link dim black db">Forgot your password?</a>
                </div>
            </form>
            </main>
        
        )
    }
}
export default withRouter(SignIn);
