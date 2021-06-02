const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { generateToken, verivyToken } = require('../helper/jwt')
const {User, Product, Transaction} = require('../models');

let token = ""
let invalidToken = ""
let TransactionId = 0
let UserId = 0
let SellerId = 0
let ProductId = 0

const user = {
  username: 'user',
  email: 'user@mail.com',
  password: 'user',
  phone: '114'
} 

const wrongUser = {
  username: 'wrongUser',
  email: 'wrongUser@mail.com',
  password: 'wrongUser',
  phone: '115'
}

const seller = {
  username: 'seller',
  email: 'seller@mail.com',
  password: 'seller',
  phone: '108'
}

const product = {
  name: 'barang',
  UserId: 1,
  rentPrice: 10000,
  guaranteePrice: 10000,
  frontImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  backImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  sideImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  fit: 'fitDong',
  lining: true,
  sheerLevel: true,
  bustSize: 3,
  waistSize: 3,
  hipsSize: 3,
  length: 3,
  stretchability: 3,
  thickness: 3,
  availability: true
}

const newTransaction = {
  UserId: 1,
  SellerId: 2,
  ProductId: 3,
}

function setUser(){
  return User.create({
    username: 'adi',
    email: 'adi@mail.com',
    password: 'adi',
    phone: '1234567'
  })
}


afterAll((done) => {
  queryInterface.bulkDelete('Products')
    .then(user => {
      done()
    })
    .catch(err => {
      done();
    })
  queryInterface.bulkDelete('Users')
    .then(user => {
      done()
    })
    .catch(err => {
      done();
    })
})


beforeAll((done) => {
  User.create(user)
    .then((data) => {
      token = generateToken(data.dataValues)
      newTransaction.UserId = data.dataValues.id
      return User.create(seller)    
    })
    .then((data) => {
      sellerToken = generateToken(data.dataValues)
      return User.create(wrongUser)
    })
    .then((data) => {
      invalidToken = generateToken(data.dataValues)      
      done()
    })
    .catch((err) => {
      done()
    })
})

// GET ALL GOING TRANSACTION
describe('Read product case GET /transactions', () => {
  it('Success test should return object with keys', (done) => {
    request(app)
    .get('/transactions')
    .set('access_token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      let {body, status} = response
      console.log('going', response.body);
      console.log({body, status});
      expect(status).toBe(200)
      expect(body).toHaveProperty('currentlyRenting', expect.any(Array))
      expect(body).toHaveProperty('rentedProducts', expect.any(Array))
      done()
    })
    .catch(err => {
        done(err)
    })
  })

  it('it should return error message "jwt must be provided', (done) => {
    request(app)
    .get('/transactions')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'jwt must be provided')
        done()
    })
    .catch(err => {
        done(err)
    })
  })
})

// GET  ALL DONE TRANSACTIONS
describe('Read product case GET /transactions', () => {
  it('Success test should return json of products', (done) => {
    request(app)
    .get('/historyTransactions')
    .set('access_token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(200)
      expect(body).toHaveProperty('currentlyRenting', expect.any(Array))
      expect(body).toHaveProperty('rentedProducts', expect.any(Array))
      done()
    })
    .catch(err => {
        done(err)
    })
  })

  it('it should return error message "jwt must be provided', (done) => {
    request(app)
    .get('/historyTransactions')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'jwt must be provided')
        done()
    })
    .catch(err => {
        done(err)
    })
  })
})

