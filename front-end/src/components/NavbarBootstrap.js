import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {Switch, Route, Link} from 'react-router-dom';

export default function NavbarBootstrap() {
    return (
      <>  
       {/* variant="dark" changes the font to white" */}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          
        <Navbar.Brand href="/">
        <img src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/50/000000/external-bitcoin-fintech-itim2101-lineal-color-itim2101.png"
                            style={{
                              height: "",
                              width: "",
                              marginRight: "20px",
                              marginLeft: "-40px"
                            }}         
        
        />
            Crypto Trader
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/news">News</Nav.Link>
            <NavDropdown title="Info" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/">Top 5 Crypto Investors</NavDropdown.Item>
              <NavDropdown.Item href="/">2</NavDropdown.Item>
              <NavDropdown.Item href="/">3</NavDropdown.Item>
              <NavDropdown.Item href="/">4</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="seperateddrop">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

         
          <Nav>
            <NavDropdown title="User actions" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/signin">Sign in</NavDropdown.Item>
                <NavDropdown.Item href="/signout">Sign out</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                
                <NavDropdown.Divider />
                <NavDropdown.Item href="/delete">Delete account</NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
        </Container>
      </Navbar>
    </> 
    )
}



