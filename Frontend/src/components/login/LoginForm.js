import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./loginform.css"
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";


const Loginform = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [credential, setCredential] = useState({ email: "", password: "" })
    // console.log(location.state);

    // to make input field  dynamic
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    // ----------------- handle user login -----------------
    const { loading, error, authDispatch } = useContext(AuthContext)


    const handleSubmit = async (e) => {
        e.preventDefault()
        authDispatch({ type: "LOGIN_START" })

        await axios.post("https://silly-wisp-bcad1a.netlify.app/user/login", {
            email: credential.email, password: credential.password
        }).then((response) => {
            // console.log("response", response);
            authDispatch({ type: "LOGIN_SUCCESS", payload: response.data })
            navigate(location.state || "/")
        }, (error) => {
            // console.log(error.message);
            authDispatch({ type: "LOGIN_FAILURE", payload: "opps wrong credentials!!" })
        });
    }

    return (
        <>
            {loading && <div className='loading'><p><FontAwesomeIcon icon={faSpinner} spin size="xl" style={{ color: "#ffffff", }} /> loading...</p></div>}

            <div className='l-form'>
                <div className="container">
                    <div className="title">Login</div>
                    <form onSubmit={handleSubmit}>
                        <div className="user__details">

                            <div className="input__box">
                                <label htmlFor='email' className="details">Email</label>
                                <input type="text" autoComplete='on' placeholder="abc@hotmail.com" required name='email' defaultValue={credential.email} onChange={onChange} />
                            </div>

                            <div className="input__box">
                                <label htmlFor='password' className="details">Password</label>
                                <input type="password" autoComplete='on' placeholder="********" required name='password' defaultValue={credential.password} onChange={onChange} />
                            </div>

                            <div className='forgotPass'>
                                {error && <p className='error'>{error}</p>}
                                <p className='forgotPassword'><Link>Forgot Password</Link> </p>
                            </div>
                        </div>

                        <div className="buttons">
                            <button className="button" disabled={loading}>
                                <input type="submit" value="Login" />
                            </button>
                            <button className="button" disabled={loading}>
                                <Link to="/signup"><input type="submit" value="I'm a new User" /></Link>
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Loginform