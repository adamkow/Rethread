import { Add, Remove, SettingsOverscanOutlined } from '@material-ui/icons'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'

import React, {useEffect, useState} from 'react'
import { doc, getDoc } from "firebase/firestore";
import {db, storage} from '../firebase'
import { useParams } from 'react-router-dom';

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Container = styled.div``
const Wrapper = styled.div`
    padding: 50px;
    display: flex;    
`
const ImgContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color}
    margin: 0px 5px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`

const Product = () => {

    const {cart} = useContext(CartContext)
    const {dispatch} = useContext(CartContext)  

    const {id} = useParams()
    const [item, setItem] = useState({})
    const [available, setAvailable] = useState(1)


    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {
                const docRef = doc(db, "items", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setItem(docSnap.data())
                  } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                  }

            } catch (err) {
                console.log(err)
            }
        };
        fetchData()
    }, []);


    const handleAddToCart = (value) => {
        dispatch({type:"ADD", 
        payload: item })
        console.log('cart once added', cart)
    }



    const handleIncrement = (value) => {
        const x = available + 1
        console.log(item.quantity)
        console.log('available', available)
        console.log(item)
        if (x <= item.quantity){
            setAvailable(x)
            console.log(available)
        }
    }
    const handleDecrement = (value) => {
        const x = available - 1 
        if (x <= 0){
            setAvailable(0)
        }else {
            setAvailable(x)
        }
        
    }


  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImgContainer>
            {/*image for product */}
            <Image src={item.image || "/images/clothes_placeholder.jpeg" }/>
            </ImgContainer>
            <InfoContainer>
                {/*title of the product aka product name*/}
                <Title>{item.description}</Title>
                {/*description of the product*/}
                <Desc>
                        {item.description}
                        </Desc>
                        {/*price of the product*/}
                <Price>£{item.price}</Price>
                <FilterContainer>
                    {/*options for colour*/}
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        <FilterColor color = 'black'/>
                        <FilterColor color = 'darkblue'/>
                        <FilterColor color = 'gray'/>
                    </Filter>
                    <Filter>
                        {/*available sizes*/}
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize>
                            <FilterSizeOption>XS</FilterSizeOption>
                            <FilterSizeOption>S</FilterSizeOption>
                            <FilterSizeOption>M</FilterSizeOption>
                            <FilterSizeOption>L</FilterSizeOption>
                            <FilterSizeOption>XL</FilterSizeOption>
                            <FilterSizeOption>XXL</FilterSizeOption>
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={() => handleDecrement()}/>
                        <Amount>{available}</Amount>
                        <Add onClick={() => handleIncrement()}/>
                    </AmountContainer>
                    <Button onClick={() => handleAddToCart()}>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        </Container>
  )
}

export default Product