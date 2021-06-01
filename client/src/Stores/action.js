const axios = require('axios');
let baseURL = 'http://localhost:3000'

export function register(user) {
  return async (dispatch) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const { data } = await axios({
        url: baseURL + '/register',
        method: "POST",
        data: {
          username: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
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

export function fetchProductsByLoggedUser() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const { data } = await axios({
        url: baseURL + '/loggedUsers',
        method: "GET",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      dispatch({ type: 'FETCH_PRODUCTS', payload: data.Products })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function deleteProduct(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const { data } = await axios({
        url: baseURL + '/products/' + id,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      fetchProductsByLoggedUser()
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
      dispatch({ type: 'SET_LOADING', payload: true })

      const { data } = await axios({
        url: baseURL + '/products/' + id,
        method: "GET"
      })
      // dispatch({ type: 'SET_LOADING', payload: false })

      return dispatch({ type: 'FETCH_PRODUCT_DETAIL', payload: data })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function fetchUserChatEngine() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const { data } = await axios({
        url: baseURL + '/users',
        method: "GET"
      })
      dispatch({ type: 'FETCH_USER_CHATENGINEIO', payload: data })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function fetchDataUser() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const { data } = await axios({
        url: baseURL + '/loggedUsers',
        method: "GET",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      dispatch({ type: 'FETCH_DATA_USER', payload: data })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}