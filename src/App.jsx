import React, {useContext, Component} from "react";
import { BrowserRouter as Router,
Routes, 
Route, 
Link, 
Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext";
import { CartContext } from "./context/CartContext";

import Register from './pages/Register';
import Login from './pages/Login';
import PaymentPaypal from './pages/PaymentPaypal'
import PaymentCard from './pages/PaymentCard';
import Product from "./pages/Product"
import ProductList from "./pages/ProductList";
import AddItem from "./pages/AddItem";
import Cart from "./pages/Cart"
import Listed from "./pages/ListedItems"


const App = () => {

  const {currentUser} = useContext(AuthContext)
  const {cart} = useContext(CartContext)
  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to ={'/login'}/>
  }


  console.log('current user', currentUser)
  console.log('current cart ', cart)

  return(
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items/:id" element={<Product />} />
        <Route path="/listed-items" element={<Listed />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/paymentpaypal" element={<PaymentPaypal />} />
        <Route path="/paymentcard" element={<PaymentCard />} />
        <Route path="/add-item" element={<RequireAuth> <AddItem /> </RequireAuth>} />
      </Routes>
    </Router>
  )


  }

export default App