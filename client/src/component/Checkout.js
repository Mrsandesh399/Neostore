import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Dropdown,Card, Row,Col } from "react-bootstrap";
import Footer from './Footer';
import Nav1 from './Nav';
import {getUser} from "../config/Myservices"
import { useNavigate } from 'react-router-dom';
import {addOrder} from "../config/Proservice"
import {addCart} from "../config/Myservices"
import jwt_decode from "jwt-decode"
import Validation from './Validation';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';


export default function Checkout() {
    const nav= useNavigate();
    const[selected,setSelected]= useState([]);
    const[address,setAddress]=useState([]);
    let token = localStorage.getItem("_token");
    let decode= jwt_decode(token);
    let email=decode.uid;

    let subtotal=JSON.parse(localStorage.getItem("subtotal"));
    let gst=JSON.parse(localStorage.getItem("gst"));
    let total=JSON.parse(localStorage.getItem("total"));
    let cart1=JSON.parse(localStorage.getItem("mycart"));

    const formLogin = () => {
        let data = {
            email,
            total,
            subtotal,
            gst,
            values,
            selected,
            cart1,
        };
    

    addOrder(data).then((res)=>{
        if (res.data.flag===1){
            localStorage.removeItem("mycart");
            localStorage.removeItem("total");
            localStorage.removeItem("gst");
            localStorage.removeItem("subtotal");
            let cart=[];
            let data={
                email,cart,
            };
            addCart(data).then((res)=>{});
            alert("Your Order Placed Successfully");
            nav('/');

        }
    })

};

const {handler,values,errors,handleSubmit}= Validation(formLogin);

const display = (value)=>{
    let deliveryAddress= 
    value.address +
    ","+
    value.city+
    ","+
    value.pincode+
    ","+
    value.state +
    ","+
    value.country;
    setSelected(deliveryAddress);

};

useEffect(()=>{

    getUser(email).then((res)=>{
        console.log(res.data)
        setAddress(res.data.addresses);
    })
},[]);
console.log(address)

    return (
        <div>

        <Nav1/>
        <br></br>
        <div>
        <Container>
        <Dropdown >
  <Dropdown.Toggle variant="primary" id="dropdown-basic" >
  {selected.length===0
  ? "Select Address"
  : selected}

  </Dropdown.Toggle>

  <Dropdown.Menu style={{overflowY:"scroll", maxHeight:"400px"}}>
  
      
        <Dropdown.Item
        onClick={()=>nav("/address")}>Address</Dropdown.Item>

        {address.map((value,index)=>{
            return(
                <div key={index}>
                    <DropdownItem 
                    onClick={()=>display(value)}
                    className='dropdown-item'>

                    {value.address},{value.city} -{" "}
                    {value.pincode},{value.state}{" "},
                    {value.country}

                    </DropdownItem>
                </div>
            )
        })}
 
   
  </Dropdown.Menu>
</Dropdown>
        </Container>
<br/>

<Container >
<Row >
<Col md={6}>
            <Card style={{width:"20rem" , margin:"2rem", padding:"1rem"}}>
            <h5>Review Order</h5>
            <br/>
            <h6 className="text-right">
                    Subtotal:{subtotal.toFixed(2)}
                   
                </h6>
                <hr/>
                <h6 className="text-right">
                    GST 18%:{gst.toFixed(2)}
                   {/*  {total.reduce((result, number) => result + number)} */}
                </h6>
                <hr/>
                <h6 className="text-right">
                    Order Total:{total.toFixed(2)}
                   
                </h6>

                        
                </Card>
                </Col>
                <Col md={6}>
                <Form.Label style={{fontWeight:"bold"}}>Credit Card Number</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter credit card details"
                    name='card'
                    onChange={handler}
                />
                <Form.Text>
                    {errors.card &&(
                        <p style={{color:"red",fontWeight:"bold",
                        }}
                    
                    >
                    {errors.card}
                    </p>
                    )}
                </Form.Text>
                <br />
                <Button variant='success'
                onClick={(e)=>handleSubmit(e)}>
                    Confirm And Buy
                </Button>
                </Col>
             </Row> 
            </Container>
           
            <br></br>
        </div>
       
        <Footer/>
        </div>
    )
}
