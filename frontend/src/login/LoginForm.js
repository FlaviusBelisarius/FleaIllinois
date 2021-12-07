import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../common/AuthContext"


const LoginForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { loginUser } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await loginUser(email, password)
            navigate('/')
        } catch (err) {
            console.log(err.message)
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container-login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    {isLoading
                        ?<Link to="" className="link-submit" onClick={handleSubmit}> Loading</Link>
                        :<Link to="" className="link-submit" onClick={handleSubmit}> Login</Link>
                    }
                    
            </div>
        </form>
    )
}

export default LoginForm
