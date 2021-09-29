import React from 'react'
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Tooltip from 'react-bootstrap/Tooltip'
import PopoverBody from 'react-bootstrap/PopoverBody'
import PopoverHeader from 'react-bootstrap/PopoverHeader'
import Button from 'react-bootstrap/Button'






const OverlayInfo = () => {

    return (
        
            <OverlayTrigger
                trigger="click"
                key={'bottom'}
                placement={'bottom'}
                overlay={
                <Popover id={`popover-positioned-bottom`}>
                    <Popover.Header as="h3">{`Info`}</Popover.Header>
                    <Popover.Body>
                    <strong> prices could differ when purchased because
                    were getting prices in real time when purchasing,
                    and the prices you see was current when page loaded
                    </strong>
                    
                    </Popover.Body>
                </Popover>
                }
                >
                <Button variant="dark">Purchase Info</Button>
            </OverlayTrigger>
        
    )
}


export default OverlayInfo
