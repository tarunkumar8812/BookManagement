import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    newSearch: "",
    data: null
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return {
                newSearch: action.payload.newSearch,
                data: action.payload.data
            };
        case "RESET_SEARCH":
            return {
                // INITIAL_STATE
                newSearch: "",
                data: action.payload.data
            };
        default:
            return state;
    }
};

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    // console.log("state", state);


    return (
        <SearchContext.Provider
            value={{
                newSearch: state.newSearch,
                bookData: state.data,
                dispatch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};



// ISBN : "978-0143445906"
// author : "shravya bhinder"
// authorId : "63329f0e6af2115a919165e2"
// availableQuantity : 150
// bookCover : "https://m.media-amazon.com/images/I/51Xjv4IzydL._SX322_BO1,204,203,200_.jpg"
// category : "novel"
// countryOfOrigin : "india"
// createdAt : "2023-05-22T06:43:50.007Z"
// deletedAt : null
// description : "When in love, you tend to take each other for granted, and sometimes, that can cost you a lifetime of togetherness...Ronnie knew that his first crush was way out of his league, and yet he pursued and wooed Adira. Shyly and from a distance in the beginning, and more persuasively later. He couldn't believe it when the beautiful Adira actually began to reciprocate, falling in love with him for his simplicity and honesty.Slowly, as they get close and comfortable with each other, life takes on another hue. From truly magical it becomes routine. There are fights and then making-up sessions-a clash of egos and doubts.Things begin to change for the worst. It is too late. Ronnie and Adira will probably never find their forever after ..."
// dicountPercent : 30
// excerpt : "When in love, you tend to take each other for granted, and sometimes, that can cost you a lifetime of togetherness..."
// format : "Hardcover"
// genre : "novel"
// images : (2) ['https://m.media-amazon.com/images/I/51Xjv4IzydL._SX322_BO1,204,203,200_.jpg', 'https://m.media-amazon.com/images/I/71D3YqhbTiL.jpg']
// isAvailable : true
// isDeleted : false
// isPublished : true
// language : "hindi"
// numberOfPages : 256
// price : 350
// publishedYear : 2019
// publisherId : "63329f0e6af2115a919165e2"
// ratings : 3.5
// releasedAt : "2019-02-15T00:00:00.000Z"
// reviews : 92
// size : "12.7 x 1.52 x 20.32"
// soldCopies : 155
// subcategory : "suspense"
// thumbnail : "https://m.media-amazon.com/images/I/51Xjv4IzydL._SX322_BO1,204,203,200_.jpg"
// title : "something i never told you"
// updatedAt : "2023-05-23T12:54:17.363Z"
// weight : 250