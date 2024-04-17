import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Slider from '../components/Slider'
import styled from "styled-components";
import {db, storage} from '../firebase'
import {doc, addDoc, collection, serverTimestamp} from 'firebase/firestore';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect, useContext} from "react";
import { AuthContext } from "../context/AuthContext";


const AddItem = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [size, setSize] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [imgRef, setImgRef] = useState("")

    const {currentUser} = useContext(AuthContext)
    
    useEffect(() => {
        const uploadImage = () => {

            const name = new Date().getTime() + image.name
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        //console.log('File available at', downloadURL);
                        setImgRef(downloadURL)
                        console.log(imgRef)
                    });
                }
            );

        }
        image && uploadImage()

    }, [image])


    const handleAdd = async (e) => {
        e.preventDefault()
        try{
            const response = await addDoc(collection(db, "items"), {
                name: name,
                description: description,
                quantity: parseInt(quantity) || 1,
                category: category,
                size: size,
                price: parseInt(price),
                image: imgRef,
                seller: currentUser.uid,
                timeStamp: serverTimestamp(),
            });

            console.log(response)

        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <Navbar/>
        <Announcement />
        <Container>
        < Form className="form" onSubmit={handleAdd}>
        <Title>Add item for sale</Title>
        <Label>Product name:</Label>
        <div>
            <Input type="text" id="item.name" onChange={e => setName(e.target.value)}></Input>
        </div>  
        <Label>Product description</Label>
        <div>
            <Input type="text" id="item.description" onChange={e => setDescription(e.target.value)} ></Input>
        </div> 
        <div>
            Quantity&nbsp;
            <select name="item.quantity" id="item.quantity" onChange={e => setQuantity(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="1">5</option>
            <option value="2">6</option>
            <option value="3">7</option>
            <option value="4">8</option>
            <option value="3">9</option>
            <option value="4">10</option>
            </select>
        </div>
        <div>Category&nbsp;
            <select name="item.category" id="item.category" onChange={e => setCategory(e.target.value)}>
            <option value="tops">Tops</option>
            <option value="shirts">Shirts</option>
            <option value="jackets">Jackets</option>
            <option value="accessories">Accessories</option>
            <option value="bottoms">Bottoms</option>
             </select>
        </div> 
        <div>Size&nbsp;
            <select name="item.size" id="item.size" onChange={e => setSize(e.target.value)}>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="sl">XL</option>
            </select>
        </div>
        <div class = "price">
             Price £
            <input type="text" id="item.price" onChange={e => setPrice(e.target.value)}></input>
        </div> 
        <div>Add image</div>
        <div>
            <input type="file" id="myfile" onChange={e => setImage(e.target.files[0])}></input>
        </div> 
        <div>
         <button type="submit">Add item</button>
        </div> 

        </Form>
        </Container>
    </div>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 50vh;
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
  width: 50%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
display: flex;
justify-content: center;
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  
`;

const Label = styled.label`
    flex: 1;
    margin:normal;
    
`

const Input = styled.input`
  flex: 1;
  margin: normal;
  padding: 0.25em 1em;
  
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

const Image = styled.img`   
    width:20%;
    top: -120px;
        display:block;
    width: 100%;
`;

export default AddItem