import { Link } from 'react-router-dom'
import './ProductListItem.css'

const ProductListItem = () => {
    return (
        <div className="product-list-item">
            <img className="img-product" src="http://via.placeholder.com/200x200" alt="" />
            <div className="product-detail">
                <p>Product Name</p>
                <p>Product Name</p>                            
                <Link to='/'>View Detail</Link>                            
            </div>
            <p className="product-date">Date</p>
        </div>
    )
}

export default ProductListItem