import React, {useState,useEffect} from "react";
import axios from "axios";
import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async()=> {
            try{
                const response = await axios.get('https://dummyjson.com/products',{
                });
                setProducts(response.data.products);
            }
            catch(error){
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        console.log(products[0]);
    }, [products]);

    return (
        <div className="product-list">
            <h2>Available Items</h2>
            <div className="grid-container">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.thumbnail} alt={product.title} />
                        <div className="product-details">
                            <h3>{product.title}</h3>
                            <p><strong>Description: </strong>{product.description}</p>
                            <p><strong>Price: ${product.price}</strong></p>
                            <p><strong>Rating: {product.rating}</strong></p>
                            <div className="button-container">
                                <button>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      );
}

export default ProductList;