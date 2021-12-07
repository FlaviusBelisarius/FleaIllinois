import { Link } from 'react-router-dom'
import ProductListItem from './ProductListItem'
import './User.css'

const User = () => {
    return (
        <div className="user">
            <div className="container-user-history">
                <div className="container-user-tabs">
                    <Link to='/' className='link-user-tabs'>My Purchase</Link>
                    <Link to='/' className='link-user-tabs'>My Sell</Link>
                </div>
                <div className="container-products-list">
                    <ProductListItem/>
                    <ProductListItem/>
                    <ProductListItem/>
                </div>
            </div>

        </div>
    )
}

export default User