import React from 'react'
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import{Container,Form,Button} from "react-bootstrap"
import Nav1 from './Nav'
import { emailSend, verifyOtp } from '../config/Myservices';

export default function Forgetpassword() {
      const emailRef = useRef();
      const otpRef=useRef('');

      const navigate=useNavigate();

      const sendOtp =(e)=>{
        e.preventDefault();
        let data={email:emailRef.current.value}
       
        emailSend(data).then((res,err)=>{
          if(res.data.err){
            alert(res.data.err)
          }
          else{
            alert(res.data.msg)
          }
        })
      }

      const otpVerifiaction =(event)=>{
        let data ={otp:otpRef.current.value}
        event.preventDefault();
        verifyOtp(data).then(res=>{
          console.log(res.data)
          if (res.data.err){
            alert(res.data.err)
          }
          else{
            alert(res.data.msg)
            navigate("/changepass")
          }
        })
      }



    return (
        <div>

        <Nav1/>
        <br></br>
    
  <Container>
   
   <Form onSubmit
     style={{
       marginTop: "5vh",
       marginLeft: "40vh",
       width: "100vh",
       border: "1px solid black",
       padding: "5vh",
       borderRadius: "10px",
     }}
   >
     <h2 className="text-center">Forget Password</h2>
     <Form.Group className="mb-3">
       <Form.Label>Email address :</Form.Label>
       <Form.Control type="text" id="email" name="email" placeholder="Enter email" ref={emailRef} />
     </Form.Group>

     <div className="text-center">
       <Button variant="primary"  onClick={(e)=>sendOtp(e)}>
         Send OTP
       </Button>

     </div>

       <br/>
    
      <Form.Group className="mb-3">
       <Form.Label>OTP :</Form.Label>
       <Form.Control type="Number" id="OTP" name="OTP" placeholder="OTP" ref={otpRef}/>
     </Form.Group>

     <div>
       <Button
         variant="danger"
         type="button"
         onClick={(event)=>otpVerifiaction(event)}
         >
         Verify OTP
       </Button>
     </div>


     
   </Form>
 </Container>
            
        </div>
    )
}
