
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { faBars, faCartShopping, faMagnifyingGlass, faPowerOff, faSearch, faUser, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./navbar.css";
import { AuthContext } from '../../context/AuthContext';
// import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';


const Navbar = () => {
    const navigate = useNavigate()
    const winSize = window.innerWidth
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

    }


    // to make input field  dynamic
    // const onChange = (e) => {
    //     setSearch(e.target.name = e.target.value)
    // }
    async function searchBook(val) {
        navigate("/getbook", { state: val })
    }


    return (
        <>

            <nav>
                <div className='logo'>
                    <NavLink to="/">
                        <img className='logo_img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRdLT6HFo0OyTrVKs8PliE8x79VBTS8w84cooLSdtE_w&s' alt='logo'></img>
                    </NavLink>
                </div>


                <div className='search'>

                    <div className='search_bar'>
                        <input type="text" placeholder=' Search by Title, Author' name='search' className='search_input' autoComplete='off' onChange={handleSearch} defaultValue={search}></input>


                        <div className='search_btn'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
                        </div>
                    </div>




                    <div className='s_suggestion'>
                        {search.length > 0 &&
                            <ul className='s_suggestion_box'>
                                {
                                    fetchData?.filter((val) =>
                                        val.author.includes(search) || val.title.includes(search) || val.category.includes(search)

                                    ).slice(0, 9).map((book) => {
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
                </div>





                {/* -------------------- completed -------------------- */}
                <div className={winSize > 900 && showMenu ? "navlinks" : showMenu ? "mobile_view_show" : "mobile_view_hide"}>
                    <ul className='navlink_box'>
                        {user ?
                            <>
                                <li className='action_btns' onClick={logout}><NavLink to="/login"> <FontAwesomeIcon size="sm" icon={faPowerOff} /> Logout</NavLink></li>
                            </> :
                            <>
                                <li className='action_btns'><NavLink to="/login"><FontAwesomeIcon size="sm" icon={faUser} /> Login</NavLink> </li>
                                <li className='action_btns'><NavLink to="/signup"><FontAwesomeIcon size="sm" icon={faUserPlus} /> Signup</NavLink> </li>
                            </>
                        }
                        <li className='action_btns'><NavLink to='cart'> <p className='notifi'>5</p><FontAwesomeIcon size="lg" icon={faCartShopping} /> Cart</NavLink></li>

                    </ul>
                </div>


                <div className='menu' onClick={() => { handleMenu() }}>

                    {!showMenu && <FontAwesomeIcon className='menu_img' icon={faBars} size="xl" />}

                    {showMenu && <FontAwesomeIcon className='menu_img' icon={faXmark} size="xl" />}

                </div>
            </nav>
        </>
    )
}

export default Navbar