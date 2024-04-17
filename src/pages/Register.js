import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'
import { useState } from "react";

import { Link, Route, useNavigate} from "react-router-dom";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components";
import reactRouterDom from "react-router-dom";

import Navbar from "../components/Navbar";

const Register = () => {
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      error = errorMessage
      console.log(error)
    });
  }


  return (
      <Container>
      <Wrapper>
      <Link to={`/`} style={{ color: 'black', textDecoration: 'none' }}>
                <Image src ="/Images/unknown.png" />
        </Link>
        <Form onSubmit={handleRegister}>
          <Input placeholder="name" onChange={e=>setName(e.target.value)}/>
          <Input placeholder="last name" onChange={e=>setLastName(e.target.value)}/>
          <Input placeholder="username" onChange={e=>setUsername(e.target.value)}/>
          <Input type='email' placeholder="email" onChange={e=>setEmail(e.target.value)}/>
          <Input placeholder="password" onChange={e=>setPassword(e.target.value)}/>
          <Input placeholder="confirm password" onChange={e=>setPasswordConfirm(e.target.value)}/>
          <Buttons type='submit'>SIGN UP</Buttons>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Link to={`/login`} >ALREADY HAVE AN ACCOUNT?</Link>
        </Form>
      </Wrapper>    
    </Container>
  );
};


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
width:15%;
display: flex;
justify-content: center;
align-items: center;
flex-direction:column;
height 100 vh;
padding: 0 20px;
`;

const Form = styled.form`
  width:150%;
  max-width: 700px;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  align-items: center;
  box-shaddow: 0 , 0 , 20px , 0 rgb(0, 0, 0, 0.2);
  `;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 20px;
  border-radius: 20px;
  border: 1px solid #ddd;
  margin: 15px 0 10px 0;
  padding: 20px;
  box-sizing: border-box;
`;


const Buttons = styled.button`
    
  width: 40%;
  border: none;
  background-color: black;
  color: white;
  padding: 10px 15px;
  margin: 0px 0px 0px 20px;
  cursor: pointer;
  align-items: center;
  border-radius: 20px;
`;

const Buttons2 = styled.button`
    
  width: 40%;
  border: none;
  padding: 10px 15px;
  background-color: white;
  margin: 0px 0px 0px 20px;
  color: black;
  cursor: pointer;
  align-items: center;
  border-radius: 20px;
  border: 2px solid black;
`;

/*
const Image = styled.img`   
width:250%;
`;*/

const Image = styled.img`   
    width:20%;
    top: -120px;
        display:block;
    width: 120%;
`;


export default Register;