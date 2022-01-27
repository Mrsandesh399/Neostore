import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Validation from "../component/Validation";
import { addAddress, getUser } from "../config/Myservices";
import jwt_decode from "jwt-decode";

export default function Address() {
    const [address, setAddress] = useState([]);
    let token = localStorage.getItem("_token");
    let decode = jwt_decode(token);
    let email = decode.uid;
    console.log(email);
    const formLogin = () => {
        let data = {
            values,
            email,
        };
        addAddress(data).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            }
        });
    };

    useEffect(() => {
        getUser(email).then((res) => {
            
            setAddress(res.data.addresses);
        });
      
    }, []);

    const { handler, values, errors, handleSubmit } = Validation(formLogin);

    return (
        <div>
            <Container>
                <Row>
                    <Col md={4}>
                    <Card className='mt-5'>
                    <Card.Body>
                        <Card.Title>
                            Sandesh Umathe
                        </Card.Title>
                        <Card.Img style={{borderRadius:"50%", width:"100px"} } variant='top' height="100px" src='./products/office2.jpg'/>
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
                    <Col md={8}>
                        <h3>Add Address</h3>
                        <hr />
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="Enter address"
                                    onChange={handler}
                                />
                                <Form.Text>
                                    {errors.address && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {errors.address}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="pincode"
                                    placeholder="Enter pincode"
                                    onChange={handler}
                                />
                                <Form.Text>
                                    {errors.pincode && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {errors.pincode}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    placeholder="Enter City"
                                    onChange={handler}
                                />
                                <Form.Text>
                                    {errors.city && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {errors.city}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="state"
                                    placeholder="Enter State"
                                    onChange={handler}
                                />
                                <Form.Text>
                                    {errors.state && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {errors.state}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    placeholder="Enter country"
                                    onChange={handler}
                                />
                                <Form.Text>
                                    {errors.country && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {errors.country}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add Address
                            </Button>
                        </Form>
                        <br />
                        <h3>Addresses</h3>
                        <hr />
                        {address ? address.map((value, index) => {
                            return (
                                <div key={index}>
                                    <Card style={{ width: "18rem" }}>
                                        <Card.Body>
                                            <Card.Text>
                                                {value.address}
                                                <br />
                                                {value.city} - {value.pincode}
                                                <br />
                                                {value.state}
                                                <br />
                                                {value.country}
                                            </Card.Text>
                                            <Button variant="success" size="sm">
                                                Edit
                                            </Button>
                                            &nbsp;
                                            <Button variant="danger" size="sm">
                                                Delete
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </div>
                            );
                        }): " "}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
