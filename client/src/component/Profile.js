import React, { useEffect,useState } from 'react'
import { Card, Container,Row,Col} from "react-bootstrap";
import { getUser } from "../config/Myservices";
import Footer from './Footer';
import Nav1 from './Nav';
import jwt_decode from "jwt-decode";


//let user = JSON.parse(localStorage.getItem("user"));
export default function Profile() {
    let token = localStorage.getItem("_token");
    let decode = jwt_decode(token);
    let email = decode.uid;
    const[user,setUser]=useState("")
    useEffect(()=>{
        getUser(email).then(res=>{
            console.log(res.data)
            setUser(res.data)
        })
    },[])
    console.log(user)
    return (
        <div>

        <Nav1/>
        <div>
            <Container>
            <Row>
            <Col md={6}>
            <Card className='mt-5'>
                    <Card.Body>
                        <Card.Title>
                            Sandesh Umathe
                        </Card.Title>
                        <Card.Img style={{borderRadius:"50%", width:"100px"} } variant='top' height="100px" src='./products/logo.png'/>
                        <br></br>
                        <Card.Link href='/order'>Orders</Card.Link>
                        <br></br>
                        <Card.Link href='/address'>Address</Card.Link>
                        <br></br>
                        <Card.Link href='/profile'>Profile</Card.Link>
                        <br></br>
                        <Card.Link href='/newpass'>Change Password</Card.Link>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={6} className='mt-4'>   
                
                <h3>User Details</h3>
                <br />
                <Card >
                    <Card.Body>
                        <Card.Title>
                             Profile
                        </Card.Title>
                        <Card.Text><b>Name:-</b>{user.firstname} {user.lastname}</Card.Text>
                        <Card.Text><b>Email:-</b>{user.email}</Card.Text>
                        <Card.Text><b>Contact Number:-</b>{user.contact}</Card.Text>
                        
                    </Card.Body>
                </Card>
                </Col>
                </Row>
            </Container>
        </div>
        <br></br>
        <Footer/>
        </div>
        
    )
}
