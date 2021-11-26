import { Link } from "react-router-dom"
import './Login.css'

const Login = () => {
    return (
        <div className="login">
            <h1>Flea Illinois</h1>
                <form>
            <div className="container-login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password"/>
                    </div>
                    <input type="submit" value="Sign in"/>
                    <div className="container-sign-up">
                        <p>New to Flea Illinois?</p>
                        <Link to='/'>Create an account</Link>
                    </div>
            </div>
                </form>
        </div>
    )
}

export default Login
