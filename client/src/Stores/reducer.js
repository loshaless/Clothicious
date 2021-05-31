const initialState = {
  products: [],
  productDetail: {},
  transactions: [],
  transactionDetail: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return { ...state, products: action.payload }
    case 'FETCH_PRODUCT_DETAIL':
      return { ...state, productDetail: action.payload }
    case 'FETCH_TRANSACTIONS':
      return { ...state, transactions: action.payload }
    case 'FETCH_TRANSACTION_DETAIL':
      return { ...state, transactionDetail: action.payload }
    default:
      return state
  }
}

export default reducer