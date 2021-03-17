import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    return (
        <div>
            <h4>{name}</h4>
            <p>quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <button className="main-button"
            onClick={()=>{props.removeProduct(key)}}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;