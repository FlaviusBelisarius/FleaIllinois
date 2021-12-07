import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../common/AuthContext"

const LoginForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const { registerUser } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            return console.log("password does not match")
        }
        try {
            setIsLoading(true)
            await registerUser(email, password)
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
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="text" name="confirm-password" id="confirm-password" onChange={e => setConfirmPassword(e.target.value)}/>
                    </div>
                    {isLoading
                        ?<Link to="" className="link-submit" onClick={handleSubmit}> Loading</Link>
                        :<Link to="" className="link-submit" onClick={handleSubmit}>Create Account</Link>
                    }
            </div>
        </form>
    )
}

export default LoginForm
