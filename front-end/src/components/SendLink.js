import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css';


const SendLink = ({email}) => {

    const handleLink = (e) => {
        e.preventDefault();
        const friendEmail = e.target.children[0].children[0].value
        console.log(friendEmail, email);
        fetch(`${process.env.REACT_APP_BASE_NODE_URL}/link`,{
            method: 'POST',
            headers: {
              'Content-type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                friendEmail: friendEmail

            })
          })
          .then(response => response.json())
          .then(data => {

          })
          .catch(e => {
            console.log(e);
          })

    }


    return (
        <div>
            <form onSubmit={handleLink}>
                <div className="form-group row d-flex justify-content-center" >
                    <input type="email" style={{width:'21%'}} className="form-control" id="exampleFormControlInput1" placeholder="Friends Email"/>
                    <div>
                    <Button type="submit" style={{width:'7%'}} variant="outline-primary">Send</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SendLink
