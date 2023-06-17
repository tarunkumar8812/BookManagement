import React, { useEffect, useState } from 'react'
import Footer from '../components//footer/Footer'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
// import { SearchContext } from '../context/SearchContext'
import axios from 'axios'
import Card1 from '../components/card1/Card1'
import Carousel from '../components/carousel/Carousel'

const GetBook = () => {
    const location = useLocation()

    const book = location.state
    console.log(book);

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


    return (
        <>
            <Navbar />
            <div style={{ margin: "7vh" }}>

                <div> {book?.title + book?.author + book?._id}</div>
                <div> {book?.title + book?.author + book?._id}</div>
                <div> {book?.title + book?.author + book?._id}</div>
                <div> {book?.title + book?.author + book?._id}</div>
                <div> {book?.title + book?.author + book?._id}</div>

            </div>

            {/* <Card1 heading="Same Author" field="author" val={book?.author} /> */}
            <Carousel />
            <Card1 heading={`${book?.author}'s Books`} field="author" val={book?.author} />
            <Card1 heading="Related Books" field="category" val={book?.category} />
            <Carousel />
            <Card1 heading="Top Rated Books" field="ratings" val={2} sort={true} />
            {/* <Card1 heading={`Other ${book?.language} Language`} field="language" val={book?.language} /> */}

            <Footer />
        </>
    )
}

export default GetBook