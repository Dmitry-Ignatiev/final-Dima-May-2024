import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Cart from './components/Cart';
import NavHeader from './components/NavHeader';
import NotFound from './components/NotFound';

const AppRouter = () => {
    return (
        <Router>
            <div>
                <NavHeader />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;
