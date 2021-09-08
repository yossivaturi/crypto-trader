import React from 'react';

class Delete extends React.Component {
  constructor() {
    super();

  }
  onSubmitDelete = () => {
    if(this.props.user.email) {
      fetch('http://localhost:4000/delete',{
        method: 'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          email: this.props.user.email
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      })
    }
  }
  render(){
    return(
      <>
        <h2>Delete User</h2>
        <input type="submit" onClick={this.onSubmitDelete} value="Delete"/>
      </>
    )
  }
}
export default Delete
