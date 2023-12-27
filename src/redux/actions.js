import axios from "axios";
import {
  POST_PRODUCT,
  //   POST_NEW_USER,
  GET_ALL_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from './actionTypes';
import mockData from '../assets/MOCK_DATA.json'

const URL = 'http://localhost:8000/api/all_products/'

<<<<<<< HEAD
export function postNewProduct(data) {
  return async function (dispatch) {
    try {
      const newProduct = {
        id: mockData.length + 1,
        ...data
      };
      const updatedData = [...mockData, newProduct];

      dispatch({
        type: POST_PRODUCT,
        payload: updatedData
      });

      return newProduct
    } catch (error) {
      console.error(error);
=======
export function postNewProduct(payload) {
    return function (dispatch) {
        try {
            axios.post(URL, payload)
            .then((data) => {
                return dispatch({
                    type: POST_PRODUCT,
                    payload: data
                });
            })
        } catch (error){
            console.error(error);
        }
>>>>>>> luigiDev
    }
};

export function getAllProducts() {
  return async function (dispatch) {
    try {
      var response = await axios.get(URL)
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: response.data
      });
    } catch (error) {
      console.log(error)
    }
  }
};

export function updateProduct(id, body) {
  return async function (dispatch) {
    try {
      const productDetail = await axios.put(URL+id, body);
      if (productDetail) {
        return dispatch({
          type: UPDATE_PRODUCT,
          payload: productDetail,
        });
      } else {
        console.error(`No se encontró un libro con el ID: ${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
};


export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      console.log(id, 'id');
      const productDetail = await axios.delete(URL+id);
      if (productDetail) {
        console.log(productDetail,"IF")
        return dispatch({
          type: DELETE_PRODUCT,
          payload: productDetail,
        });
      } else {
        console.error(`No se encontró un libro con el ID: ${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
};

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

