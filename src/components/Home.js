import React, { useState,useEffect} from 'react';
import NavHeader from './NavHeader'; // Import the NavHeader

const ImgageDisplay = () => {
    const [imageUrl, setImageUrl] = useState(null);
    
}
const Home = () => {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        console.log(11111)
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const res = await response.json();
                console.log(res);
                setProducts(res);
            } catch {
                console.error('Error from Home in Frontend');
            }
        }
        fetchProducts();
    })
    
    return (
        <div>
            <NavHeader /> {/* This will render the navigation header */}
            <h1>Home Page</h1> {/* Ensure this content is present */}
            <p>Welcome to the Home Page</p>
            <div>
                <h4>here be heathens</h4>
                <img src="/Homepage_pic.jpg" alt="Home Page Visual" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>

        </div>
    );
};

export default Home;