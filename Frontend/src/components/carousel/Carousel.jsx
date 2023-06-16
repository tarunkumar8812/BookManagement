import React, { useState } from 'react'
import "./carousel.css"
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Carousel = () => {

    const arr = [
        { name: "first", desc: "first img desc", imgSrc: "https://www.bookswagon.com/images/bannerimages/80_inr.jpg?v=1.6" }

        , { name: "second", desc: "second img desc", imgSrc: "https://www.bookswagon.com/images/bannerimages/79_inr.jpg?v=1.6" }

        , { name: "third", desc: "third img desc", imgSrc: "https://www.bookswagon.com/images/bannerimages/82_inr.jpg?v=1.8" }

        , { name: "fourth", desc: "fourth img desc", imgSrc: "https://wowslider.com/sliders/demo-93/data1/images/landscape.jpg" }

        , { name: "fifth", desc: "fifth img desc", imgSrc: "https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg" }
    ]

    let [dot, setDot] = useState(0)

    const handleDirection = (direction) => {
        if (direction === "r") {

            if (dot >= arr.length-1) {
                setDot(0)
            } else {
                setDot(dot + 1)
            }
        } else {
            if (dot <= 0) {
                setDot(arr.length - 1)
            } else {
                setDot(dot - 1)
            }
        }
    }


    // const a = setInterval(() => {
    //     // console.log(dot);
    //     if (dot >= arr.length - 1) {
    //         setDot(0)
    //     } else {
    //         setDot(dot + 1)
    //     }

    // }, 10000)


    return (
        <div className='carousel'>
            <div className='slider'>
                <img src={arr[dot].imgSrc} alt="imgSrc"></img>
            </div>

            {/* -------------------- arrows -------------------- */}
            <div className='l-arrow arrows'><FontAwesomeIcon icon={faCircleArrowLeft} style={{ color: "#919191", }} size='2xl' onClick={() => { handleDirection("l") }} /></div>

            <div className='r-arrow arrows'><FontAwesomeIcon icon={faCircleArrowRight} style={{ color: "#919191", }} size='2xl' onClick={() => { handleDirection("r") }} /></div>

            {/* -------------------- dots -------------------- */}
            <div className='dots'>
                {arr.map((item, i) => {
                    return (
                        <>
                            <div id={i} className={
                                dot < i ? 'active-dot' : 'dot'}
                                onClick={() => { setDot(i) }}></div>
                        </>)
                })}
            </div>
        </div>
    )
}

export default Carousel