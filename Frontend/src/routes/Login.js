import React, { useContext, useEffect } from 'react'
import LoginForm from '../components/login/LoginForm'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'



const Login = () => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })


    return (
        <>
            <LoginForm />
        </>
    )
}

export default Login