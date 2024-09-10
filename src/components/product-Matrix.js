// src/components/ProductMatrix.js
import React from 'react';
import './product-Matrix.js'; // Import the CSS file for styling
function ProductMatrix({ rows, cols }) {
    // Create the product matrix
    const matrix = [];
    for (let i = 1; i <= rows; i++) {
        const row = [];
        for (let j = 1; j <= cols; j++) {
            row.push(i * j);
        }
        matrix.push(row);
    }

    return (
        <table>
            <tbody>
                {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function App() {
    return (
        <div>
            <h1>Product Matrix</h1>
            <ProductMatrix rows={4} cols={4} />
        </div>
    );
}

export default App;
//const ProductMatrix = () => {
//    // Sample product data
//    const products = [
//        // Add more products as needed
//    ];

//    return (
//        <div className="product-matrix">
//            {products.map((product) => (
//                <div className="product-card" key={product.id}>
//                    <img src={product.image} alt={product.name} className="product-image" />
//                    <h3 className="product-name">{product.name}</h3>
//                    <p className="product-price">${product.price.toFixed(2)}</p>
//                </div>
//            ))}
//        </div>
//    );
//};
