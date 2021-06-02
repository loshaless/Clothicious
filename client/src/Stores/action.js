const axios = require('axios');
let baseURL = 'http://18.234.129.205:3000'

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

export function fetchUserData() {
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
      dispatch({ type: 'FETCH_USER', payload: data })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function editUser(input, toast) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await axios({
        url: baseURL + '/profil/',
        method: "PUT",
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: input
      })
      dispatch(fetchUserData())
    }
    catch (error) {
      toast({
        title: error.response.data.message,
        status: "warning",
        duration: 3000,
        isClosable: true,
        variant: "left-accent"
      })
      console.log(error.response.data.message, "di action edit");
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

export function editProduct(input, toast) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await axios({
        url: baseURL + '/products/' + input.id,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: input
      })
      dispatch(fetchProductsByLoggedUser())
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      toast({
        title: error.response.data.message,
        status: "warning",
        duration: 3000,
        isClosable: true,
        variant: "left-accent"
      })
      console.log(error.response.data.message, "di action edit Product");
    }
  }
}

export function deleteProduct(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await axios({
        url: baseURL + '/products/' + id,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      dispatch(fetchProductsByLoggedUser())
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
      dispatch({ type: 'SET_LOADING', payload: false })
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

export function fetchTransactions() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      const { data } = await axios({
        url: baseURL + '/transactions/',
        method: "GET",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      dispatch({ type: 'FETCH_TRANSACTIONS', payload: data })
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

export function fetchHistoryTransactions() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      const { data } = await axios({
        url: baseURL + '/historyTransactions/',
        method: "GET",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      dispatch({ type: 'FETCH_TRANSACTIONS', payload: data })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function fetchTransactionDetail(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const { data } = await axios({
        url: baseURL + '/transactions/' + id,
        method: "GET",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      dispatch({ type: 'FETCH_TRANSACTION_DETAIL', payload: data })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function buyerConfirmation(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await axios({
        url: baseURL + '/buyerTransactions/' + id,
        method: "PATCH",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      dispatch(fetchTransactionDetail(id))
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function sellerConfirmation(id, productId) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await axios({
        url: baseURL + '/sellerTransactions/' + id,
        method: "PATCH",
        data: { ProductId: productId },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      dispatch(fetchTransactionDetail(id))
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function deleteUserMessage(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await axios({
        url: baseURL + '/userMessages/' + id,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      dispatch(fetchTransactionDetail(id))
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function deleteSellerMessage(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await axios({
        url: baseURL + '/sellerMessages/' + id,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      dispatch(fetchTransactionDetail(id))
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function fetchMessages() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const { data } = await axios({
        url: baseURL + '/messages/',
        method: "GET",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      dispatch({ type: 'FETCH_MESSAGES', payload: data })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}

export function rupiah(value) {
  const sValue = String(value)
  let result = ''
  let jumlah = 0
  for (let i = sValue.length - 1; i >= 0; i--) {
    jumlah++
    result = sValue[i] + result
    if (jumlah % 3 === 0 && jumlah !== 0) {
      result = '.' + result
    }
  }
  return `Rp${result}`
}