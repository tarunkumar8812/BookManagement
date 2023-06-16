import "./books.css"

import React from 'react'
import Card1 from '../card1/Card1'

const Books = () => {

    return (
        <>



            <div className='book_container'  >
                {/* {loading && <div className='page_loading' ><p><FontAwesomeIcon icon={faSpinner} spin size="xl" style={{ color: "#ffffff", }} /> loading...</p>
                </div>
                } */}

                <div>
                    <Card1 heading="Top Rated Books" field="ratings" val={2} sort={true} />
                    <Card1 heading="Novel" field="category" val="novel" />
                    <Card1 heading="Biography" field="category" val="biography" />
                    <Card1 heading="Humour" field="category" val="humour" />
                    <Card1 heading="Best Offers" field="discountPercent" val={10} sort={true} />
                    <Card1 heading="Hindi Books" field="language" val="hindi" />
                    <Card1 heading="English Books" field="language" val="english" />
                </div>
            </div>

        </>
    )
}

export default Books

