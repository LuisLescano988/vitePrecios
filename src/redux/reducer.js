import{
    // GET_ALL_BOOKS,
    // GET_BOOK_DETAIL,
    POST_PRODUCT
} from './actionTypes';

const initialState = {
    products: [],
    // detail: []
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_BPRODUCTS:
            return {
                ...state,
                products: payload
            }
        // case GET_BOOK_DETAIL:
        //     return{
        //         ...state,
        //         detail: payload
        //     }
            case POST_PRODUCT:
                return{
                    ...state,
                    products: payload
                }
            default: return state
        }
    }