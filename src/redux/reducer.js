import {
    // GET_ALL_BOOKS,
    // GET_BOOK_DETAIL,
    GET_ALL_PRODUCTS,
    POST_PRODUCT,
    UPDATE_PRODUCT
} from './actionTypes';

const initialState = {
    products: [],
    // detail: []
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                detail: payload
            }
        case POST_PRODUCT:
            return {
                ...state,
                products: payload
            }
        default: return state
    }
}