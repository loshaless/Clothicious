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

export function payMidtrans(parameter) {
  return async (dispatch) => {
    try {
      const data = await axios({
          url: "http://localhost:3000/getTokenMidtrans",
          method: "POST",
          data: {
            parameter
          }
        })
          .then(snapResponse => {
            console.log("Retrieved snap token:", snapResponse.data);
            window.snap.pay(snapResponse.data, {
              onSuccess: function (result) {
                console.log('success')
                axios({
                  url: "http://localhost:3000/transactions",
                  method: "post",
                  data: {
                    'SellerId': 1,
                    'ProductId': 2,
                    'period': 3
                  }
                })
                  .then(response => {
                    // history.push("/success");
                    console.log("response dari transactions:", response);
                  })
                  .catch(error => {
                    console.log('error dari transactions response', error)
                  })
              },
              onPending: function (result) {
                // history.push("/success");
                console.log('pending')
              },
              onError: function (result) {
                console.log('error')
              },
              onClose: function () {
                console.log('di close')
              }
            })
          })
    }
    catch (error) {
      console.log(error.response);
    }
  }
}