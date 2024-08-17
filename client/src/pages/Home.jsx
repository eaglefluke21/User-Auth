import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getRoleFromToken from "../utils/getRoleFromToken";
import axios from "axios";

function Home() {


// check user Role 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndNavigate = async () => {
            const role = await getRoleFromToken();
            if (role === 'user' || role === 'admin') {
                console.log("Welcome");
            } else {
                navigate('/');
            }
        };

        fetchAndNavigate();
    }, [navigate]);

    const [products, setProducts] = useState([]);

   

   
// Fetch Products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/products?limit=20');
            console.log("products ", response.data.products);
            setProducts(response.data.products);
        } catch (error) {
            console.log("Error fetching the products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


// Add new Product 

    const [newProduct, setNewProduct] = useState({
        title: '',
        price: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const [successMessage, setSuccessMessage] = useState('');

    const addProduct = async () => {
        try {
            const response = await axios.post('https://dummyjson.com/products/add', newProduct, {
                headers: { 'Content-Type': 'application/json' }
            });

            setSuccessMessage(`Product added successfully! ID: ${response.data.id}`);
            console.log("Added product: ", response.data);

          
            setProducts((prevProducts) => [...prevProducts, response.data]);

            
            setNewProduct({
                title: '',
                price: '',
            });
        } catch (error) {
            console.error("Error adding the product: ", error);
            setSuccessMessage('Failed to add product.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct();
    };

        // Delete Product
        const deleteProduct = async (id) => {
            try {
                const response = await axios.delete(`https://dummyjson.com/products/${id}`);
                console.log("Deleted product: ", response.data);
    
                // Remove the deleted product from the products list
                setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    
                setSuccessMessage(`Product deleted successfully!`);
            } catch (error) {
                console.error("Error deleting the product: ", error);
                setSuccessMessage('Failed to delete product.');
            }
        };
    

        // select Product 

        const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');


    // Fetch Categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/products/categories');
            console.log("categories ", response.data);
            setCategories(response.data);
        } catch (error) {
            console.log("Error fetching the categories:", error);
        }
    };

    // Fetch Products by Category
    const fetchProductsByCategory = async (category) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
            console.log("products ", response.data.products);
            setProducts(response.data.products);
        } catch (error) {
            console.log("Error fetching the products:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        fetchProductsByCategory(category);
    };
    
    return (
        <div className="flex flex-col min-h-screen ">

            <Header />

            <div className="flex flex-col items-center flex-grow justify-center rounded-lg bg-stone-600 lg:pb-0">

                <h1 className="sm:text-3xl text-xl text-center font-anta text-gray-200 py-4 ">
                    Product Management
                </h1>






{/* Add new Products  */}

                <div className="flex flex-col text-white text-center gap-3">
                    
                    <form  onSubmit={handleSubmit}>
                        <div className="font-quick flex flex-row gap-2 p-2" >
                        <div className="flex flex-col">
                            <label>Title:</label>
                            <input className="rounded-md font-quick font-bold w-32 sm:w-72 sm:py-2 text-black"
                                type="text"
                                name="title"
                                value={newProduct.title}
                                onChange={handleInputChange}
                                
                            />
                        </div>
                        <div className="flex flex-col">
                            <label >Price:</label>
                            <input className="rounded-md font-quick font-bold w-32 sm:w-72 sm:py-2 text-black"
                                type="number"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        </div>
                        <button className="p-2 rounded-md bg-sky-400 font-medium  font-quick text-white sm:w-72" type="submit">Add Product</button>
                    </form>
                    {successMessage && <p className="text-sky-400 font-quick text-xl">{successMessage}</p>}
                </div>




                {/* Select Products Category  */}

                <div className="flex flex-col font-quick gap-2 my-4 items-center justify-center">
                    <h1 className="text-white text-lg font-medium">Select Category</h1>
                    <select className="rounded-md py-2" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>


{/* Displaying Fetched Products */}

                <ul className="flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-center justify-center py-10">
                    {products.map(product => (
                        <li className="bg-emerald-300 font-quick text-black p-2 rounded-md text-center w-72" key={product.id}>
                            <p className="font-semibold ">{product.title}</p>
                            <p className="font-bold ">${product.price}</p>

                            <button 
                                className="mt-2 px-8 bg-black font-quick text-white p-1 rounded"
                                onClick={() => deleteProduct(product.id)}
                            >
                                Delete
                            </button>

                        </li>
                    ))}
                </ul>

            </div>

            <Footer />

        </div>
    );
}

export default Home;
