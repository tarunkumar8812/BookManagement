
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faBars, faCartShopping, faPowerOff, faSearch, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./navbar.css";
import { AuthContext } from '../../context/AuthContext';
// import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';


const Navbar = () => {
    const navigate = useNavigate()
    // --------------- states management ---------------
    const [showMenu, setShowMenu] = useState(true)
    const [search, setSearch] = useState("")


    useEffect(() => {
        if (window.innerWidth <= 1040) {
            setShowMenu(false)
        }
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 1040) {
                setShowMenu(false)
            } else {
                setShowMenu(true)
            }
        });

    }, [])

    const handleMenu = () => {
        setShowMenu(!showMenu)
    }

    // -------------- handle logout --------------
    function logout() {
        localStorage.removeItem("user")
        window.location.reload()
        navigate("/")
    }


    // --------------------- auth context ----------------------
    const { user } = useContext(AuthContext)
    // --------------------- search context ----------------------
    // const { newSearch, bookData, dispatch } = useContext(SearchContext)

    // console.log("nav", bookData);
    const [fetchData, setFetchData] = useState([])
    // const [filterData, setFilterData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            // api calling using axios
            const res = await axios.get(`https://bookmanagementserver.onrender.com/user/getAllBooks`)
            // setRefreshData("res.data.bookCategory", res.data.bookList)

            setFetchData(res.data.bookList)
            // console.log("res.data.bookCategory", res.data.bookList)
            // dispatch({ type: "NEW_SEARCH", payload: { newSearch: newSearch, data: res.data.bookList } })
        }
        fetchData()
    }, [])



    // let r = []
    // let count = {}
    const handleSearch = (e) => {
        setSearch(e.target.value)

        const key_words = e.target.value.split(" ").filter(word => word.trim() !== "")//.filter(whiteSpace=> word !== "")
        console.log("key_words", key_words);



        // r = key_words.map((word) =>
        //     fetchData?.filter((book) =>
        //         book.author.toLowerCase().includes(word) || book.title.toLowerCase().includes(word) || book.category.toLowerCase().includes(word)
        //     )
        // ).flat(1)

        // r.map((i) => {
        //     // console.log(i._id);
        //     count[i._id] = count[i._id] ? count[i._id] + 1 : 1;
        // })
        // console.log("r", r);
        // console.log("count", count);


        // console.log(newSearch, e.target.value);
        // console.log("bookData", bookData);

        // dispatch({ type: "NEW_SEARCH", payload: { newSearch: e.target.value, data: bookData } })
    }


    // to make input field  dynamic
    // const onChange = (e) => {
    //     setSearch(e.target.name = e.target.value)
    // }
    async function searchBook(val) {
        // console.log(setSearch(search))
        // dispatch({ type: "RESET_SEARCH", payload: { data: bookData } })
        navigate("/getbook", { state: val })

        // const response = await fetch("http://localhost:5000/searchBook", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json", "authToken": localStorage.getItem("authToken") },
        //     body: JSON.stringify({ title: search }),// converting simple object to json format
        //     // authToken: localStorage.getItem("authToken")// to save jwt token in header to use it

        // })
        // console.log(response);

        // const json = await response.json()
        // console.log(json);
    }


    return (
        <>
            <div className="navbar">
                <Link to='/'>
                    <div className='logo'>
                        <img src="https://t3.ftcdn.net/jpg/04/83/17/70/360_F_483177004_1oM8bltG2ZGIIdlem8W2v18LYRlUM1tQ.jpg" alt="Facebook" />
                        <h2>ReadersClub.in</h2>
                    </div>
                </Link>

                <form className='serach-box'>
                    <input type="text" className='search-bar' placeholder=' Search by Title, Author' name='search' autoComplete='off' onChange={handleSearch} defaultValue={search}></input>

                    <button onClick={searchBook} className='search-btn'><Link to="/">Search</Link></button>

                    <div className='s_suggestion'>
                        {search.length > 0 &&
                            <ul className='s_suggestion_box'>
                                {
                                    fetchData?.filter((val) =>
                                        val.author.includes(search) || val.title.includes(search) || val.category.includes(search)

                                    ).slice(0, 10).map((book) => {
                                        return <>
                                            <li className='box_ul_li' onClick={() => { searchBook(book) }} >

                                                <p> <FontAwesomeIcon icon={faSearch} />{`  ${book.title}`}</p>
                                                <p>{`by ${book.author}`}</p>
                                            </li>
                                        </>
                                    })
                                }
                            </ul>
                        }
                    </div>

                </form>


                <div className="nav-menu" onClick={handleMenu}>
                    <FontAwesomeIcon className='menu-icon' icon={faBars} size="xl" />
                    {showMenu && <ul>

                        {user ?
                            <>
                                <li onClick={logout}><Link to="/login"> <FontAwesomeIcon size="sm" icon={faPowerOff} /> Logout</Link></li>
                                {/* <li onClick={"profile"}><Link to="/profile"> <FontAwesomeIcon size="sm" icon={faIdCard} /> Profile</Link></li> */}
                            </> :
                            <>
                                <li><Link to="/login"> <FontAwesomeIcon size="sm" icon={faUser} /> Login</Link></li>
                                <li><Link to="/signup"> <FontAwesomeIcon size="sm" icon={faUserPlus} />SignUp</Link></li>
                            </>
                        }
                        <li >
                            {true &&
                                <div className='cart_notification'><p>{"2"}</p>
                                </div>
                            }
                            <Link to="/cart" className='cart'> <FontAwesomeIcon size="md" icon={faCartShopping} /> Cart</Link>

                        </li>

                    </ul>}

                </div>

            </div>
        </>
    )
}

export default Navbar