const axios = require('axios');
let baseURL = 'http://localhost:3000'

export function register(data) {
  return async (dispatch) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const { data } = await axios({
        url: baseURL + '/register',
        method: "POST",
        data: {
          username: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        }
      })
      console.log(data, "ini register");
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function login(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const user = await axios({
        url: baseURL + '/login',
        method: "POST",
        data: {
          email: data.email,
          password: data.password,
        }
      })
      if (user.status === 200) {
        localStorage.setItem('access_token', user.data.access_token)
        dispatch({ type: 'FETCH_PRODUCTS', payload: data })
        dispatch({ type: 'SET_LOADING', payload: false })
        dispatch({ type: 'SET_LOGIN', payload: true })
      }
      else {
        console.log("login gagal di action login");
      }
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function fetchProducts() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const { data } = await axios({
        url: baseURL + '/products',
        method: "GET"
      })
      dispatch({ type: 'FETCH_PRODUCTS', payload: data })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function fetchProductDetail(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseURL + '/products/' + id,
        method: "GET"
      })
      return dispatch({ type: 'FETCH_PRODUCT_DETAIL', payload: data })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}