import React from 'react'

import "./pagenotfound.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const PageNotFound = () => {
    return (
        <div className='pagenotfound'>
            <FontAwesomeIcon icon={faExclamationTriangle}
                size="xl" style={{ color: "grey", }} />
            <p> Error 404, Opps Page Not Found</p>
        </div>
    )
}

export default PageNotFound