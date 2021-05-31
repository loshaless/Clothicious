const axios = require('axios');
let baseURL = 'http://localhost:3000'

// export function register(data) {
//   return async (dispatch) => {
//     try {
//       const { user } = await axios({
//         url: baseURL + '/register',
//         method: "POST",
//         data: {
//           username: data.username,
//           email: data.email,
//           password: data.password,
//           phone: data.phone,
//         }
//       })
//       console.log(user);
//       return
//     }
//     catch (error) {
//       console.log(error.response);
//     }
//   }
// }

export function fetchProducts() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseURL + '/products',
        method: "GET"
      })
      return dispatch({ type: 'FETCH_PRODUCTS', payload: data })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}