import React from 'react'
import {Nav, NavItem,MenuItem, Navbar, Badge} from 'react-bootstrap';

class Menu extends React.Component{
  render(){
    return(
    <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Recipe Box Full Stack</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/">About</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/signup">Sign Up</NavItem>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
  }
}

export default Menu
