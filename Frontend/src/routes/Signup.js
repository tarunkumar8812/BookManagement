import React, { useContext, useEffect } from 'react'
import SignupForm from '../components/signupform/SignupForm'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const Signup = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })


    return (
        <>
            <SignupForm />
        </>
    )
}

export default Signup