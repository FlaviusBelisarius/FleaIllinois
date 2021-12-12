import { useState, useEffect } from "react";
import axios from "axios";
import ProductGalleryItem from "./ProductGalleryItem";
import Constant from "../common/Constant";
import './Gallery.css'
import { Link, useLocation } from "react-router-dom";


const Gallery = () => {
    const limit = 12
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const fetchProducts = async () => {
        let url;
        
        if(window.location.href === 'http://localhost:3000/'){
            console.log(window.location.href)
            url = `${Constant.API_BASE}/products?skip=${limit*(currentPage-1)}&limit=${limit}`
        }else{
            url = `${Constant.API_BASE}/products?where={"productName":"${window.location.href.slice(28)}"}&skip=${limit*(currentPage-1)}&limit=${limit}`
        }
        await axios.get(url)
                    .then(res => {
                        setProducts(res.data.data)
                        setIsLoading(false)
                    })
    }

    const handlePageChange = (e, offset) => {
        e.preventDefault()
        let newPage = currentPage + offset
        if (newPage > 0){
            setCurrentPage(newPage)
        }
    }
    
    useEffect (() => {
        fetchProducts()
    }, [currentPage,useLocation()])

    return (
        <div className="Gallery">
            <div className="container-gallery">
                {products.map((product) => (
                    <ProductGalleryItem key={product._id} product={product} />
                ))}
            </div>
            <div className="container-pagination">
                <Link to='' onClick={e => handlePageChange(e, -1)}>Prev</Link>
                <p>{currentPage}</p>
                <Link to='' onClick={e => handlePageChange(e, 1)}>Next</Link>
            </div>
        </div>
    )
}

export default Gallery