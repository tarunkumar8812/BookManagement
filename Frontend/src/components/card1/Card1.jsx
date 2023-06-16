import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./card1.css"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const Card1 = ({ heading, field, val, sort }) => {

    const navigate = useNavigate()


    const [data, setData] = useState([])
    const [slider, setSlider] = useState(0)
    const [loading, setLoading] = useState(true)


    const handleSlider = (dir) => {
        if (dir === "r") {
            setSlider(slider - 1)
            console.log(slider);
            // console.log(window.innerWidth - 350)

        }
        if (dir === "l") {
            setSlider(slider + 1)
            console.log(slider);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            // api calling using axios
            const res = await axios.get(`https://bookmanagementserver.onrender.com/user/getAllBooks`)
            // const res = await res.json
            // console.log(res.data.bookList);
            setLoading(false)
            setData(res.data.bookList)
        }
        fetchData()
    }, [])

    // see all button logic
    const handleFilter = () => {
        let temp = {}
        temp[field] = val
        navigate("/searchresults", { state: temp })
    }



    return (
        <>

            {loading &&
                <div class="card1_loading">
                    <FontAwesomeIcon icon={faSpinner} spin size="xl" /> <p> Loading...</p>
                </div>
            }

            {!loading && <div className='card_container'>
                {slider < 0 && <div className='arrows l_arrow' onClick={() => { handleSlider("l") }}> <img className='arrow_img' src='https://freepngimg.com/save/163768-arrow-left-free-photo/512x512' alt='l_arrow' /></div>
                }
                <div className='arrows r_arrow' onClick={() => { handleSlider("r") }}> <img className='arrow_img' src='https://www.freeiconspng.com/thumbs/arrow-icon/arrow-icon--myiconfinder-23.png' alt='r_arrow' /></div>



                <div className="heading">
                    <label className='category_heading'><h2>{heading}</h2></label>
                    <div className="seeall" onClick={handleFilter}>See All</div>
                </div>

                <div className='card_slider' style={{ left: `${slider * 150}px` }}>
                    {
                        data.filter((item) => isNaN(val) ? item[field] === val : item[field] >= val)
                            .sort((a, b) => sort ? b[field] - a[field] : "")
                            .map((book) => {
                                return (<>
                                    <div className="book_box" onClick={() => { navigate('/getbook', { state: "book" }) }}>
                                        <div className="book_img_container">
                                            <img src={book?.bookCover} alt="bookcover"></img>
                                        </div>

                                        <div className="book_details">
                                            <p className="book_title">{book?.title || "loading"}</p>
                                            <p className="book_author">{book?.author}</p>
                                            {!isNaN(val) && <p className="book_author">{book?.ratings}</p>}
                                            <div className="book_prices">
                                                <p className="discounted_price">₹{Math.round(book?.price * (100 - book?.discountPercent) / 100)}</p>

                                                {book?.discountPercent > 0 && <p className="original_price">₹{book?.price}</p>}
                                            </div>

                                            {book?.discountPercent > 0 && <p className="book_discount">{book?.discountPercent}%</p>}

                                        </div>
                                    </div>
                                </>)
                            })
                    }
                </div>
            </div>}

        </>
    )
}

export default Card1