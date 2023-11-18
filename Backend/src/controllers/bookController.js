const bookModel = require('../model/bookModel')
const userModel = require('../model/userModel')
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId.isValid
const { validBookTitle, validBookExcerpt, validUserId, validISBN, validCategory, validSubcategory, validReview,
    validReleasdAt, validIsDeleted } = require("../validation/validBook.js")
//<------------------------------------------------ Create Book API ------------------------------------------------>

const createBook = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please enter require data to create Book" })

        let { title, excerpt, ISBN, category, subcategory, reviews, author, price, discountPercent, soldCopies, description, authorId, isPublished, publishedYear, publisherId, bookCover, thumbnail, images, genre, format, numberOfPages, ratings, weight, size, language, countryOfOrigin, isAvailable, availableQuantity, ...rest } = data;

        if (Object.keys(rest).length > 0) return res.status(400).send({ status: false, message: `You can not fill these:-( ${Object.keys(rest)} ) data ` })


        if (validBookTitle(title) != true) return res.status(400).send({ status: false, message: `${validBookTitle(title)}` })

        if (validBookExcerpt(excerpt) != true) return res.status(400).send({ status: false, message: `${validBookExcerpt(excerpt)}` })

        // if (validUserId(userId) != true) return res.status(400).send({ status: false, message: `${validUserId(userId)}` })

        if (validISBN(ISBN) != true) return res.status(400).send({ status: false, message: `${validISBN(ISBN)}` })

        if (validCategory(category) != true) return res.status(400).send({ status: false, message: `${validCategory(category)}` })

        if (validSubcategory(subcategory) != true) return res.status(400).send({ status: false, message: `${validSubcategory(subcategory)}` })

        // if (validReview(reviews) != true) return res.status(400).send({ status: false, message: `${validReview(reviews)}` })

        // if (validReleasdAt(releasedAt) != true) return res.status(400).send({ status: false, message: `${validReleasdAt(releasedAt)}` })

        // if (validIsDeleted(isDeleted) != true) return res.status(400).send({ status: false, message: `${validIsDeleted(isDeleted)}` })


        //  ------- checking uniqueness of title -------
        let title_in_DB = await bookModel.findOne({ title: title })
        if (title_in_DB) return res.status(400).send({ status: false, message: "This title is already taken" })

        //  ------- checking uniqueness of ISBN -------
        let ISBN_in_DB = await bookModel.findOne({ ISBN: ISBN })
        if (ISBN_in_DB) return res.status(400).send({ status: false, message: "ISBN Already Exists" })

        //  ------- checking existance of user -------
        // let user_in_DB = await userModel.findById({ _id: userId })
        // if (!user_in_DB) return res.status(404).send({ status: false, message: "No such user exist" })

        //  ------------ creating new book ------------
        let savedData = await bookModel.create(data)
        return res.status(201).send({ status: true, message: "Book successfully created", data: savedData })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//  <--------------------------------------------------- Get Books API --------------------------------------------------->

