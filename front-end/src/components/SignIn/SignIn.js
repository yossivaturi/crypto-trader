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
          console.log("USERDATA",userdata);
          this.props.loadUser(userdata);
          this.props.history.push('/profile');
        })
        .catch(e => {
          console.log(e);
        })
      }
    render() {
        return (
          <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email" />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" for="password">Password</label>
                    <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  type="password" name="password"  id="password" />
                </div>
                
                </fieldset>
                <div className="">
                <input onClick={this.onSubmitSignIn} style={{marginRight: "0.1px"}} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                <div>
                    <Link to='/register'>Register</Link>
                </div>
     
                </div>
            </form>
            </main>
        </article>
        )
    }
}
export default withRouter(SignIn);
