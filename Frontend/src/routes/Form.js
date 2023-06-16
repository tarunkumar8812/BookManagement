import React from 'react'

const Form = () => {
    return (
        <>
            <h2>Forms</h2>
            <form action='register'>

                <input list="browsers" name="browser" />
                <datalist id="browsers">
                    <option value="Internet Explorer" />
                    <option value="Firefox" />
                    <option value="Chrome" />
                    <option value="Opera" />
                    <option value="Safari" />
                </datalist><br/>


                image: <input type='image' name='image'></input><br />
                <lable for='name' > Your Name: </lable> <input type='text' size='300' id='name' name='name' placeholder='tarun kumar' ></input><br />
                nubmer: <input type='nubmer' name='number' value='98989898'></input><br />
                file: <input type='file'></input><br />
                password: <input type='password' name='password' value="45127845"></input><br />
                email: <input type='email' name='email' value='tarunkumar@gmail.com'></input><br />
                date: <input type='date'></input><br />

                checkbox: <input type='checkbox' name='lisence' disabled value={true} ></input><br />
                checkbox: <input type='checkbox' name='pancard' value={false} ></input><br />

                gemder: <input type='radio' name='gender' value='male'></input>male <input type='radio' name='gender' value='female'></input>felmale<br />

                <lable for='car' > select your car</lable>
                <select name='cars' id='car'>
                    <option name='tata' value='tata'>TATA</option>
                    <option name='mahindra' selected value='mahindra'>Mahindra</option>
                </select>

                <br />


                {/* datetime: <input type='datetime'></input><br /> */}
                About Your Self: <br /><textarea name='textaria' cols='50' rows='10' value='fsfdfadfdfoyaej h rihk uhi uh etalihaet l8yk ulh a y' ></textarea><br />
                {/* button: <input type='button' value="button"></input><br /> */}
                submit: <button type='submit'> submit now</button><br />
                {/* submit: <input type='submit' value='submit now'></input><br /> */}


            </form>
        </>
    )
}

export default Form