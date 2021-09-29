import React from 'react'
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Tooltip from 'react-bootstrap/Tooltip'
import PopoverBody from 'react-bootstrap/PopoverBody'
import PopoverHeader from 'react-bootstrap/PopoverHeader'
import Button from 'react-bootstrap/Button'





const OverlayFriend = ({email}) => {

    const handleLink = (e) => {
        e.preventDefault();
        
        const friendEmail = e.target.children[0].value
        console.log(friendEmail, email);
        fetch('http://localhost:4000/link',{
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
        
            <OverlayTrigger
                trigger="click"
                key={'bottom'}
                placement={'bottom'}
                overlay={
                <Popover id={`popover-positioned-bottom`}>
                    <Popover.Header as="h3">{`send affiliate link to a friend`}</Popover.Header>
                    <Popover.Body>
                    <strong>Send to a friend and when he register you get 1000₪</strong>
                    <form onSubmit={handleLink}>
                        <input type="email" placeholder="Enter friends email"></input>
                        <Button type="submit" variant="secondary">Send</Button>
                    </form>
                    </Popover.Body>
                </Popover>
                }
                >
                <Button variant="dark">Recommend a friend</Button>
            </OverlayTrigger>
        
    )
}


export default OverlayFriend
