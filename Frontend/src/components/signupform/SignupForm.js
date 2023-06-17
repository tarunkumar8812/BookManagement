import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./signupform.css";


const SignupForm = () => {


    // const history  = useHistory()
    // const [credential, setCredential] = useState({ name: "", email: "", password: "", location: "" })
    const [credential, setCredential] = useState({ title: "", name: "", phone: "", email: "", password: "", street: "", city: "", pincode: "" })
    const navigate = useNavigate()  // use to jump from one route to other (page)

    // const [display, setDisplay] = useState("")

    // to make input field  dynamic
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:5000/createUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: credential.title, name: credential.name, phone: credential.phone, email: credential.email, password: credential.password, street: credential.street, city: credential.city, pincode: credential.pincode }) // converting simple object to json format
        })

        const json = await response.json()

        if (!json || json.status === false) {
            window.alert(json.message)
        } else {
            window.alert("register successful")
            navigate("/login")
        }
    }

    return (
        <>
            <div className='s-form'>
                <div className="container">
                    <div className="title"><h3>Registration Form</h3></div>
                    <form onSubmit={handleSubmit}>
                        <div className="user__details">

                            <div className='radio_input'>
                                <label htmlFor="titles">Title</label>
                                <span className="radio_input_option">
                                    <span>
                                        <input type="radio" id="huey" name="title" value="Mr" onChange={onChange} />
                                        <label htmlFor="title">Mr</label>
                                    </span>

                                    <span>
                                        <input type="radio" id="dewey" name="title" value="Mrs" onChange={onChange} />
                                        <label htmlFor="title">Mrs</label>
                                    </span>

                                    <span>
                                        <input type="radio" id="louie" name="title" value="Miss" onChange={onChange} />
                                        <label htmlFor="title">Miss</label>
                                    </span>
                                </span>
                            </div>

                            <div className="input__box">
                                <label htmlFor='name' className="details">Full Name</label>
                                <input type="text" placeholder="John Smith" autoComplete='username' required name='name' value={credential.name} onChange={onChange} />
                            </div>

                            <div className="input__box">
                                <label htmlFor='phone' className="details">Phone</label>
                                <input type="text" placeholder="489XX66XX7" required name='phone' value={credential.phone} onChange={onChange} />
                            </div>

                            <div className="input__box">
                                <label htmlFor='email' className="details">Email</label>
                                <input type="email" placeholder="abc@hotmail.com" required
                                    autoComplete='off'
                                    name='email' value={credential.email} onChange={onChange} />
                            </div>

                            <div className="input__box">
                                <label htmlFor='password' className="details">Password</label>
                                <input type="password" placeholder="********" required name='password' autoComplete='current-password' value={credential.password} onChange={onChange} />
                            </div>




                            {/* ----------------- Address ----------------- */}

                            {/* <label className="address">Address</label> */}
                            <div className="input__box">
                                <label htmlFor='street' className="details">Street</label>
                                <input type="text" placeholder="your street" required name='street' value={credential.street} onChange={onChange} />
                            </div>
                            <div className="input__box">
                                <label htmlFor='city' className="details">City</label>
                                <input type="text" placeholder="your city" required name='city' value={credential.city} onChange={onChange} />
                            </div>
                            <div className="input__box">
                                <label htmlFor='pincode' className="details">Pincode</label>
                                <input type="text" placeholder="your pincode" required name='pincode' value={credential.pincode} onChange={onChange} />
                            </div>
                        </div>


                        {/* -------------navigation buttons------------- */}
                        <div className="buttons">
                            <span className="button">
                                <input type="submit" value="createUser" />
                            </span>
                            <span className="button" >
                                <Link to="/login"><input type="submit" value="already a user" /></Link>
                            </span>
                        </div>


                    </form>
                </div>
            </div>
        </>
    )
}

export default SignupForm