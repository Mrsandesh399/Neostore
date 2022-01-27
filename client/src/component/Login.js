import React, { useEffect, useState } from "react";
import { Form, Button, Container,image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Nav1 from "./Nav";
import { login } from "../config/Myservices";
import Footer from "./Footer";




export default function Loginpage() {
  const navigate = useNavigate();
  const [data, setData] = useState({email:"",password:""});
  const handler=(event)=>{
    const {name,value} = event.target;
    setData({...data,[name]:value})
}
   const loginUser=(event)=>{
    event.preventDefault();
    console.log(data)
    login(data).then(res=>{
        if(res.data.err===0){
            localStorage.setItem("_token",res.data.token);
            alert(res.data.msg)
            navigate("/")
            console.log(res.data)
        }
        if(res.data.err===1){
          alert(res.data.msg)
            console.log(res.data)
        } 
    })
}

 /* const formlogin = (e)=>{
   e.preventDefault();
   login(values).then(res=>{
     console.log(res)
     if (res.data.err){
       alert(res.data.err)
     }
     else{
       alert(res.data.msg)
       nevigate("/")
     }
   })
 } */
  return (
    <>
    <Nav1 />
    <br/>
    
  
   <Container>
   
      <Form 
        style={{
          marginTop: "5vh",
          marginLeft: "40vh",
          width: "100vh",
          border: "1px solid black",
          padding: "5vh",
          borderRadius: "10px",
        }}
      >
        <h2 className="text-center">Login</h2>
        <Form.Group className="mb-3">
          <Form.Label>Email address :</Form.Label>
          <Form.Control type="text" id="email" name="email" placeholder="Enter email" onChange={handler} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password :</Form.Label>
          <Form.Control type="password" id="password" name="password" placeholder="Password" onChange={handler} />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" onClick={(event)=>loginUser(event)}>
            Submit
          </Button>

          <br/>
          
          <Button
            variant="link"
            type="button"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Don't have an account? Click Here
          </Button>
          <Button
            variant="link"
            type="button"
            onClick={() => {
              navigate("/forgetpass");
            }}
          >
            Forget Password
          </Button>

        
        </div>
        <div>
        <Button
            variant="primary"
            type="button"
            
          >
            Login With Facebook
          </Button>
          
          <Button 
            variant="danger"
            type="button"
            >
            Login With Google
          </Button>
        </div>
        
        
      </Form>

      <br></br>

      
         
    </Container>
    <div>
      <Footer/>
    </div>
    </>
  );
}