const initialState = {
  products: [],
  productDetail: {},
  transactions: [],
  transactionDetail: {},
  messages: [],
  user: {},
  isLoading: true,
  isLogin: false,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return { ...state, products: action.payload, isLoading: false }
    case 'FETCH_PRODUCT_DETAIL':
      return { ...state, productDetail: action.payload, isLoading: false }
    case 'FETCH_TRANSACTIONS':
      return { ...state, transactions: action.payload }
    case 'FETCH_TRANSACTION_DETAIL':
      return { ...state, transactionDetail: action.payload }
    case 'FETCH_USER':
      return { ...state, user: action.payload }
    case 'FETCH_MESSAGES':
      return { ...state, messages: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_LOGIN':
      return { ...state, isLogin: action.payload }
    default:
      return state
  }
}

export default reducer