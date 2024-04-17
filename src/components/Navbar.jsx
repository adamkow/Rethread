import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import {mobile} from "../responsive";

import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined, AccountCircleOutlined, LocalOfferOutlined} from '@material-ui/icons';
import { Link, Route, useNavigate} from "react-router-dom";
import {CIcon} from '@coreui/icons-react'

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

import { getAuth, signOut } from "firebase/auth";
import {auth} from '../firebase'




const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px"})}
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-item: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px"})}
`;

const Left = styled.div`
    flex:1;
    display: flex;
    align-item: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none"})}
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
    width: 90%;
    ${mobile({ width: "50px"})}
    
`;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "18px"})}

`;

const Center = styled.div`
    flex:1;
    text-align: center;
    align-item: center;
`;
const Right = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center"})}

`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}

`;

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
font-size: 14px;
cursor: pointer;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
font-size: 14px;
cursor: pointer;
list-style: none;
margin: 10px;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Image = styled.img`   
width:25%;
`;


const Navbar = () => {

    

    const {dispatch} = useContext(AuthContext)
    const {cart} = useContext(CartContext)

    const navigate = useNavigate()


    const avatar = AccountCircleOutlined
    const optionsSignIn = ["SIGN IN"];
    const optionsUser = ["PROFILE", "YOUR LISTED ITEMS", "YOUR SAVED ITEMS", "LOG OUT"]

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const {currentUser} = useContext(AuthContext)

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
        handleNavigate(value)

    };

    const handleNavigate = (e) => {
        console.log(e)
        console.log('navigated')
        if(e == "SIGN IN"){
            navigate('/login')
        }
        if(e =="YOUR LISTED ITEMS"){
            //navigate('/listed-items')
        }
        if(e == "LOG OUT"){
            handleSignOut()
           
        }
    }

    const handleSignOut = () =>{
        console.log('handled signout')
        signOut(auth).then((userCredential) => {
            // Sign-out successful.
            console.log(currentUser)
            dispatch({type:"LOGOUT", payload: currentUser})
          }).catch((error) => {
            // An error happened.
              const errorCode = error.code;
              const errorMessage = error.message;
              error = errorMessage
              console.log(error)
          });
    }


  return (
      <Container>
          <Wrapper>
              <Left>
              <Link to={`/`} style={{ color: 'black', textDecoration: 'none' }}>
                 Re-Thread
                  </Link>
              </Left>
              <Center>
                  <SearchContainer>
                      <Input placeholder='Search' />
                      <Search style={{ color: "grey", fontSize: 16 }} />
                  </SearchContainer>
              </Center>
              <Right>

                  <Link to={`/add-item`} style={{ color: 'black', textDecoration: 'none' }}>
                  <MenuItem>
                      <Badge badgeContent={'sell'} color="primary">
                          <LocalOfferOutlined/>
                      </Badge>
                  </MenuItem>
                  </Link>
                  <Link to={`/cart`} style={{ color: 'black', textDecoration: 'none' }}>
                  <MenuItem>
                     { cart ? 
                      <Badge badgeContent={cart.length} color="primary">
                          <ShoppingCartOutlined />
                      </Badge> :
                       <Badge badgeContent={0} color="primary">
                       <ShoppingCartOutlined />
                   </Badge>}
                  </MenuItem>
                  </Link>
                  <MenuItem>
                      <DropDownContainer>
                          <DropDownHeader onClick={toggling}>
                              <AccountCircleOutlined />
                          </DropDownHeader>
                          {isOpen && currentUser && (
                              <DropDownListContainer>

                                  <DropDownList>
                                      {optionsUser.map(option => (
                                          <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                                              {option}
                                          </ListItem>
                                      ))}
                                  </DropDownList>
                              </DropDownListContainer>
                          )}
                          {isOpen && !currentUser && (
                              <DropDownListContainer>

                                  <DropDownList>
                                      {optionsSignIn.map(option => (
                                          <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                                              {option}
                                          </ListItem>
                                      ))}
                                  </DropDownList>
                              </DropDownListContainer>
                          )}
                      </DropDownContainer>
                  </MenuItem >
              </Right>
          </Wrapper>
      </Container>
  )
}

export default Navbar