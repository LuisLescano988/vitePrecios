import axios from "axios";
import {
  POST_PRODUCT,
//   POST_NEW_USER,
  GET_ALL_PRODUCTS,
//   GET_BOOK_DETAIL
} from './actionTypes';
import mockData from '../assets/MOCK_DATA.json'


export function postNewProduct(payload) {
  return async function (dispatch) {
    try {
      const newProduct = {
        id: mockData.length + 1,
        ...payload
      };
      const updatedData = [...mockData, newProduct];

      dispatch({
        type: POST_PRODUCT,
        payload: updatedData
      });

      return newProduct
    } catch (error) {
      console.error(error);
    }
  }
};

export function getAllProducts() {
  return async function (dispatch) {
    try {
      const data = mockData
      // var response = await axios.get (URL)
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data
      })
    } catch (error) {
      console.error(error);
    }
  }
};

// export function getDetail(id) {
//   return async function (dispatch) {
//     console.log(id, 'id');
//     try {
//       const bookDetail = mockData.find((book) => book.id == id);
//       if (bookDetail) {
//         return dispatch({
//           type: GET_BOOK_DETAIL,
//           payload: bookDetail,
//         });
//       } else {
//         console.error(`No se encontró un libro con el ID: ${id}`);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

// export function newUser(payload) {
//   return function (dispatch) {
//     try {
//       axios.post("/register", payload)
//         .then((data) => {
//           return dispatch({
//             type: POST_NEW_USER,
//             payload: data,
//           });
//         });
//     } catch (error) {
//       console.error(error);
//     };
//   };
// };

