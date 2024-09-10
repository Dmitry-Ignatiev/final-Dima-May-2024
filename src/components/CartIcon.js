import React, { useState } from 'react';

const CartIcon = ({ itemCount, totalPrice, onClick }) => {
    return (
        <div className="cart-icon" onClick={onClick}>
            <i className="fas fa-shopping-cart"></i>
            <span className="item-count">{itemCount}</span>
            <span className="total-price">${totalPrice.toFixed(2)}</span>
        </div>
    );
};

export default CartIcon;