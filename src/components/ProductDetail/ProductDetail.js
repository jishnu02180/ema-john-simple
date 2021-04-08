import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    //const product = fakeData.find(pd => pd.key === productKey);
    const [product,setProduct] = useState({});
    useEffect(() =>{
        fetch('https://peaceful-forest-98611.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data =>setProduct(data))

    },[productKey])
    return (
        <div>
            <h1>{productKey} details is coming soon</h1>
            <Product showAddTocart ={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;