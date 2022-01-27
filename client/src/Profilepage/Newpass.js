import React, { useRef } from 'react'
import Nav1 from "../component/Nav"
import Footer from "../component/Footer"
import { Card, Container,Row,Col,Form,Button} from "react-bootstrap";
import { newPassword } from '../config/Myservices';
import Validation from "../component/Validation"
import jwt_decode from "jwt-decode";


export default function Newpass() {
    let token = localStorage.getItem("_token");
    let decode = jwt_decode(token);
    let email = decode.uid;
    const oldRef = useRef("");
    const UpdatePassword = ()=>{
        let data={values,email,oldRef:oldRef.current.value};
        newPassword(data).then(res=>{
            if(res.data.err){
                alert(res.data.message)
            }
            else{
                alert(res.data.message)
            }
        })
    }
    const { handler, values, errors, } = Validation();
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
                <Col md={6} className='mt-2'>   
                
                <h3>Change Password</h3>
                
                <Card >
                <Form onSubmit
style={{
width: "80vh",
padding: "5vh",
borderRadius: "10px",
}}
>
<Form.Group className="mb-3">
<Form.Label>Old Password </Form.Label>
<Form.Control type="password" id="oldpass" name="old password" placeholder="Old Password" ref={oldRef}/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>New Password </Form.Label>
<Form.Control type="password" id="password" name="password" placeholder="New Password" onChange={handler}/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Confirm Password</Form.Label>
<Form.Control type="password" id="cpassword" name="cpassword" placeholder="Confirm Password" onChange={handler} />
</Form.Group>

<div>
<Button
 variant="primary"
 type="button"
 onClick={()=>UpdatePassword()}
 >
 Submit
</Button>
</div>
</Form>
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
