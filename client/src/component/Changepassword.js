import React from 'react'
import Nav1 from './Nav'
import{Container,Form,Button} from "react-bootstrap"
import { useState } from 'react'
import { changePassword } from '../config/Myservices'

export default function Changepassword() {
    const [data, setData] = useState({email:"",password:""});
    const handler=(event)=>{
      const {name,value} = event.target;
      setData({...data,[name]:value})
  }
    
    const newpass =(e)=>{
        e.preventDefault();
        
        changePassword(data).then(res=>{
            if(res.data.flag===0){
                alert(res.data.message)
            }
            if(res.data.flag===1){
                alert(res.data.message)
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
<h2 className="text-center">Change Password</h2>
<Form.Group className="mb-3">
<Form.Label>New Password </Form.Label>
<Form.Control type="text" id="newpass" name="new password" placeholder="new password" onChange={handler}/>
</Form.Group>


<br/>

<Form.Group className="mb-3">
<Form.Label>Confirm Password</Form.Label>
<Form.Control type="text" id="confirmpass" name="confirm password" placeholder="confirm password" onChange={handler}/>
</Form.Group>

<div>
<Button
 variant="danger"
 type="button"
 onClick={(e)=>newpass(e)}>
 Submit
</Button>
</div>
</Form>
</Container>

            
        </div>
    )
}
