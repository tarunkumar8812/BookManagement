import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./filterpanel.css"
import axios from 'axios'


const FilterPanel = () => {

    const navigate = useNavigate()
    // const [bookCount, setBookCount] = useState(0)
    const [filter, setFilter] = useState({})
    const [ratings, setRatings] = useState(0)
    const [discount, setDiscount] = useState(0)
    // const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [showAllCategories, setShowAllCategories] = useState(false)
    const [showAllAuthors, setShowAllAuthors] = useState(false)
    const [showAllLanguages, setShowAllLanguages] = useState(false)

    // useEffect(() => {
    //     const handleCount = () => {
    //         setBookCount()
    //     }
    //     handleCount()
    // }, [bookCount])

    const [fetchGroupData, setFetchGroupData] = useState(null)

    useEffect(() => {
        setFilter({})

        const fetchData = async () => {
            // api calling using axios
            const res = await axios.get(`https://bookmanagementserver.onrender.com/user/groupData`)
            const groups = await res.data.data
            setFetchGroupData(groups)
        }
        fetchData()
    }, [])




    const handleFilter = (field, value) => {
        // console.log("filter", filter)
        console.log("field", field, "value", value)

        if (["author", "category", "language"].includes(field)) {

            if (filter[field]) {
                if (!filter[field].includes(value)) {
                    filter[field].push(value)
                    // console.log("adding", filter[field])
                }
                else {
                    filter[field].splice(filter[field].indexOf(2), 1);
                    // console.log("removing", filter[field])
                    if (filter[field].length === 0) {
                        delete filter[field]
                    }
                }
            } else {
                filter[field] = [value]
                // console.log("bahar hai", filter);
            }
        } else {
            if (field === "ratings") {
                console.log("ratings");
                if (ratings === value) {
                    setRatings(null)
                } else {
                    setRatings(value)
                }
                console.log("---->>", field, value);
            } else if (field === "discount") {
                console.log("discount");
                if (discount === value) {
                    setDiscount(null)
                } else {
                    setDiscount(value)
                }
                console.log("---->>", field, value);
            }
        }
        // dispatch({ type: "RESET_SEARCH", payload: { newSearch: "", data: location.state.data } })
        // setFilterField(field)
        // setFilterValue(value)

        // location.reload(true)
        navigate("/searchresults",
            { state: { filter, ratings: ratings, discount, maxPrice } })
    }
    const handleResetFilter = () => {

        navigate("/searchresults", { state: {} })
    }


    return (
        <div className='filter_panel_container'>
            <div className='reset'><p onClick={handleResetFilter}> Reset Filter</p></div>
            <div className='left'>

                <div className='search-by'>

                    <label><h3>Search by Category</h3></label>
                    <ul>

                        {fetchGroupData?.bookCategory.slice(0, showAllCategories ? 20 : 5).map((cate, id) => {
                            return (<><li >
                                <input type='checkbox' key={id} onClick={() => { handleFilter("category", cate._id) }}></input>  {cate._id} </li></>)
                        })}
                    </ul>
                    <div className='showMore' onClick={() => { setShowAllCategories(!showAllCategories) }}>{showAllCategories ? <p> less </p> : <p> more </p>}</div>
                </div>


                <div className='search-by'>
                    <label><h3>Search by Author</h3></label>
                    <ul>
                        {fetchGroupData?.bookAuthor.slice(0, showAllAuthors ? 20 : 5).map((auth, id) => {
                            return (<><li>
                                <input type='checkbox' key={id} onClick={() => { handleFilter("author", auth._id) }}></input> {auth._id} </li></>)
                        })}
                    </ul>
                    <div className='showMore' onClick={() => { setShowAllAuthors(!showAllAuthors) }}>{showAllAuthors ? <p> less </p> : <p> more </p>}</div>
                </div>


                <div className='search-by'>
                    <label><h3>Search by Language</h3></label>
                    <ul>
                        {fetchGroupData?.bookLanguage.slice(0, showAllLanguages ? 20 : 5).map((lang, id) => {
                            return (<><li >
                                <input type='checkbox' key={id} onClick={() => { handleFilter("language", lang._id) }}>
                                </input> {lang._id} </li>
                            </>)
                        })}
                    </ul>
                    <div className='showMore' onClick={() => { setShowAllLanguages(!showAllLanguages) }}>{showAllLanguages ? <p> less </p> : <p> more </p>}</div>
                </div>

                <div className='search-by'>
                    <label for="points"><h3>min 0 max 1000</h3></label>
                    <input type="range" id="points" name="points" min="0" max="1000" onChange={() => { setMaxPrice(99999) }} />
                </div>

                <div className='search-by'>
                    <label><h3>Search by Ratings</h3></label>
                    <ul>
                        <li><input type='radio' onClick={() => { handleFilter("ratings", 4) }}></input> 4 & up </li>
                        <li><input type='radio' onClick={() => { handleFilter("ratings", 3) }}></input> 3 & up </li>
                        <li><input type='radio' onClick={() => { handleFilter("ratings", 2) }}></input> 2 & up </li>
                        <li><input type='radio' onClick={() => { handleFilter("ratings", 1) }}></input> 1 & up </li>
                    </ul>
                </div>


                <div className='search-by'>
                    <label><h3>Search by Discount</h3></label>
                    {/* <div onClick={(e) => { handleFilter("discount", e.target.value) }}>
                        <input type='radio' id='10' value="10" ></input>
                        <lable for="10">10% & up</lable><br />

                        <input type='radio' id='20' value="20" ></input>
                        <lable for="20">20% & up</lable><br />

                        <input type='radio' id='30' value="30" ></input>
                        <lable for="30">30% & up</lable><br />
                    </div> */}


                    <ul>
                        <li>  <input type='radio' onClick={() => { handleFilter("discount", 10) }}></input> 10% & up </li>

                        <li>  <input type='radio' onClick={() => { handleFilter("discount", 20) }}></input> 20% & up </li>

                        <li>  <input type='radio' onClick={() => { handleFilter("discount", 30) }}></input> 30% & up </li>

                        <li>  <input type='radio' onClick={() => { handleFilter("discount", 40) }}></input> 40% & up </li>

                        <li>  <input type='radio' onClick={() => { handleFilter("discount", 50) }}></input> 50% & up </li>

                    </ul>
                </div>
            </div >

        </div >
    )
}

export default FilterPanel