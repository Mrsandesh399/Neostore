import React, { useEffect, useState } from 'react'
import Nav1 from "./Nav"
import Footer from "./Footer"
import {Card,Button,Row,Container,Col} from 'react-bootstrap'
import { useParams} from 'react-router-dom'
import { productDetails,getColor } from '../config/Proservice'
import ReactImageMagnify from "react-image-magnify"
import {ShareFill, Twitter, Whatsapp,Facebook} from "react-bootstrap-icons"



export default function Productdetails() {
    const {id}= useParams();
    const[details,setDetails]= useState([]);
    const[col,setCol]=useState('');
    const [images,setimages]=useState([]);
    const [mImage,setMimage]=useState('');

    useEffect(()=>{
        productDetails(id).then((res)=>{
            setDetails([res.data]);
            setimages(res.data.subimages)
            setMimage(res.data.product_image)
            getColor(res.data.color_id).then((res)=>{
                setCol(res.data.color_code)
            })
        })
    },[])

    const addtoCart = (obj) => {
        console.log(obj.product_name);
        let item = {
            name: obj.product_name,
            price: obj.product_cost,
            image: obj.product_image,
            _id: obj._id,
            quantity: 1,
        };
        if (localStorage.getItem("mycart") !== null) {
            let arr = JSON.parse(localStorage.getItem("mycart"));
            let idArrays = [];
            arr.forEach((data) => {
                idArrays.push(data._id);
            });

            if (idArrays.includes(obj._id)) {
                // arr.forEach;
                alert("Product Already Added");
                // setItemadded(true);
            } else {
                arr.push(item);
                localStorage.setItem("mycart", JSON.stringify(arr));
                alert("Product Added to Cart");
            }
        } else {
            let arr = [];
            arr.push(item);
            localStorage.setItem("mycart", JSON.stringify(arr));
            alert("Product Added to Cart");
        }
    };
    return (
        <div>
           <Nav1/>
            <br></br>
            <div>
            <Container style={{textAlign:"left"}}>
            {details?
            details.map((item,index)=>{
                return(
                    <div key={index} className='mt-4'>
                        <Row>
                            <Col md={2}>
                                {images.map((value,index)=>{
                                    return(
                                        <div className='d-flex' key={index}>
                                        <img src={value} height="100px" width="100px" onClick={()=>setMimage(value)}/>

                                        </div>
                                    )
                                })}
                            </Col>
                            <Col md={4}>
                                <ReactImageMagnify
                                    {...{
                                        smallImage:{
                                            alt:"george",
                                            isFluidWidth:"true",
                                            src:mImage,
                                            
                                        },
                                        largeImage:{
                                            src:mImage,
                                            width:1000,
                                            height:1000,
                                        }
                                    }}
                                />
                            </Col>
                            <Col md={5}>
                            
                            
                            <Container style={{textAlign:"left",marginLeft:"50px"}}>
                            <h2>{item.product_name}</h2>
                            <hr/>
                            <div>
                            <h5>Price:={item.product_cost}/-</h5>

                             <br/>
                             <h5>Color:=</h5>
                             <svg width={20} height={20}>
                                 <rect width={20} height={20} style={{fill:`${col}`}}/>
                             </svg>
                             <br/>
                             <br/>
                             <h5>Share : <ShareFill/> </h5>
                             
                                 
                                 <Col >
                                     <Whatsapp fontSize="30px" color='green' /> 
                                        &nbsp;
                                     <Facebook fontSize="30px"color='blue'/>
                                        &nbsp;
                                      <Twitter fontSize="30px"color='lightblue'/>
                                </Col>
                                     
                                     
                                 
                             
                             
                            </div>
                            <br></br>
                            <Button variant='secondary' onClick={()=>addtoCart(item)}>Add To Cart</Button>
                            &nbsp;
                            <Button variant='primary'>Ratings</Button>
                           

                            </Container>
                            </Col>
                        </Row>

                    </div>
                )
            }):""}

            </Container>
            </div>
            
            <br></br>
            <Footer/>
        </div>
    )
}
