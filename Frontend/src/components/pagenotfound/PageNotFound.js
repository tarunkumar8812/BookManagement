import React from 'react'

import "./pagenotfound.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {

    const navigate = useNavigate()
    return (
        <div className='pagenotfound'>
            <FontAwesomeIcon icon={faExclamationTriangle}
                size="xl" style={{ color: "grey", }} />
            <p> Error 404, Opps Page Not Found</p>
            <br />
            <p style={{ fontSize: "12px" }} onClick={() => { navigate("/") }} className='goBackToHome'>go to Home Page</p>
        </div>
    )
}

export default PageNotFound