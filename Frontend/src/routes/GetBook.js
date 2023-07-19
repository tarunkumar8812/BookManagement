import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components//footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
// import { SearchContext } from '../context/SearchContext'
import axios from 'axios'
import Card1 from '../components/card1/Card1'
import Carousel from '../components/carousel/Carousel'
import './getbook.css'
import { AuthContext } from '../context/AuthContext'


const GetBook = () => {

    const { user } = useContext(AuthContext)
    const location = useLocation()

    const navigate = useNavigate()
    const book = location.state
    console.log("--------", book?.images[0]);

    const [RefreshData, setRefreshData] = useState()
    console.log(RefreshData);
    // const { newSearch, dispatch } = useContext(SearchContext)
    // const { data, dataLoading, dataError, reFetch } = useFetch(("http://localhost:5000/user/getAllBooks"))

    useEffect(() => {
        const fetchData = async () => {
            // api calling using axios
            const res = await axios.get(`https://bookmanagementserver.onrender.com/user/getAllBooks`)
            setRefreshData(res.data.bookList)
            // console.log("res.data.bookCategory", res.data.bookList)
            // dispatch({ type: "NEW_SEARCH", payload: { newSearch: newSearch, data: res.data.bookList } })
        }
        fetchData()
    }, [])

    const [image, setImage] = useState(0)


    const handleAddToCart = (book) => {
        navigate("/cart", { state: book })
    }

    const handleBuyNow = (book) => {
        if (user) {
            navigate("/payment")
        } else {
            navigate("/login", { state: "/payment" })
        }
    }
    return (
        <>
            <Navbar />
            <div style={{ border: "1px solid grey", margin: "15px", padding: "15px", height: "auto" }}>
                <div className='wrapper'>
                    <div className='img_container' >
                        <div className='allImages'>
                            {book?.images.map((img, ind) => {
                                return (<>
                                    <div className='img_box'
                                        onClick={() => { setImage(ind || 0) }}>
                                        <img src={img || ""} alt=''></img>
                                    </div>
                                </>)
                            })}
                        </div>
                        <img src={book?.images[image] || ""} alt=''></img>
                    </div>
                    <div className='full_details'>
                        <h2> Title : {book?.title}</h2>
                        <h2> WrittenBy :  {book?.author}</h2>
                        <h2> Category : {book?.category}</h2>
                        {/* <h2> availableQuantity : {book?.availableQuantity}</h2> */}
                        <div>format :  {book?.format}</div>
                        <div>Discount :  {book?.discountPercent}</div>
                        <div>Language :  {book?.language}</div>
                        <div>Price :  ₹ {book?.price}</div>
                        <div>Language :  {book?.language}</div>
                        <div>Rating :  {book?.ratings}</div>
                        <div>Pages :  {book?.numberOfPages || "N/A"}</div>
                        <div>Sold Copies :  {book?.soldCopies || "N/A"}</div>
                        <div className='buttons'>
                            <button className='btn buy_btn'
                                onClick={() => { handleBuyNow(book) }}
                            > Buy Now</button>
                            <button className='btn addcart_btn'
                                onClick={() => { handleAddToCart(book) }}
                            > Add to Cart</button>
                        </div>
                    </div>
                    <div className='other_details' >
                        <div>country Of Origin :  {book?.countryOfOrigin}</div>
                        <div>ISBN :  {book?.ISBN}</div>
                        <div>published Year : {book?.publishedYear} gram</div>
                        <div>Weight : {book?.weight} gram</div>
                        <div>Dimentions : {book?.size}</div>
                        <div>Excerpt : {book?.excerpt}</div>
                    </div>

                </div>



            </div>

            {/* <Card1 heading="Same Author" field="author" val={book?.author} /> */}
            <Carousel />
            <Card1 width={"95%"} heading={`${book?.author}'s Books`} field="author" val={book?.author} />
            <Card1 width={"95%"} heading="Related Books" field="category" val={book?.category} />
            <Carousel />
            <Card1 width={"95%"} heading="Top Rated Books" field="ratings" val={2} sort={true} />
            {/* <Card1 heading={`Other ${book?.language} Language`} field="language" val={book?.language} /> */}

            <Footer />
        </>
    )
}

export default GetBook