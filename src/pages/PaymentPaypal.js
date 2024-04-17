import { findByLabelText } from "@testing-library/react";
import styled from "styled-components";




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
  font-size: 28px;
  font-weight: 800;
`;

const Title2 = styled.h1`
display: flex;
justify-content: center;
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
display: block;
  width: 100%;
  height: 20px;
  border-radius: 20px;
  border: 1px solid #ddd;
  margin: 0px 0 5px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const Button = styled.button`
    display: flex;
  width: 40%;
  border: none;
  padding: 10px 15px;
  background-color: black;
  margin: 0px 0px 0px 20px;
  color: white;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid black;
  margin-left:30%;
`;

const Image = styled.img`   
    width: 30%;
    display:flex;
    justify-content: center;
    margin-left:35%;
`;

const Text = styled.h2`
  font-size: 20px;
  font-weight: 100;
`;

const PaymentPaypal = () => {
  return (
    <Container> 
      <Wrapper>
        <Title>Payment Details</Title>
        <Title2>Select Payment Options</Title2>
        <Form>
          <ul>
            <li>Paypal</li>
            <li>Visa Debit</li>
          </ul>
          <Image src ="/images/Paypal.jpg" />
          <Text>Email</Text>
          <Input placeholder="email" />
          <Text>Password</Text>
          <Input placeholder="password" />
          <Button>LOGIN</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default PaymentPaypal;