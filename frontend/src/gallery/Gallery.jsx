import { useState, useEffect } from "react";
import axios from "axios";
import ProductGalleryItem from "./ProductGalleryItem";
import Constant from "../common/Constant";
import './Gallery.css'
import { Link, useLocation } from "react-router-dom";


const Gallery = () => {
    const [products, setProducts] = useState([])
    const [sortValue, setSortValue] = useState("date")
    const [sortOrder, setSortOrder] = useState("descending")
    const [isLoading, setIsLoading] = useState(true)

    const fetchProducts = async () => {
        let url;
        
        if(window.location.href === 'http://localhost:3000/'){
            console.log(window.location.href)
            url = `${Constant.API_BASE}/products`
        }else{
            url = `${Constant.API_BASE}/products?where={"productName":"${window.location.href.slice(28)}"}`
        }
        axios.get(url)
            .then(res => {
                setProducts(res.data.data.sort(
                    function(a, b) {
                        if(sortValue === "price"){
                            if(sortOrder === "ascending"){
                                return a.productPrice - b.productPrice
                            }else{
                                return b.productPrice - a.productPrice
                            }
                        }else{
                            if(sortOrder === "ascending"){
                                return a.dateCreated - b.dateCreated
                            }else{
                                return b.dateCreated - a.dateCreated
                            }
                        }
                    }
                ))
                setIsLoading(false)
            })
            .catch (err => {
                console.log(err.message)
            })
                    
    }

    const handleSortOrderChange = (sortOrder) => {
        setSortOrder(sortOrder);
    }
    const handleSortValueChange = (sortValue) => {
        setSortValue(sortValue);
    }
    
    useEffect (() => {
        fetchProducts()
    }, [useLocation(),sortValue, sortOrder])

    return (
        <div className="Gallery">
            <form className="form">
                <label className="sortBar">
                    &nbsp;&nbsp;&nbsp;
                    <b>Sort by</b>
                    &nbsp;
                    <select
                    value={sortValue}
                    onChange={event => handleSortValueChange(event.target.value)}
                    >
                        <option value="price">Price</option>
                        <option value="date">Release Date</option>
                        
                    </select>
                </label>

                <label className="sortBar">
                    &nbsp;&nbsp;&nbsp;
                    <b>Order</b>
                    &nbsp;
                    <select
                    value={sortOrder}
                    onChange={event => handleSortOrderChange(event.target.value)}
                    >
                        <option value="descending">Descending</option>
                        <option value="ascending">Ascending</option>
                    </select>
                </label>

            </form>

            <div className="container-gallery">
                {products.map((product) => (
                    <ProductGalleryItem key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Gallery