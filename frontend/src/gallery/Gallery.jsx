import { useState, useEffect } from "react";
import axios from "axios";
import ProductGalleryItem from "./ProductGalleryItem";
import Constant from "../common/Constant";
import './Gallery.css'
import { Link } from "react-router-dom";

const Gallery = () => {
    const limit = 12
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const fetchProducts = async () => {
        await axios.get(`${Constant.API_BASE}products?page=${currentPage}&limit=${limit}`)
                    .then(res => {
                        setProducts(res.data)
                        console.log(products)
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
    }, [currentPage])

    return (
        <div className="Gallery">
            <div className="container-gallery">
                {products.map((product) => (
                    <ProductGalleryItem key={product.id} product={product} />
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