import React, {useState,useEffect} from "react";
import axios from "axios";
import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

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

    const filteredProducts = products.filter(product => {
        if(!selectedCategory || selectedCategory == 'All Category'){
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