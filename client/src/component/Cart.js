import React from 'react';
import { Button, Container, Table, Form, Row, Col,Card } from "react-bootstrap";
import Nav1 from "../component/Nav"
import Footer from "../component/Footer"
import  { useEffect,  useState } from "react";
import { useNavigate } from "react-router";
import jwt_decode from 'jwt-decode';



export default function Cart() {
    let token =
        localStorage.getItem("_token") !== undefined
            ? localStorage.getItem("_token")
            : "";
    let decode;
    let email;
    if (token !== null) {
        decode = jwt_decode(token);
        email = decode.oid;
    }

    const proceed = () => {
        if (token !== null) {
            localStorage.setItem("subtotal", amount);
            localStorage.setItem("gst", gst);
            localStorage.setItem("total", grandtotal);
            navigate("/checkout");
        } else {
            alert("Login to buy");
            navigate("/login");
        }
    }

    let items=[];
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    
    let total = [0];
    const [quantity, setQuantity] = useState("");
    useEffect(() => {
        let cartItems = JSON.parse(localStorage.getItem("mycart"));
        setCart(cartItems);
    }, []);
    console.log(cart);

    const onChangeHandler = (event) => {
        setQuantity(event.target.value);
        console.log(event.target.value);
    };

    let amount;
    let gst;
    let grandtotal;

    const onAdd = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist) {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...exist, quantity: exist.quantity + 1 }
                        : item
                )
            );
            localStorage.setItem("mycart", JSON.stringify(cart));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const onRemove = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist.quantity === 1) {
            // setCart(cart.filter((item) => item._id !== product._id));
        } else {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...exist, quantity: exist.quantity - 1 }
                        : item
                )
            );
            localStorage.setItem("mycart", JSON.stringify(cart));
        }
    };

    const onDelete = (index) => {
        let lstore = JSON.parse(localStorage.getItem("mycart"));
        lstore.splice(index, 1);
        console.log(lstore);
        let setStore = JSON.stringify(lstore);
        localStorage.setItem("mycart", setStore);
        setCart(lstore);
    };
    return (
        <div>
        <Nav1/>
        <br></br>
        <div>
        <Container style={{ backgroundColor: "lightgray" }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart
                            ? cart.map((value, index) => {
                                  return (
                                      <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{value.name}</td>
                                          <td ><img height="100px" width="100px" src={value.image}/></td>
                                          <td>{value.price}/-</td>
                                          <td>
                                              <Row>
                                                  <Col>
                                                      <Button
                                                          variant="dark"
                                                          onClick={() =>
                                                              onRemove(value)
                                                          }
                                                      >
                                                          -
                                                      </Button>
                                                  </Col>
                                                  <Col>
                                                      <Form.Control
                                                          type="number"
                                                          placeholder="Enter quantity"
                                                          min="1"
                                                          max="20"
                                                          value={value.quantity}
                                                         
                                                      />
                                                  </Col>
                                                  <Col>
                                                      <Button
                                                          variant="dark"
                                                          onClick={() =>
                                                              onAdd(value)
                                                          }
                                                      >
                                                          +
                                                      </Button>
                                                  </Col>
                                              </Row>
                                          </td>
                                          <td>
                                              {value.quantity * value.price}
                                          </td>
                                          <td>
                                              <Button
                                                  variant="danger"
                                                  onClick={() =>
                                                      onDelete(index)
                                                  }
                                              >
                                                  Delete
                                              </Button>
                                          </td>
                                          {console.log(
                                              total.push(
                                                  value.price * value.quantity
                                              )
                                          )}
                                      </tr>
                                  );
                              })
                            : ""}
                    </tbody>
                </Table>
               
                
            </Container>
            <Container>
            <Card style={{width:"20rem" , margin:"2rem", padding:"1rem",textAlign:"right"}}>
            <h5>Review Order</h5>
            <br/>
            <h6 className="text-right">
                    Subtotal:{" "}
                    {(amount=total.reduce((result, number) => result + number)).toFixed(2)}
                </h6>
                <hr/>
                <h6 className="text-right">
                {" "}
                    GST 18%:{" "}
                   {(gst=(amount * 18 ) / 100).toFixed(2) }
                </h6>
                <hr/>
                <h6 className="text-right">
                     Total:{" "}
                   {(grandtotal=(amount + gst).toFixed(2))}
                   {" "}
                </h6>
               <br></br>
                <Button variant='dark' onClick={()=>proceed()}>Proceed To Buy</Button>
                </Card>
            </Container>
        </div>
        <br></br>
        <Footer/>
        </div>
    )
}
