import React from "react";
import {  Button, Container , Navbar,NavDropdown,Nav,Form,FormControl} from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Nav1(){
  const log = localStorage.getItem("_token")
 /*  const logout=()=>{
    localStorage.removeItem("_token")
    navigate("/login")
  } */
  const navigate = useNavigate();
    return(
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
  <Container fluid>
    <Navbar.Brand href="/">Neo<span style={{color:"red"}}>Store</span></Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/">Home</Nav.Link>
        
        <Nav.Link href="/products">Products</Nav.Link>
        { log ?
          <NavDropdown title="User" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Item href="/logout" >Logout</NavDropdown.Item>
        
        </NavDropdown>
        
        :
        <NavDropdown title="User" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/login">Login</NavDropdown.Item>
          <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
         
        </NavDropdown>
        }
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        
        <Button variant="outline-success">Search</Button>
        <br></br>
        <Nav.Link href="/cart">Cart</Nav.Link>
        
        
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
    )
}