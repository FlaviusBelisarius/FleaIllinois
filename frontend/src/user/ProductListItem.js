import { Link } from 'react-router-dom'
import './ProductListItem.css'

const ProductListItem = ({ product }) => {
    return (
        <div className="product-list-item">
            <img className="img-product" src={product.productImage} alt="" />
            <div className="product-detail">
                <h2 className='h2-user-product'>{product.productName}</h2>
                <Link to={`/details/${product._id}`} className='link-detail'>View Detail</Link>                            
            </div>
            <p className="product-date">{product.dateCreated}</p>
        </div>
    )
}

export default ProductListItem