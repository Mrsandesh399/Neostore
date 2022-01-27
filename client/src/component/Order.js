import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Footer from './Footer'
import Nav1 from './Nav'
import { useState } from 'react'
import { getOrderDetails } from '../config/Proservice'
import jwt_decode from 'jwt-decode'

export default function Order() {
    let email;
     let token=localStorage.getItem('_token')
     console.log(token)
    if(token){
        let decode = jwt_decode(token)
        email=decode.uid
    }  

    const [details,setdetails]=useState([]);
    const [oimage,setOimage]=useState([]);

    useEffect(()=>{
        getOrderDetails(email).then(res=>{
            setdetails(res.data)
            let ele = res.data.forEach(element=>{
                setOimage(element.cart)
            })
        })
    },[])

    return (
        <div>
        <Nav1/>
         <br></br>

        <div>
            <Container className='m-4 ,p-4'>
            {details ? details.map((value,index)=>{
                return(
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <Card.Text as="h4"> Order Placed :</Card.Text>
                                    <Card.Text as ="h6"><span style={{color:"black"}}>{value.createdAt.substring(0,10)}</span></Card.Text>
                                </Col>
                                <Col style={{textAlign:"right"}}> 
                                    <Card.Text as="h4"> order ID:</Card.Text>
                                    <Card.Text as="h6"><span style={{color:"black"}}>{value._id}</span></Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card.Text as="h5">Status:<span style={{color:"Red"}}>Completed</span></Card.Text>
                                   
                                </Col>
                                <Col>
                                    <Card.Text as="h5" style={{textAlign:"right"}}>Total:<span style={{color:"blue"}}>{value.total}</span></Card.Text>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Card.Title>
                                {oimage.map((value,index)=>{
                                    return(
                                    
                                    <img src={value.image} alt="order_image" key={index} style={{height:"120px", width:"120px"}} 
                                        className='m-4'
                                    />
                                    )
                                })}

                                </Card.Title>
                            </Row>
                            <Button variant='dark'href={`/invoice/${value._id}`}>Download Invoice As PDF</Button>
                        </Card.Body>
                    </Card>
                )
            }):""}

            </Container>
        <br></br>
        </div>
        <Footer/>
        </div>
    )
}
