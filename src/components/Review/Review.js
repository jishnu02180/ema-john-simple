import React from 'react';
import {useState,useEffect} from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart,setCart] = useState([])
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory();
    useEffect(() =>{
      const savedCart = getDatabaseCart();
      console.log('save data',savedCart);
      const productKeys = Object.keys(savedCart);
      console.log('productKeys',productKeys);

      fetch('https://peaceful-forest-98611.herokuapp.com/productsByKeys',{
          method:'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(productKeys)
      })
      .then(res=>res.json())
      .then(data => setCart(data))
    //   const cartProducts = productKeys.map(key => {
    //       const product = fakeData.find(pd => pd.key === key);
    //       product.quantity = savedCart[key];
    //       return product;
    //   });
    //   setCart(cartProducts);
    },[]);
    const removeProduct = (productKey) => {
        console.log(productKey);
        const newCart = cart.filter(pd => pd.key != productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    const handleProceedCheckout = ()=> {
        history.push('/shipment');
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
    }

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage}></img>
    }

    return (
        <div className="twin-container">
            
            <div className="product-container">
                {
                    cart.map(product =><ReviewItem 
                        key = {product.key}
                        removeProduct = {removeProduct}
                        product={product}>{product}</ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;