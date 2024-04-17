import { findByLabelText } from "@testing-library/react";
import styled from "styled-components";
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Slider from '../components/Slider'
import { Link, useNavigate} from "react-router-dom";


import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)  


  const handleLogin = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      dispatch({type:"LOGIN", payload: user})
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
        <Title>SIGN IN TO START SELLING.</Title>
        <Form onSubmit={handleLogin}>
          <Input type='email' placeholder="email" onChange={e=>setEmail(e.target.value)}/>
          <Input placeholder="password" onChange={e=>setPassword(e.target.value)} />
          <Button2 type="submit" >LOGIN</Button2>
          {error}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Link to={''}>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link to={`/register`} >CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
display: flex;
justify-content: center;
  font-size: 16px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 20px;
`;

const Button = styled.button`
width: 40%;
  border: none;
  padding: 10px 15px;
  background-color: white;
  margin: 0px 0px 0px 20px;
  color: black;
  cursor: pointer;
  align-items: center;
  border-radius: 20px;
  border: 1px solid black;
`;

const Button2 = styled.button`
width: 40%;
  border: none;
  padding: 10px 15px;
  background-color: black;
  margin: 0px 0px 0px 20px;
  color: white;
  cursor: pointer;
  align-items: center;
  border-radius: 20px;
`;

const linkStyle = styled.a`
  margin: 5px 0px ;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Image = styled.img`   
    width:20%;
    top: -120px;
        display:block;
    width: 100%;
`;



export default Login;