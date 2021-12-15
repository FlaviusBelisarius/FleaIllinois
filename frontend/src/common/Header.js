import { Fragment } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../common/AuthContext"
import './Header.css'
import { useState } from "react";

const Header = () => {
    const { currentUser, logoutUser } = useAuth()
    console.log("user: ", currentUser)

    const [queryInput, setQueryInput] = useState("")
    const handleQueryChange = (input) => {
        setQueryInput(input)
    };

    const handleLogout = (e) => {
        e.preventDefault()
        logoutUser()
    }

    return (
        <header className='header'>
            <Link to='/' className='link-heading'><h1>Flea Illinois</h1></Link>
            <form className='form-search-bar'>
                <input
                    type="search"
                    onChange={event => handleQueryChange(event.target.value)}
                    placeholder="search items here"
                    id='input-search-bar'
                />
                <Link to={`/?name=${queryInput}`} className="link-heading"> search </Link>
            </form>
            <div className="container-headings">
                {currentUser 
                    ? <Fragment>
                        <Link to='/post' className='link-heading'>Post Product</Link>
                        <Link to='/user' className='link-heading'>My account</Link>
                        <Link to='' className='link-heading' onClick={handleLogout}>Logout</Link>
                    </Fragment>
                    : <Link to='/login' className='link-heading'>Login</Link>
                }
            </div>
        </header>
    )
}

export default Header