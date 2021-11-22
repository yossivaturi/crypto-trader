import React from 'react';
import {Redirect} from 'react-router-dom';

const withAuth = (ComponentToProtect, user, token) => {
  return class extends React.Component {
    constructor(){
      super();
      this.state = {
        loading: true,
        redirect: false
      }
    }

    componentDidMount() {
       if(!token){
         this.setState({loading:false, redirect:true})
       }
       else{
        console.log('componentDidMount',token);
        fetch(`${process.env.REACT_APP_BASE_NODE_URL}/checkToken`,{
          method:'POST',
          headers: {
            'Content-type':'application/json'
          },
          body: JSON.stringify({
            token:token
          })
        })
        .then(res => {
          if(res.status === 200) {
            this.setState({loading:false})
          }
          else {
            throw new Error (res.error)
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({loading:false, redirect:true})
        })
      }
    }
    render() {
      console.log(ComponentToProtect);
      const {loading,redirect} = this.state;
      if(loading) {
        return null
      }
      if(redirect) {
        return <Redirect to='/signin' />
      }
      {console.log("With Auth ...props:",{...this.props})}
      return <ComponentToProtect {...this.props} user={user} />
    }
  }
}
export default withAuth;
