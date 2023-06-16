import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    data: null
};

export const DataContext = createContext(INITIAL_STATE);

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

export const DataContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    // console.log("state", state);


    return (
        <DataContext.Provider
            value={{
                newSearch: state.newSearch,
                bookData: state.data,
                dispatch,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
