import React from 'react';
import NavHeader from './NavHeader'; // Import the NavHeader
import Body from './Body'; // Import the Body component
import './Layout.css'; // Import CSS if needed

function Layout({ children }) {
    return (
        <>
        <div>
            <NavHeader /> {/* NavHeader should be displayed at the top */}
        </div>
        <div>
            <Body/>{}
        </div>
        </>
    );
}

export default Layout;
