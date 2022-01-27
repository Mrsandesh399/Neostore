import React from 'react'
import Banner from './Banner'
import Footer from './Footer'
import Nav1 from './Nav'
import {  getProducts } from '../config/Proservice'
import {Card,Button,Row,Dropdown,Col} from 'react-bootstrap'
import { useState,useEffect } from 'react'

export default function Home() {
    const [product,setproduct]= useState([]);
    useEffect(()=>{
        getProducts().then((res)=>{
            console.log(res.data)
            setproduct(res.data)
        });
    },[])
    
    return (
        <div>
            <Nav1/>
             <Banner/>
             <div>
             <br></br>
             <h1> Popular Products</h1>
             
             <Col>
            
                <Row style={{ justifyContent: "center" }}>
                {product.map((value,index) =>{
                    return(
                    
                        <Card style={{ width: "20rem", margin: "1rem" }} className="container" key={index}>
                           <a href={`/productdetail/${value._id}`}> <Card.Img variant="top" src={value.product_image} height="200px" className='m-2'/> </a>
                            <Card.Body>
                                <Card.Title><a href={`/productdetail/${value._id}`}> {value.product_name} </a></Card.Title>
                                <Card.Text><b>Price:{value.product_cost}/- </b>&nbsp; &nbsp;
                                <br></br>
                                
                            </Card.Text>
                            </Card.Body>
                        </Card> )}
                )}
                
                </Row>
                </Col>
            
             </div>
             <Footer/>
            
        </div>
        
    )
}
