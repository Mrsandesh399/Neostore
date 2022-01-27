import React, { useState,useEffect } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Pdf from "react-to-pdf";
import { getInvoice } from  "../config/Myservices";
const ref= React.createRef();

export default function GeneratePDF() {
    const {id}= useParams()
    const [Items,setItems] = useState([]);
    const [state,setState] = useState([]);
    useEffect(() => {
        getInvoice(id).then((res) => {
            console.log(res.data)
            setItems(res.data);
            console.log(res.data.cart)
            setState(res.data.cart)
      
        });
    }, []);
    return (
        <div>
           
            <Container>
                <div className="text-center">
                <Pdf targetRef={ref} filename="invoice.pdf">
                    {({ toPdf }) => <Button variant="success" style={{marginRight:'1%'}} onClick={toPdf}>Generate PDF</Button>}
                </Pdf>
                    {/* <Button variant="success">Generate PDF</Button> &nbsp; */}
                    <Button variant="primary">Send via Email</Button>
                </div>
            </Container>
            <br />
            <Container style={{ border: "1px solid black", width: "800px" }} ref={ref}>
                <div >
                    <Row>
                        <Col md={3}>
                            <div>
                                <Image style={{padding:"20px"}} src="./images/OIP.jpg" width="150px" height="100px" />
                            </div>
                        </Col>
                        <Col md={9}>
                            <h2 style={{textAlign:"right",padding:"20px"}}>Invoice</h2>
                            <p style={{textAlign:"right",paddingRight:"20px"}}>Number : {id}</p>
                        </Col>
                    </Row>
                </div>
                <hr/>
                <div>
                    <Row>
                        <Col md={3}>
                            <p className="text-left pl-5">
                                <span style={{fontWeight: "bold",color: "gray"}}>FROM</span>
                                <br />
                                <span style={{ fontWeight: "bold" }}>NeoStore</span>
                                <br />
                                NeoStore123@hellocors.com
                                <br />
                                9876543210
                            </p>
                            <br />
                            <p className="text-left pl-5" >
                                <span style={{fontWeight: "bold",color: "gray"}}>BILL TO</span>
                                <br />
                                {state.map((value,index)=>{
                                    return (
                                        <>
                                         <span style={{ fontWeight: "bold" }}>{value.recname}</span><br/>
                                        {value.recemail}
                                        <br/>
                                        {value.reccontact}
                                        <br />
                                        {value.recaddress}
                                        </>
                                    )
                                })}
                            </p>
                        </Col>
                        <Col md={9}>
                            <p className="text-right pr-5">
                                <span style={{fontWeight: "bold",color: "gray"}}>STATUS</span>
                                <br />
                                <span style={{ fontWeight: "bold",color:"red" }}>Unpaid</span>
                                <br />
                            </p>
                            {state.map((value,index)=>{
                                return (
                                    <>
                                        <p className="text-right pr-5">
                                            <span style={{fontWeight: "bold",color: "gray"}}>DATE</span>
                                            <br />
                                            
                                            <span style={{ fontWeight: "bold" }}>{value.indate}</span>
                                            <br />
                                        </p>
                                        <p className="text-right pr-5">
                                            <span style={{fontWeight: "bold",color: "gray"}}>DUE DATE</span>
                                            <br />
                                                    <span style={{ fontWeight: "bold" }}>{value.duedate}</span>
                                                    <br />
                                        </p>
                                    </>
                                    )
                                })}
                                    
                            <p className="text-right pr-5">
                                <span style={{fontWeight: "bold",color: "gray"}}>AMOUNT</span>
                                <br />
                                <span style={{ fontWeight: "bold" }} className="display-4">2000</span>
                                <br />
                            </p>
                        </Col>
                    </Row>
                </div>
                <hr/>
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Disc(%)</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Items.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{value.title}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.price}</td>
                                    <td>{value.discount}</td>
                                    <td>{((value.price - (value.price * value.discount / 100)) * value.quantity)}</td>
                                </tr>
                            );
                        })}             
                        </tbody>
                    </Table>
                </div>
                <div>
                    <span style={{ fontWeight: "bold" }}>Payment Terms:</span>
                    <br />
                    Please pay the amount within due date.
                </div>
                <br />
            </Container>
        </div>
    );
}

