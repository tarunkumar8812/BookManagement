const express = require("express")
const router = express.Router();
const { createUser, userLogin } = require('../controllers/userController')
const { createBook, getBooks, groupData, getAllBooks } = require('../controllers/bookController');
const { getCart, addToCart, deleteCartItem, updateCartItem } = require("../controllers/cartController");
const { authentication } = require("../middleware/auth");


router.get('/', (req, res) => {
    return res.status(200).json({ status: true, message: "Book Management App Server is working..." })
})

//<--------------------------- User API's ---------------------------->
router.post("/user/createUser", createUser)
router.post('/user/login', userLogin)


router.post('/user/createBook', createBook)
router.get('/user/getAllBooks', getAllBooks)
router.get('/user/groupData', groupData)
router.get('/user/getBooks', getBooks)


//<--------------------------- User API's ---------------------------->
router.post('/user/addToCart', authentication, addToCart)
router.post('/user/getCart', authentication, getCart)
router.post('/user/deleteCartItem', authentication, deleteCartItem)
router.post('/user/updateCartItem', authentication, updateCartItem)


module.exports = router