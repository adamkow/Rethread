import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import {db, storage} from '../firebase'
import {doc, getDocs, collection} from 'firebase/firestore';
import {useState, useEffect} from "react"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`;
const Products = () => {

  const[data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {
                const querySnapshot = await getDocs(collection(db, "items"));
                querySnapshot.forEach((doc) => {
                    list.push({id: doc.id, ...doc.data()})
                });
                setData(list)
                //console.log(list)

            } catch (err) {
                console.log(err)
            }
        };
        fetchData()
    }, []);


  return (
    <Container>
        {data.map((item) => (
            <Product item = {item} key = {item.id} />    
        ))}
    </Container>
  )
}

export default Products