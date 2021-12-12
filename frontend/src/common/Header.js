import { Fragment } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../common/AuthContext"
import './Header.css'
import { useState, useEffect } from "react";

const Header = () => {
    const { currentUser, logoutUser } = useAuth()
    console.log("user: ", currentUser)

    const [queryInput, setQueryInput] = useState("")
    // var query = "a"
    // var query = 1
    const handleQueryChange = (input) => {
        // query = input
        setQueryInput(input)
        console.log(`/?name=`+queryInput)
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
                // value={query}
                onChange={event => handleQueryChange(event.target.value)}
                placeholder="search items here"
                id='input-search-bar'
            />
            <Link to={`/?name=${queryInput}`} > search </Link>
            {/* <input type="submit" value="Search" /> */}

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


// const Header = () => {
//     const { currentUser, logoutUser } = useAuth()
//     console.log("user: ", currentUser)

//     const handleLogout = (e) => {
//         e.preventDefault()
//         logoutUser()
//     }

//     return (
//         <header className='header'>
//             <Link to='/' className='link-heading'><h1>Flea Illinois</h1></Link>
//             <form className='form-search-bar'>
//                 <input type="text" id='input-search-bar'/>
//                 <input type="submit" value="Search" />
//             </form>
//             <div className="container-headings">
//                 {currentUser 
//                     ? <Fragment>
//                         <Link to='/post' className='link-heading'>Post Product</Link>
//                         <Link to='/user' className='link-heading'>My account</Link>
//                         <Link to='' className='link-heading' onClick={handleLogout}>Logout</Link>
//                     </Fragment>
//                     : <Link to='/login' className='link-heading'>Login</Link>
//                 }
//             </div>
//         </header>
//     )
// }

// export default Header