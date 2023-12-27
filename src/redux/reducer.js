import {
    GET_ALL_PRODUCTS,
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
        default: return state
    }
}