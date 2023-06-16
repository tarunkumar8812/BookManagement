const bookModel = require('../model/bookModel')
const userModel = require('../model/userModel')

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
        let bookId = req.body
        // console.log("req.query", req.query);
        // const { filter, discount, ratings, minPrice, maxPrice } = JSON.parse(req.query.filter)

        // console.log(filter);
        // console.log(JSON.parse(req.query.filter));


        // const f = JSON.parse(filter)
        // console.log("f", f);
        // const fil = f.filter
        // console.log("fil", fil);

        // if (!ObjectId(bookId)) return res.status(400).send({ status: false, message: " Invalid bookId" })

        // let book = await bookModel.find({ $or: [{ title: search }, { author: search }, { publisher: search }, { ISBN: search }] })
        let user = await userModel.find({})//.select({ ratings: 1, author: 1, category: 1, price: 1 })
        let book = await bookModel.find({})//.select({ ratings: 1, author: 1, category: 1, price: 1 })

        // let book = await bookModel.find()//.select({ title: 1, ratings: 1, author: 1, category: 1, price: 1, discountPercent: 1, language: 1, _id: 0 })


        // let book = await bookModel.find({
        //     ...filter,
        //     ratings: { $gte: ratings || 1 },
        //     discountPercent: { $gte: discount || 0 },
        //     price: { $gte: minPrice || 1, $lte: maxPrice || 9999 }
        // }).
        //     select({ description: 0, excerpt: 0, thumbnail: 0, tags: 0, deletedAt: 0, releasedAt: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0, })

        // select({ ratings: 1, author: 1, category: 1, price: 1, discountPercent: 1, language: 1, _id: 0 })
        
        console.log(user, user.length);
        console.log(book, book.length);
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

module.exports = { getBooks, groupData }