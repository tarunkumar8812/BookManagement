const userModel = require("../model/userModel")
const jwt = require('jsonwebtoken')

//<-------------------------------------------- Create User API ------------------------------------------->
const createUser = async function (req, res) {
	try {
		const body = req.body

		console.log(body);
		
		// const { title, name, phone, email, password, address, ...rest } = req.body
		const { fullname, phone, email, password } = req.body

		if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Please fill data!!" })

		// if (Object.keys(rest).length > 0) return res.status(400).send({ status: false, message: `You can not fill these:-( ${Object.keys(rest)} ) data ` })

		// if (validTitle(title) != true) return res.status(400).send({ status: false, message: `${validTitle(title)}` })

		// if (validName(fullname) != true) return res.status(400).send({ status: false, message: `${validName(fullname)}` })

		// if (validPhone(phone) != true) return res.status(400).send({ status: false, message: `${validPhone(phone)}` })

		// if (validEmail(email) != true) return res.status(400).send({ status: false, message: `${validEmail(email)}` })

		// if (validPassword(password) != true) return res.status(400).send({ status: false, message: `${validPassword(password)}` })


		// if (validAddress(address) != true) return res.status(400).send({ status: false, message: `${validAddress(address)}` })

		// const { street, city, pincode } = address

		// if (validStreet(street) != true) return res.status(400).send({ status: false, message: `${validStreet(street)}` })

		// if (validCity(city) != true) return res.status(400).send({ status: false, message: `${validCity(city)}` })

		// if (validPincode(pincode) != true) return res.status(400).send({ status: false, message: `${validPincode(pincode)}` })



		//  ------- checking uniqueness of phone no. -------
		let phone_in_DB = await userModel.findOne({ phone: phone })
		if (phone_in_DB) return res.status(409).send({ status: false, message: "Phone Number is already registered" })



		//  ---------checking uniqueness of email ---------
		// let email_in_DB = await userModel.create//({ email: email })
		let email_in_DB = await userModel.findOne({ email: email })
		if (email_in_DB) return res.status(409).send({ status: false, message: "Email is already registered" })


		//  -------------- creating new user --------------
		const data = await userModel.create({ fullname, phone, email, password })
		return res.status(201).send({ status: true, message: "Registered successfully", data: data })
	}
	catch (err) {
		return res.status(500).send({ status: false, message: err.message })
	}
}


//<-------------------------------------------- User Login API ------------------------------------------->

const userLogin = async function (req, res) {
	try {
		const body = req.body

		if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Please fill data!!" })

		const { email, password, ...rest } = req.body

		// if (Object.keys(rest).length > 0) return res.status(400).send({ status: false, message: `You can not fill these:-( ${Object.keys(rest)} ) data` })

		// if (validEmail(email) != true) return res.status(400).send({ status: false, message: `${validEmail(email)}` })

		// ------------------ api call ------------------
		let user = await userModel.findOne({ email, isDeleted: false });
		if (!user) return res.status(401).json({ status: false, message: "User not fonud!" })

		if (password != user.password) return res.status(401).json({ status: false, message: "Wrong password!" })


		// let bookInDataBase = await bookModel.find();


		let token = jwt.sign(
			{
				userId: user._id.toString(),
				exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // After 24 hour it will expire 
				iat: Math.floor(Date.now() / 1000)
			}, "FunctionUp Group No 57");

		res.setHeader("x-api-key", token);

		let data = {
			token: token,
			userId: user._id.toString(),
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // After 24 hour it will expire 
			iat: Math.floor(Date.now() / 1000)
		}

		// res.status(200).json({ status: true, message: "Token has been generated successfully.", data: data, bookslist: bookInDataBase });
		res.status(200).json({ status: true, message: "Login successfully.", data });
	}
	catch (err) {
		res.status(500).send({ status: false, message: err.message })
	}

}



module.exports = { createUser, userLogin }



