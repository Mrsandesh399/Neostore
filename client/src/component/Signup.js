import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import Nav1 from "./Nav";
import { signup } from "../config/Myservices";
import Footer from "./Footer";

const regForName = /^[a-zA-Z]{2,100}$/;
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const regForPassword = RegExp(
  /^(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z])(?!.\s).{8,25}$/
);
const regforContact=RegExp(/^[0-9]{10}$/);

export default function Form1() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    errors: {
     firstname: "",
     lastname:"",
      email: "",
      password: "",
      cpassword: "",
      contact:"",
    },
  });
  const [data, setData] = useState({
    firstname: "",
    lastname:"",
    email: "",
    password: "",
    contact:"",

  });
  const onChangeUser = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case "firstname":
        errors.firstname = regForName.test(value)
          ? ""
          : "Name should contain only letters and minimum length should be 2 characters";
        break;

        case "lastname":
        errors.lastname = regForName.test(value)
          ? ""
          : "Name should contain only letters and minimum length should be 2 characters";
        break;

      

      case "email":
        errors.email = regForEmail.test(value) ? "" : "Enter Valid Email";
        break;

        case "contact":
          errors.contact=regforContact.test(value) ?"" : "Enter valid contact Number";
          break;

      case "password":
        errors.password = regForPassword.test(value)
          ? ""
          : "Password must be between 8-25 characters and should contain atleast one lowercase letter, one uppercase letter and one special character";
        break;

      case "cpassword":
        errors.cpassword =
          document.getElementById("password").value === value
            ? ""
            : "Password and confirm password should be same";
        break;
      default:
        alert("Fill proper details");
    }
    setState({ errors, [name]: value });
    setData({ ...data, [name]: value });
  };
  const formSubmit = (e) =>{
    e.preventDefault();
    console.log(data);
    signup(data).then(res=>{
      if (res.data.err==0){
        alert(res.data.msg)
        console.log(res.data)
        localStorage.setItem("user",JSON.stringify(data));
        navigate("/login")
      }
      if(res.data.err==1){
        alert(res.data.msg)
        console.log(res.data)
      } 
    })
  
  
  
    if (validate(state.errors)) {
      console.log("helllo");
      const formData = {
       firstname: data.firstname,
       lastname: data.lastname,
        email: data.email,
        contact:data.contact,
        password: data.password,
      };
      console.log(formData);

     /*  axios
        .post(URL, formData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        }); */
      alert("Form Submitted");
    };
  }
  
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  return (
    <div>
    <Nav1/>
    <br/>
      <Container >
        <h2 className="text-center">Registration Form</h2>
        <Form
          style={{marginTop: "5vh",
          marginLeft: "40vh",
          width: "100vh",
          border: "1px solid black",
          padding: "5vh",
          borderRadius: "10px"}}
          onSubmit={(e)=>formSubmit(e)}
        >
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              name="firstname"
              onChange={onChangeUser}
            />
            <Form.Text>
              {state.errors.firstname.length > 0 && (
                <span style={{ color: "red" }}>{state.errors.firstname}</span>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              name="lastname"
              onChange={onChangeUser}
            />
            <Form.Text>
              {state.errors.lastname.length > 0 && (
                <span style={{ color: "red" }}>{state.errors.lastname}</span>
              )}
            </Form.Text>
          </Form.Group>
        
          
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              placeholder="Enter email address"
              onChange={onChangeUser}
            />
            <Form.Text>
              {state.errors.email.length > 0 && (
                <span style={{ color: "red" }}>{state.errors.email}</span>
              )}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3 " >
                                <Form.Label>Contact</Form.Label>
                                <Form.Control type="string" placeholder="Enter Contact Number" name="contact" id="contact" onChange={onChangeUser} required/>
                                <Form.Text>
                                    {state.errors.contact.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.contact}</span>)}
                                </Form.Text>
                            </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={onChangeUser}
            />
            <Form.Text>
              {state.errors.password.length > 0 && (
                <span style={{ color: "red" }}>{state.errors.password}</span>
              )}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="cpassword"
              type="password"
              placeholder="Re-enter Password"
              onChange={onChangeUser}
            />
            <Form.Text>
              {state.errors.cpassword.length > 0 && (
                <span style={{ color: "red" }}>{state.errors.cpassword}</span>
              )}
            </Form.Text>
          </Form.Group>
          <br></br>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <br></br>
            <Button
              variant="link"
              type="button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Already have an account? Click Here
            </Button>
          </div>
        </Form>
      </Container>
      <br></br>
      <Footer/>
    </div>
  );
}