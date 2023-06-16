import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    })

    return (
        <div>Payment</div>
    )
}

export default Payment