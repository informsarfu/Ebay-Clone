import React, {useState,useEffect} from "react";
import axios from "axios";
import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [cart,setCart] = useState([]);

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
        console.log(products);
    }, [products]);


    const handleSearch = (event) => {
        setSearchItem(event.target.value);
    };

    const handleCategory = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleCart = (item) => {
        setCart([...cart,item]);
    };

    const filteredProducts = products.filter(product => {
        if(!selectedCategory || selectedCategory === 'All Category'){
            return product.title.toLowerCase().includes(searchItem.toLowerCase())
        }
        else{
            return product.title.toLowerCase().includes(searchItem.toLowerCase()) && 
            product.category.toLowerCase() === selectedCategory.toLowerCase();
        }
    });

    const categories = Array.from(new Set(products.map(product => product.category)));


    return (
        <div className="product-list">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchItem}
                    onChange={handleSearch}
                />
                <select value={selectedCategory} onChange={handleCategory}>
                    <option value="">All Category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cart">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </div>
            <div className="grid-container">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.thumbnail} alt={product.title} />
                        <div className="product-details">
                            <h3>{product.title}</h3>
                            <br></br>
                            <p><strong>Description: </strong>{product.description}</p>
                            <br></br>
                            <div className="price-rating">
                                <p><strong>Category: </strong>{product.category}</p>
                                <p><strong>Price: </strong>${product.price}</p>
                                <p><strong>Rating: </strong>{product.rating}</p>
                            </div>
                            <br></br>
                            <div className="buttonContainer">
                                <button onClick={() => handleCart(product)} >Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      );
}

export default ProductList;