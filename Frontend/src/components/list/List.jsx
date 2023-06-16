import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./list.css"
import { faCircleXmark, faExclamationTriangle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthContext } from '../../context/AuthContext'



const List = () => {
    const location = useLocation()
    const navigate = useNavigate()
    // const url = location
    // console.log("url", location.state);
    const { user } = useContext(AuthContext)

    // const { filter, ratings, minPrice, maxPrice } = url.state
    // console.log("ratings--->>>>", ratings);

    const [pageNum, setPageNum] = useState(0)
    const [showImage, setShowImage] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)
    const [index, setIndex] = useState(0)
    const [sort, setSort] = useState(false)
    const [sortOrder, setSortOrder] = useState(false)
    const [sortBy, setSortBy] = useState(false)
    const [data, setData] = useState([])
    const [dataLoading, setDataLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setDataLoading(true)

            const res = await fetch(`https://bookmanagementserver.onrender.com/user/getBooks?filter=${JSON.stringify(location.state || {})}`, {
                method: "GET",
                headers: { "Content-type": "application/json" },
            })
            const data = await res.json()
            setData(data.data)
            setDataLoading(false)
        }
        fetchData()
    }, [location.state])
    // console.log("data -->>", data.length, data);


    const handleBuyNow = (book) => {
        if (user) {
            navigate("/payment")
        } else {
            navigate("/login", { state: "/payment" })
        }
    }

    const handleAddToCart = (book) => {
        navigate("/cart", { state: book })
    }

    const handleMoreDetails = (book) => {
        navigate("/getBook", { state: book })
    }


    const handleShowImagaes = (index) => {
        setIndex(index)
        setShowImage(!showImage)
    }

    const handleSortBy = (e) => {
        if (e.target.value === "null") {
            window.location.reload(true)
        } else {
            const arr = e.target.value.split(" ")
            setSort(true)
            setSortBy(arr[0])
            if (arr[1] === "1") {
                setSortOrder(true)  // true means incresing order
            } else {
                setSortOrder(false) // false means decreasing order
            }
        }
    }


    const handlePagination = (ind) => {
        setPageNum(ind)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    
    return (
        <>
            <div className='outer_container'>

                {/*  ------- to view images of books -------- */}
                {showImage && <div className=''>

                    <div className='showimages'>
                        <botton className="cross" onClick={handleShowImagaes}> <FontAwesomeIcon icon={faCircleXmark} size="2xl" style={{ color: "#454545", }} />
                        </botton>
                        <div className='active_image'>
                            <img src={data[index]?.images[imageIndex]} alt='bookImg'></img>
                        </div>
                        <div className='img_box_container'>
                            {
                                data[index]?.images.map((img, id) => {
                                    return (<>
                                        <div onClick={() => { setImageIndex(id) }} className='image_Box'>
                                            <img src={img} alt='bookImg'></img>
                                        </div>
                                    </>)
                                })
                            }
                        </div>
                    </div>
                </div>}

                {dataLoading &&
                    <div class="loading">
                        <FontAwesomeIcon icon={faSpinner} spin size="xl" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.4", }} />
                        <p> Loading...</p>
                    </div>
                }

                {!dataLoading && data.length === 0 &&
                    <div class="no_result_found">
                        <FontAwesomeIcon icon={faExclamationTriangle}
                            size="xl" style={{ color: "grey", }} /><p> No Result Found</p>
                    </div>
                }


                <div className='top_header'>
                    <div className='current_page'><p> Page No.  {pageNum + 1} , </p><p> Total Results Found {data.length}</p> </div>


                    <div className='sort_box'>
                        <select name="cars" className="sort"
                            onChange={handleSortBy}>
                            <option value="null" >sort by features</option>
                            <option value="price 1" >price: low to high </option>
                            <option value="price -1" >price: high to low</option>
                            <option value="ratings -1">ratings: high to low</option>
                            <option value="ratings 1">ratings: low to high </option>
                        </select>
                    </div>
                </div>


                {!dataLoading && data.length > 0 &&
                    <div className='list_container'>

                        {data?.sort((a, b) => !sort ? "" : sortOrder ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
                        ).slice(pageNum * 5, (pageNum + 1) * 5).map((book, ind) => {
                            return (<>
                                <div className="list_book_box" >
                                    <div className="list_book_img_container" onClick={() => handleShowImagaes(ind)} >
                                        <img src={book?.bookCover} alt="bookcover" ></img>
                                        <div className='all_images_box'>
                                            {book.images.filter((a, i) => i < 4).map((img) =>
                                                <div className='all_images' > <img src={img} alt='otherImgs'></img></div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="list_book_details">
                                        <p className="list_book_no">{`${pageNum * 5 + ind + 1} /  ${data.length}`}</p>
                                        <p className="list_book_title">{book?.title}</p>
                                        <p className="list_book_author">by {book?.author} (author)</p>
                                        <p className="list_book_author">{book?.category}</p>
                                        {book?.discountPercent > 0 && <p className="list_book_discount">{book?.discountPercent}% off Deal</p>}
                                        <p className="list_book_author">Language: {book?.language}</p>
                                        <p className="list_book_author">Ratings: {book?.ratings} ⭐</p>
                                        {/* <p className="list_book_isbn">{book?.ISBN } <img src='https://static.vecteezy.com/system/resources/previews/017/059/478/non_2x/barcode-icon-free-png.png' alt='"isbn_img'></img></p> */}
                                        <p className="list_book_author">Cover: {book?.format}</p>
                                        {/* <p className="list_book_author">{book?.numberOfPages} pages</p> */}
                                        {/* <p className="list_book_author">Weight: {book?.weight} grams</p> */}
                                        {/* <p className="list_book_author">Dimentions: {book?.size} cm</p> */}
                                        {/* <p className="list_book_author">Country: {book?.countryOfOrigin}</p> */}
                                        {book?.availableQuantity < 5 && <p className="list_book_author">

                                            {book?.availableQuantity === 0 ? book?.availableQuantity : "Out of Stock"} </p>}

                                        {/* {book?.availableQuantity > 5 && <p className="list_book_author">Available: {book?.availableQuantity} no.</p>} */}
                                        {/* <p className="list_book_author">{book?.reviews} ✍ reviews</p> */}
                                        <div className="list_book_prices">
                                            <p className="discounted_price">₹{Math.round(book?.price * (100 - book?.discountPercent) / 100)}</p>

                                            {book?.discountPercent > 0 && <p className="original_price">M.R.P ₹{book?.price}</p>}
                                        </div>

                                        <p className='more_details' onClick={() => { handleMoreDetails(book) }}> more details</p>
                                        <div className='btns'>
                                            <button className='btn buy_btn' onClick={() => { handleBuyNow(book) }}> Buy Now</button>
                                            <button className='btn addcart_btn' onClick={() => { handleAddToCart(book) }}> Add to Cart</button>
                                        </div>

                                    </div>
                                </div>
                            </>)
                        })}
                    </div>
                }
                {data.length > 0 &&
                    <div class="pagination_box">
                        <div class="pagination">
                            <button onClick={() => handlePagination(pageNum - 1)} disabled={pageNum <= 0} href="#">Prev</button>
                            {data.slice(0, Math.ceil(data.length / 5)).map((book, ind) => {
                                return (<>
                                    <button onClick={() => handlePagination(ind)} href="#">{ind + 1}</button>
                                </>)
                            })}
                            <button onClick={() => handlePagination(pageNum + 1)} disabled={pageNum >= (data.length / 5) - 1} href="#">Next</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default List