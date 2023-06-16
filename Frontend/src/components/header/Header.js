import { React, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import "./header.css"
import { useNavigate } from 'react-router-dom'


const Header = () => {

    const navigate = useNavigate()

    // ------------- handle navigation --------------
    const handle = (val) => {
        navigate('/booklist', {
            state: { category: val }
        })
    }


    // ------------- handle dropdown --------------
    const [showDropdown, setShowDropdown] = useState(false)
    const handleFaCaretDown = () => {
        setShowDropdown(!showDropdown)
    }
    const closeOptions = () => {
        setShowDropdown(!showDropdown)
    }



    return (
        <div className='header' onClick={closeOptions}>

            <div className='header-options'>
                <div className='book-dropdown'>
                    <div className='dropdown' onClick={handleFaCaretDown}>
                        <div><p>Books</p></div>
                        <div className={showDropdown ? "faCaretDown-active" : 'faCaretDown'}>
                            <FontAwesomeIcon icon={faCaretDown}
                                size="lg" />
                        </div>
                    </div>

                    {/* -------------- dropdown options --------------- */}
                    <div className={showDropdown ? "menu-options-active" : 'menu-options'}>
                        <div className='menu-option'>menu-option 1</div>
                        <div className='menu-option'>menu-option 2</div>
                        <div className='menu-option'>menu-option 3</div>
                        <div className='menu-option'>menu-option 4</div>
                        <div className='menu-option'>menu-option 5</div>
                        <div className='menu-option'>menu-option 6</div>
                        <div className='menu-option'>menu-option 7</div>
                        <div className='menu-option'>menu-option 8</div>
                        <div className='menu-option'>menu-option 9</div>
                        <div className='menu-option'>menu-option 10</div>
                    </div>
                </div>
                {/* ---------------- */}
                <ul className='popular-cat'>
                    <li className='option' onClick={() => { handle("New Arrivals") }} ><p>New Arrivals</p></li><span className='sep' />
                    <li className='option' onClick={() => { handle("Box Sets") }} ><p>Box Sets</p></li><span className='sep' />
                    <li className='option' onClick={() => { handle("Best Sellers") }} ><p>Best Sellers</p></li><span className='sep' />
                    <li className='option' onClick={() => { handle("Fiction Books") }} ><p>Fiction Books</p></li><span className='sep' />
                    <li className='option' onClick={() => { handle("Award Winners") }} ><p>Award Winners</p></li><span className='sep' />
                    <li className='option' onClick={() => { handle("Featured Authors") }} ><p>Featured Authors</p></li><span className='sep' />
                    <li className='option' onClick={() => { handle("Today's Deal") }} ><p>Today's Deal</p></li><span className='sep' />
                    <li className='option' onClick={() => { handle("Request a Book") }} ><p>Request a Book</p></li>
                </ul></div>

            {/* --------------------- */}


        </div>
    )
}

export default Header