const getAllBooks = async function (req, res) {
    try {
        console.log("req.body", req.body);


        // if (Object.keys(queries).length == 0) {
        //     let bookList = await bookModel.find({ isDeleted: false }).select({ ISBN: 0, subcategory: 0, isDeleted: 0, deletedAt: 0, __v: 0, createdAt: 0, updatedAt: 0 }).collation({ locale: "en" }).sort({ title: 1 })

        //     if (bookList.length == 0) return res.status(404).send({ status: false, message: "No data found" })

        //     return res.status(200).send({ status: true, message: "list of Books", data: bookList })
        // }



        // const { userId, category, subcategory, ...rest } = req.query

        // if (Object.keys(rest).length > 0) return res.status(400).send({ status: false, message: `You can not get for these:-( ${Object.keys(rest)} ) data ` })

        // const filter = { isDeleted: false }

        // if (userId) {
        //     if (userId == undefined || userId.trim() == "") return res.status(400).send({ status: false, message: "please give value of filter" })

        //     if (!ObjectId(userId.trim())) return res.status(400).send({ status: false, message: "Invalid UserId" })

        //     filter.userId = userId.trim()
        // }

        // if (category) {
        //     if (category == undefined || category.trim() == "") return res.status(400).send({ status: false, message: "please give value of filter category" })

        //     filter.category = category.trim()
        // }

        // if (subcategory) {
        //     if (subcategory == undefined || subcategory.trim() == "") return res.status(400).send({ status: false, message: "please give value of filter Subcategory" })

        //     filter.subcategory = subcategory.trim()
        // }

        // let bookList = await bookModel.find(filter).select({ ISBN: 0, subcategory: 0, isDeleted: 0, deletedAt: 0, __v: 0 }).collation({ locale: "en" }).sort({ title: 1 })
        let bookCategory = await bookModel.aggregate([{ $group: { _id: "$category" } }, { "$sort": { "_id": -1 } }])

        let bookList = await bookModel.find()


        // let filters = {
        //     author: [],
        //     category: [],
        //     language: []

        // }
        // let ratings = 2
        // let minPrice = 300
        // let maxPrice = null


        // for (let filter in filters) {

        //     if (filters[filter].length <= 0) {

        //         delete filters[filter]
        //     }

        // }

        // let check = await bookModel.find({
        //     ...filters,
        //     ratings: { $gte: ratings || 1 },
        //     price: { $gte: minPrice || 1, $lte: maxPrice || 385 }
        // }).select({ ratings: 1, author: 1, category: 1, price: 1 })
        // console.log(check);


        if (bookList.length == 0) return res.status(404).send({ status: false, message: "No data found" })

        // console.log(bookList);
        return res.status(200).send({ status: true, message: "list of Books", bookCategory, bookList })
        // return res.status(200).send({ status: true, message: "list of Books", data: bookList })


    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}








//  <--------------------------------------------------- group data API --------------------------------------------------->

const groupData = async function (req, res) {
    try {
        // let bookList = await bookModel.find(filter).select({ ISBN: 0, subcategory: 0, isDeleted: 0, deletedAt: 0, __v: 0 }).collation({ locale: "en" }).sort({ title: 1 })

        let bookCategory = await bookModel.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }, { "$sort": { "count": -1, "_id": 1 } }])

        let bookAuthor = await bookModel.aggregate([{ $group: { _id: "$author", count: { $sum: 1 } } }, { "$sort": { "count": -1, "_id": 1 } }])

        let bookLanguage = await bookModel.aggregate([{ $group: { _id: "$language", count: { $sum: 1 } } }, { "$sort": { "count": -1, "_id": 1 } }])

        // let bookList = await bookModel.find()

        if (bookCategory.length == 0) return res.status(404).json({ status: false, message: "No data found" })

        return res.status(200).json({ status: true, message: "list of Books", data: { bookCategory, bookAuthor, bookLanguage } })


    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}

//  <------------------------------------------- Get Book by user/getAllBooks ------------------------------------------->

const getBooks = async function (req, res) {
    try {
        // let bookId = req.body
        // console.log("req.query", req.query);
        const query = JSON.parse(req.query.filter)
        const { filter, discount, ratings, minPrice, maxPrice } = query

        // console.log(query);
        // console.log(filter);
        // console.log(JSON.parse(req.query.filter));


        // const f = JSON.parse(filter)
        // console.log("f", f);
        // const fil = f.filter
        // console.log("fil", fil);

        // if (!ObjectId(bookId)) return res.status(400).send({ status: false, message: " Invalid bookId" })

        // let book = await bookModel.find({ $or: [{ title: search }, { author: search }, { publisher: search }, { ISBN: search }] })
        // let user = await userModel.find({})//.select({ ratings: 1, author: 1, category: 1, price: 1 })
        // let book = await bookModel.find({})//.select({ ratings: 1, author: 1, category: 1, price: 1 })

        // let book = await bookModel.find()//.select({ title: 1, ratings: 1, author: 1, category: 1, price: 1, discountPercent: 1, language: 1, _id: 0 })


        let book = await bookModel.find({
            ...filter,
            ratings: { $gte: ratings || 1 },
            discountPercent: { $gte: discount || 0 },
            price: { $gte: minPrice || 1, $lte: maxPrice || 9999 }
        }).
            select({ description: 0, excerpt: 0, thumbnail: 0, tags: 0, deletedAt: 0, releasedAt: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0, })

        // select({ ratings: 1, author: 1, category: 1, price: 1, discountPercent: 1, language: 1, _id: 0 })

        // console.log(user, user.length);
        // console.log(book, book.length);
        // console.log(JSON.parse(req.query.filter));

        // if (!user) return res.status(404).send({ status: false, message: "user not found" })
        if (!book) return res.status(404).send({ status: false, message: "Book not found" })

        // reviewsData = await reviewModel.find({ bookId: bookId }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })

        // let obj = book._doc
        // obj["reviewsData"] = reviewsData
        res.status(200).json({ status: true, message: "Books found", data: book })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createBook, getBooks, groupData, getAllBooks }