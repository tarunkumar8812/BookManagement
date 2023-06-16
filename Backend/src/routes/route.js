const express = require("express")
const router = express.Router();
const { createUser, userLogin } = require('../controllers/userController')
const { getBooks, groupData } = require('../controllers/bookController')


// router.get('/', (req, res) => {
//     return res.status(200).send({ status: true, message: "Book Management App Server is working..." })
// })

//<--------------------------- User API's ---------------------------->
router.post("/user/createUser", createUser)
router.post('/user/login', userLogin)
router.get('/user/groupData', groupData)
router.get('/user/getBooks', getBooks)


module.exports = router