//CREATE TRANSACTION
describe('Create Transaction success case POST /transactions', () => {
  it('Success test should return json with id, UserId, SellerId, and ProductId', (done) => {
    request(app)
    .post('/transactions')
    .set('access_token', token)
    .set('Accept', 'application/json')
    .send(newTransaction)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        TransactionId = body.id
        ProductId = body.ProductId
        console.log('TRANSACTION', body);
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        done()
    })
    .catch(err => {
        done(err)
    })
  })

  it('it should return error message "jwt must be provided', (done) => {
    request(app)
    .post('/transactions')
    .set('Accept', 'application/json')
    .send(newTransaction)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'jwt must be provided')
        done()
    })
    .catch(err => {
        done(err)
    })
  })

  // it('it should return error message "unauthorized"', (done) => {
  //   request(app)
  //   .post('/transactions')
  //   .set('access_token', invalidToken )
  //   .set('Accept', 'application/json')
  //   .send(newTransaction)
  //   .expect('Content-Type', /json/)
  //   .then(response => {
  //       let {body, status} = response
  //       expect(status).toBe(400)
  //       expect(body).toHaveProperty('message', "unauthorized")
  //       done()
  //   })
  //   .catch(err => {
  //       done(err)
  //   })
  // })
})


// GET ONE TRANSACTION
describe('Read product case GET /transactions/id', () => {
  it('Success test should return json of transaction', (done) => {
    request(app)
    .get(`/transactions/${TransactionId}`)
    .set('access_token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      let {body, status} = response
      console.log('body', body);
      expect(status).toBe(200)
      expect(response).toHaveProperty('body', expect.any(Object))
      done()      
    })
    .catch(err => {
      done(err)
    })
  })

  it('it should return error message "jwt must be provided', (done) => {
    request(app)
    .get(`/transactions/${TransactionId}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'jwt must be provided')
        done()
    })
    .catch(err => {
        done(err)
    })
  })

  // it('it should return error message "unauthorized"', (done) => {
  //   request(app)
  //   .get(`/transactions/${TransactionId}`)
  //   .set('access_token', invalidToken )
  //   .set('Accept', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .then(response => {
  //       let {body, status} = response
  //       expect(status).toBe(200)
  //       expect(body).toHaveProperty('message', "unauthorized")
  //       done()
  //   })
  //   .catch(err => {
  //       done(err)
  //   })
  // })

})

//GET ALL MESSAGES
describe('Read messages case GET /messages', () => {

  const updateData = {
    status: false,
    confirmationPeriod: null,
    msgForUser: "your deposit will be returned to you in 3 days",
    msgForSeller: "your money will be sent to you in 3 days"
  }

  afterEach((done) => {
    queryInterface.bulkDelete('Users')
      .then((data) => {
        done()
      })
      .catch((data) => {
        done()
      })
  })


// afterAll((done) => {
//   queryInterface.bulkDelete('Products')
//     .then(user => {
//       done()
//     })
//     .catch(err => {
//       done();
//     })
//   queryInterface.bulkDelete('Users')
//     .then(user => {
//       done()
//     })
//     .catch(err => {
//       done();
//     })
// })


  let userToken = ''
  beforeEach((done) => {
    setUser()
    .then((data) => {
      console.log(data);
      userToken = generateToken(data.dataValues)
      return Transaction.create({
        UserId: data.id,
        SellerId: 77,
        ProductId: 100,
        status: false,
        confirmationPeriod: null,
        msgForUser: "your deposit will be returned to you in 3 days",
      })
    })
    .then((data) => {
      console.log('TRANSACTION1', data);
      return Transaction.create({
        UserId: 22,
        SellerId: data.UserId,
        ProductId: 101,
        status: false,
        confirmationPeriod: null,
        msgForSeller: "your money will be sent to you in 3 days"
      })
    })
    .then((data) => {
      console.log('TRANSACTION2', data);
      done()
    })
    .catch((err) => {
      console.log('errorTR', err);
      done()
    })
  })

  it('Success test should return object with keys', (done) => {
    request(app)
    .get('/messages')
    .set('access_token', userToken)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      // console.log('MESSAGE', response.body);
      let {body, status} = response
      let msgAsUser = body.msgAsUser
      let msgAsSeller = body.msgAsSeller
      console.log('!?', {body, status});
      console.log('!?user', msgAsUser);
      console.log('!?seller', msgAsSeller);


      expect(status).toBe(200)
      expect(response).toHaveProperty('body', expect.any(Object))
      expect(body).toHaveProperty('msgAsSeller', expect.any(Array))
      expect(body).toHaveProperty('msgAsUser', expect.any(Array))
      expect(msgAsUser[0]).toHaveProperty('message', 'your deposit will be returned to you in 3 days')
      done()
    })
    .catch(err => {
        done(err)
    })
  })

  it('it should return error message "jwt must be provided', (done) => {
    request(app)
    .get('/messages')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'jwt must be provided')
        done()
    })
    .catch(err => {
        done(err)
    })
  })


  // it('it should return error message "unauthorized"', (done) => {
  //   request(app)
  //   .get('/messages')
  //   .set('access_token', invalidToken )
  //   .set('Accept', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .then(response => {
  //       let {body, status} = response
  //       expect(status).toBe(201)
  //       expect(body).toHaveProperty('message', "unauthorized")
  //       done()
  //   })
  //   .catch(err => {
  //       done(err)
  //   })
  // })

})

// Update  Buyer Transaction
describe('Update Buyer Transaction success case PATCH /buyerTransactions/:id', () => {
  let userToken = ''
  let buyerTransactionId = 0
  beforeEach((done) => {
    setUser()
    .then((data) => {
      console.log(data);
      userToken = generateToken(data.dataValues)
      return Transaction.create({
        UserId: data.id,
        SellerId: 77,
        ProductId: 100,
        status: false,
        confirmationPeriod: null,
        msgForUser: "your deposit will be returned to you in 3 days",
      })
    })
    .then((data) => {
      console.log('TRANSACTION1', data);
      buyerTransactionId = data.dataValues.id
      return Transaction.create({
        UserId: 22,
        SellerId: data.UserId,
        ProductId: 101,
        status: false,
        confirmationPeriod: null,
        msgForSeller: "your money will be sent to you in 3 days"
      })
    })
    .then((data) => {
      console.log('TRANSACTION2', data);
      done()
    })
    .catch((err) => {
      console.log('errorTR', err);
      done()
    })
  })

  it('Success test should return json with message: message changed', (done) => {
      request(app)
      .patch('/buyerTransactions/'+buyerTransactionId)
      .set('access_token', userToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
          let {body, status} = response
          console.log('RESPONSE', {body, status});
          expect(status).toBe(200)
          expect(body).toHaveProperty('message', 'message changed')
          done()
      })
      .catch(err => {
          done(err)
      })
  })

  it('it should return error message "jwt must be provided', (done) => {
    request(app)
    .patch('/buyerTransactions'+buyerTransactionId)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'jwt must be provided')
        done()
    })
    .catch(err => {
        done(err)
    })
  })

})


// Update  Seller Transaction
describe('Update Seller Transaction success case PATCH /buyerTransactions/:id', () => {

  let userToken = ''
  let sellerTransactionId = 0
  let productID = 0

  beforeEach((done) => {
    console.log('masuk b4each');
    User.destroy({ where: {username: 'adi'}})
    .then(() => {
      return setUser()
    })
    .then((data) => {
      console.log('BOTA DATA', data);
      userToken = generateToken(data.dataValues)
      return Transaction.create({
        UserId: data.id,
        SellerId: 77,
        ProductId: 100,
        status: false,
        confirmationPeriod: null,
        msgForUser: "your deposit will be returned to you in 3 days",
      })
    })
    .then((data) => {
      console.log('BOTADATA2', data);
      return Transaction.create({
        UserId: 22,
        SellerId: data.UserId,
        ProductId: 101,
        status: false,
        confirmationPeriod: null,
        msgForSeller: "your money will be sent to you in 3 days"
      })
    })
    .then((data) => {
      sellerTransactionId = data.dataValues.id
      productID = data.dataValues.ProductId
      console.log('BOTADATA3', data);
      console.log('DIBAWA', sellerTransactionId);
      done()
    })
    .catch((err) => {
      console.log('errorTR', err);
      done()
    })
  })


  
  it('Success test should return json with message: message changed', (done) => {
    request(app)
    .patch('/sellerTransactions/'+sellerTransactionId)
    .set('access_token', userToken)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      console.log('BOTADATA4', sellerTransactionId);
      let {body, status} = response
          console.log('BOTARESPONSE', {body, status});
          expect(status).toBe(200)
          expect(body).toHaveProperty('message', 'message changed')
          done()
      })
      .catch(err => {
          done(err)
      })
  })

  it('it should return error message "jwt must be provided', (done) => {
    request(app)
    .patch('/sellerTransactions/'+sellerTransactionId)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'jwt must be provided')
        done()
    })
    .catch(err => {
        done(err)
    })
  })
})

// DELETE User Message
describe('Delete product case DELETE /userMessages/:id', () => {
  let userToken = ''
  let buyerTransactionId = 0

  beforeEach((done) => {
    setUser()
    .then((data) => {
      console.log(data);
      userToken = generateToken(data.dataValues)
      return Transaction.create({
        UserId: data.id,
        SellerId: 77,
        ProductId: 100,
        status: false,
        confirmationPeriod: null,
        msgForUser: null,
      })
    })
    .then((data) => {
      console.log('TRANSACTION1', data);
      buyerTransactionId = data.dataValues.id
      return Transaction.create({
        UserId: 22,
        SellerId: data.UserId,
        ProductId: 101,
        status: false,
        confirmationPeriod: null,
        msgForSeller: null
      })
    })
    .then((data) => {
      console.log('TRANSACTION2', data);
      done()
    })
    .catch((err) => {
      console.log('errorTR', err);
      done()
    })
  })


  it('Success Delete test should return message has been deleted', (done) => {
    request(app)
    .delete(`/userMessages/${buyerTransactionId}`)
    .set('access_token', userToken)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      let {body, status} = response
      console.log('dideletebuyer', body);
      expect(status).toBe(200)
      expect(response).toHaveProperty('body', expect.any(Object))
      expect(body).toHaveProperty('message', 'message has been deleted')
      done()
    })
    .catch(err => {
        done(err)
    })
  })

  // it('It should return message unauthorized', (done) => {
  //   request(app)
  //   .delete(`/userMessages/${TransactionId}`)
  //   .set('access_token', invalidToken)
  //   .set('Accept', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .then(response => {
  //     let {body, status} = response
  //     expect(status).toBe(401)
  //     expect(response).toHaveProperty('body', expect.any(Object))
  //     expect(body).toHaveProperty('message', 'unauthorized')
  //     done()
  //   })
  //   .catch(err => {
  //       done(err)
  //   })
  // })
 
  it('it should return error message "jwt must be provided" when the token is empty', (done) => {
    request(app)
    .delete(`/userMessages/${TransactionId}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'jwt must be provided')
        done()
    })
    .catch(err => {
        done(err)
    })
  })
})


// DELETE Seller Message
describe('Delete product case DELETE /sellerMessages/:id', () => {
    
  it('Success Delete test should return message authentication failed', (done) => {
    request(app)
    .delete(`/sellerMessages/${TransactionId}`)
    .set('access_token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(401)
      expect(response).toHaveProperty('body', expect.any(Object))
      expect(body).toHaveProperty('message', 'authentication failed')
      done()
    })
    .catch(err => {
        done(err)
    })
  })

  // it('It should return message unauthorized', (done) => {
  //   request(app)
  //   .delete(`/sellerMessages/${TransactionId}`)
  //   .set('access_token', invalidToken)
  //   .set('Accept', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .then(response => {
  //     let {body, status} = response
  //     expect(status).toBe(401)
  //     expect(response).toHaveProperty('body', expect.any(Object))
  //     expect(body).toHaveProperty('message', 'unauthorized')
  //     done()
  //   })
  //   .catch(err => {
  //       done(err)
  //   })
  // })
 
  it('it should return error message "authentication failed" when the token is empty', (done) => {
    request(app)
    .delete(`/sellerMessages/${TransactionId}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'jwt must be provided')
        done()
    })
    .catch(err => {
        done(err)
    })
  })
})