import React, { useEffect } from 'react'
import Nav1 from "./Nav"
import Footer from "./Footer"
import {Card,Button,Row,Dropdown,Col} from 'react-bootstrap'
import { useState } from 'react'
import { getAllCategory, getAllColor, getProducts } from '../config/Proservice'
import {useNavigate } from 'react-router-dom'


export default function Products() {
    const navigate = useNavigate();
    const [product,setproduct]= useState([]);
    const [item,setitem]=useState('');
    const [color,setColor]=useState([]);
    const [category,setCategory]=useState([]);
    useEffect(()=>{
        getProducts().then((res)=>{
            console.log(res.data)
            setproduct(res.data)
        });
        getAllColor().then(res=>{
            setColor(res.data)
        });
        getAllCategory().then(res=>{
            setCategory(res.data)
        })
    },[])

    const ByCategory=(id)=>{
        getProducts().then(res=>{
            const categories=res.data.filter((items)=>{
                return items.category_id === id ;
            });
            setproduct(categories);
        })
    }

    const ByColor=(id)=>{
        getProducts().then(res=>{
            const colors=res.data.filter((items)=>{
                return items.color_id === id ;
            });
            setproduct(colors);
        })

    }

    const addtoCart = (obj) => {
        console.log(obj.product_name);
        let item = {
            name: obj.product_name,
            image:obj.product_image,
            price: obj.product_cost,
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
        <Col md={2}>
        <Button variant='secondary' onClick={()=>{navigate("/products")}}>All Products</Button>
        <br></br>
        <br></br>
            <Dropdown >
  <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
    Color
  </Dropdown.Toggle>

  <Dropdown.Menu>
  {color.map((value,index)=>{
      return (
        <Dropdown.Item onClick={()=>ByColor(value._id)} > {value.color_name}</Dropdown.Item>
      )
  })}
   
  </Dropdown.Menu>
</Dropdown>
<br></br>
         <Dropdown >
  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
    Category
  </Dropdown.Toggle>

  <Dropdown.Menu>
  { category.map((value,index)=>{
      return(
    <Dropdown.Item onClick={()=>ByCategory(value._id)}>{value.category_name}</Dropdown.Item>
      )
  })}
   
    
  </Dropdown.Menu>
</Dropdown>
</Col>
 <Col>
            <h2>Products</h2>
                <Row style={{ justifyContent: "center" }}>
                {product.map((value,index) =>{
                    return(
                    
                        <Card style={{ width: "20rem", margin: "1rem" }} className="container" key={index}>
                           <a href={`/productdetail/${value._id}`}> <Card.Img variant="top" src={value.product_image} height="200px" className='m-2'/> </a>
                            <Card.Body>
                                <Card.Title><a href={`/productdetail/${value._id}`}> {value.product_name} </a></Card.Title>
                                <Card.Text><b>Price:{value.product_cost}/- </b>&nbsp; &nbsp;
                                <br></br>
                                <Button variant="primary" onClick={()=>addtoCart(value)}>Add to cart</Button>
                            </Card.Text>
                            </Card.Body>
                        </Card> )}
                )}
                
                </Row>
                </Col>
            </div>
            <br></br>
            <Footer/>
        </div>
    )
}
