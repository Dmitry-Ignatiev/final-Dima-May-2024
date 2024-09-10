//import React, { useState } from 'react';
//import NavHeader from './components/NavHeader'; // Import the NavHeader
//import Body from './components/Body'; // Import the Body component
//import Cart from './components/Cart'; // Ensure this path is correct

//function App() {
//    // Set initial content to 'home' so it loads by default
//    const [content, setContent] = useState('home');
//    const [cartItems, setCartItems] = useState([]);
//    const [totalPrice, setTotalPrice] = useState(0);

//    const onHomeClick = (e) => {
//        e.preventDefault(); // Prevent default link behavior
//        setContent('home'); // Set the content to home
//    };

//    const onCartClick = (e) => {
//        e.preventDefault(); // Prevent default link behavior
//        setContent('cart'); // Set the content to cart
//    };

//    const addToCart = (product) => {
//        setCartItems((prev) => {
//            // Check if the item is already in the cart
//            const existingItem = prev.find(item => item.id === product.id);

//            if (existingItem) {
//                // Item already in cart, increment quantity
//                return prev.map(item =>
//                    item.id === product.id
//                        ? { ...item, quantity: item.quantity + 1 }
//                        : item
//                );
//            } else {
//                // New item, add to cart with quantity 1
//                return [...prev, { ...product, quantity: 1 }];
//            }
//        });
//    };

//    const onSubmitOrder = async (orderData) => {
//        try {
//            const response = await fetch('http://localhost:3001/orders', {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                },
//                body: JSON.stringify(orderData),
//            });
//            if (response.ok) {
//                const result = await response.json();
//                console.log('Order submitted:', result);
//                alert('Order placed successfully!');
//                setCartItems([]); // Clear cart on success
//                setTotalPrice(0); // Reset total price
//            } else {
//                console.error('Failed to submit order');
//            }
//        } catch (error) {
//            console.error('Error submitting order:', error);
//        }
//    };

//    return (

//        <div className="App">
//            <NavHeader
//                title="Lech Lecha"
//                logo="/favicon.ico" // Provide the path to your image
//                homeLink="/" // Provide the route to the home page
//                onHomeClick={onHomeClick}
//                onCartClick={onCartClick}
//            />
//            {/* Display the Body component when content is 'home' */}
//            {content === 'home' && (
//                <Body
//                    imgSrc="/Homepage_pic.jpg"
//                    addToCart={addToCart}
//                />
//            )}

//            {/* Display the Cart component when content is 'cart' */}
//            {content === 'cart' && (
//                <Cart cartItems={cartItems}
//                    setCartItems={setCartItems}
//                    onSubmitOrder={onSubmitOrder} />
//            )}
//        </div>
//    );
//}

//export default App;
import React, { useState } from 'react';
import NavHeader from './components/NavHeader';
import Body from './components/Body';
import Cart from './components/Cart';
import About from './components/About'; // Ensure this component exists

function App() {
    const [content, setContent] = useState('home');
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const onHomeClick = (e) => {
        e.preventDefault(); // Prevent default link behavior
        setContent('home');
    };

    const onCartClick = (e) => {
        e.preventDefault(); // Prevent default link behavior
        setContent('cart');
    };

    const onAboutClick = (e) => {
        e.preventDefault(); // Prevent default link behavior
        setContent('about');
    };

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find(item => item.id === product.id);

            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const onSubmitOrder = async (orderData) => {
        try {
            const response = await fetch('http://localhost:3001/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Order submitted:', result);
                alert('Order placed successfully!');
                setCartItems([]);
                setTotalPrice(0);
            } else {
                console.error('Failed to submit order');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    return (
        <div className="App">
            <NavHeader
                title="Lech Lecha"
                logo="/favicon.ico"
                onHomeClick={onHomeClick}
                onCartClick={onCartClick}
                onAboutClick={onAboutClick} // Pass onAboutClick handler
            />

            {content === 'home' && (
                <Body
                    imgSrc="/Homepage_pic.jpg"
                    addToCart={addToCart}
                />
            )}

            {content === 'cart' && (
                <Cart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    onSubmitOrder={onSubmitOrder}
                />
            )}

            {content === 'about' && (
                <About />
            )}
        </div>
    );
}

export default App;

