import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components//footer/Footer'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import { SearchContext } from '../context/SearchContext'
import axios from 'axios'

const GetBook = () => {
    const location = useLocation()

    const book = location.state
    const [RefreshData, setRefreshData] = useState()
    const { newSearch, dispatch } = useContext(SearchContext)
    // const { data, dataLoading, dataError, reFetch } = useFetch(("http://localhost:5000/user/getAllBooks"))

    useEffect(() => {
        const fetchData = async () => {
            // api calling using axios
            const res = await axios.get(`http://localhost:5000/user/getAllBooks`)
            setRefreshData("res.data.bookCategory", res.data.bookList)
            // console.log("res.data.bookCategory", res.data.bookList)
            dispatch({ type: "NEW_SEARCH", payload: { newSearch: newSearch, data: res.data.bookList } })
        }
        fetchData()
    }, [])


    return (
        <>
            <Navbar />
            <div style={{ margin: "7vh" }}>

                <div> Book buying page of {` ${book?.title || "cheking"} and ${book?.author || "cheking"} and ${book?._id || "cheking"}`}</div>
                <div> Book? buying || "cheking" page of {` ${book?.title || "cheking"} and ${book?.author || "cheking"} and ${book?._id || "cheking"}`}</div>
                <div> Book? buying || "cheking" page of {` ${book?.title || "cheking"} and ${book?.author || "cheking"} and ${book?._id}`}</div>


            </div>
            <Footer />
        </>
    )
}

export default GetBook