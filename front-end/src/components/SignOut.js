import {withRouter} from 'react-router-dom';

const SignOut = (props) => {
  props.loadUser({
    user: {
      id: '',
      name: '',
      email:'',
      joined:''
    },
    token:null
  })
  props.history.push('/signin')
  return(
    <></>
  )
}

export default SignOut
