import { FavoriteBorderOutlined, VisibilityOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { Link, useNavigate} from "react-router-dom";
import ReactDOM from 'react-dom';

import { Add, Remove } from "@material-ui/icons";
import {mobile} from "../responsive";


import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { getRedirectResult } from "firebase/auth";



const CartItem = ({item}) => {

  const {cart} = useContext(CartContext)
  const {dispatch} = useContext(CartContext)  
  const [available, setAvailable] = useState(1)

  const navigate = useNavigate()

  const handleDecrement = (value) => {
    console.log('button pressed')
    dispatch({type:"REMOVE", 
        payload: item})
    navigate('/')
    
  }

  return (
    <Item>
    <ItemDetail>
    <Link to={`/items/${item.id}`} style={{ color: 'black', textDecoration: 'none'}}>
      <Image src={item.image || "/images/clothes_placeholder.jpeg" }/>
      </Link>
      <Details>
        <ItemName>
          <b>Item:</b> {item.name}
        </ItemName>
        <ItemId>
          <b>Item Ref:</b> {item.id}
        </ItemId>
        <ItemSize>
          <b>Size:</b> {item.size}
        </ItemSize>
      </Details>
    </ItemDetail>
    <PriceDetail>
      <ItemAmountContainer>
        <Add/>
        <ItemAmount>1</ItemAmount>
        <Remove onClick={() => handleDecrement()}/>
      </ItemAmountContainer>
      <ItemPrice>£{item.price}</ItemPrice>
    </PriceDetail>
  </Item>
  
  )
}


const Item = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ItemDetail = styled.div`
  flex: 2;
  display: flex;
  padding: 20px;
`;

const Image = styled.img`
  width: 75px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ItemName = styled.span``;

const ItemId = styled.span``;

const ItemSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ItemAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ItemPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;


export default CartItem