import React, {useState,useEffect} from "react";
import axios from "axios";
import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchItem, setSearchItem] = useState("");

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

    const handleSearch = (event) => {
        setSearchItem(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchItem.toLowerCase())
    );

    return (
        <div className="product-list">
            <input
                type="text"
                placeholder="Search products..."
                value={searchItem}
                onChange={handleSearch}
            />
            <div className="grid-container">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.thumbnail} alt={product.title} />
                        <div className="product-details">
                            <h3>{product.title}</h3>
                            <br></br>
                            <p><strong>Description: </strong>{product.description}</p>
                            <br></br>
                            <p><strong>Price: ${product.price}</strong></p>
                            <p><strong>Rating: {product.rating}</strong></p>
                            <br></br>
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