import React, { useState,useEffect } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product'
import './Shop.css'
import {Link} from 'react-router-dom';

const Shop = () => {
    //const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    
    useEffect(() =>{
        fetch('https://peaceful-forest-98611.herokuapp.com/products')
        .then(res => res.json())
        .then(data =>setProducts(data))
    },[])

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        fetch('https://peaceful-forest-98611.herokuapp.com/productsByKeys',{
          method:'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(productKeys)
      })
      .then(res=>res.json())
      .then(data => setCart(data))
        // if (products.length > 0) {
        //     const previousCard = productKeys.map(existingKey =>{
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = saveCart[existingKey];
        //         return product
        //     })
        //    setCart(previousCard);
        // }
    },[])

    const handleAddProduct = (product) =>{

        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd != toBeAdded);
            newCart = [...others,sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product 
                        key ={pd.key}
                        showAddTocart ={true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to={"/review"}>
                <button className="main-button">Review Order</button>
            </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;