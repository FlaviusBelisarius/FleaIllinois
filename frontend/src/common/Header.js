import { Link } from "react-router-dom"
import './Header.css'

const Header = () => {
    return (
        <header className='header'>
            <h1>Flea Illinois</h1>
            <form className='form-search-bar'>
                <input type="text" id='input-search-bar'/>
                <input type="submit" value="Search" />
            </form>
            <div className="container-headings">
                <Link to='/user/0' className='link-heading'>Post Product</Link>
                <Link to='/user/0' className='link-heading'>My account</Link>
            </div>
        </header>
    )
}

export default Header