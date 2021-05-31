const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { generateToken, verivyToken } = require('../helper/jwt')
const {User, Product} = require('../models');


let token = ""
let invalidToken = ""
let transactionId = 0
let UserId = 0
let SellerId = 0
let ProductId = 0

const user = {
  username: 'user',
  email: 'user@mail.com',
  password: 'user',
} 

const wrongUser = {
  username: 'wrongUser',
  email: 'wrongUser@mail.com',
  password: 'wrongUser',
}

const seller = {
  username: 'seller',
  email: 'seller@mail.com',
  password: 'seller',
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


  it('it should return error message "unauthorized"', (done) => {
    request(app)
    .get('/transactions')
    .set('access_token', invalidToken )
    .set('Accept', 'application/json')
    .send(newTransaction)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('message', "unauthorized")
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

  it('it should return error message "unauthorized"', (done) => {
    request(app)
    .get('/historyTransactions')
    .set('access_token', invalidToken )
    .set('Accept', 'application/json')
    .send(newTransaction)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('message', "unauthorized")
        done()
    })
    .catch(err => {
        done(err)
    })
  })  


  it('it should return error message "invalid server error"', (done) => {
    request(app)
    .get('/historyTransactions')
    .set('access_tokeen', invalidToken )
    .set('Accept', 'application/json')
    .send(newTransaction)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', "invalid server error")
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
        // console.log("TRANSACTIONS", body);
        transactionId = body.id
        ProductId = body.ProductId
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

  it('it should return error message "unauthorized"', (done) => {
    request(app)
    .post('/transactions')
    .set('access_token', invalidToken )
    .set('Accept', 'application/json')
    .send(newTransaction)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('message', "unauthorized")
        done()
    })
    .catch(err => {
        done(err)
    })
  })
})


// GET ONE TRANSACTION
describe('Read product case GET /transactions/id', () => {
  it('Success test should return json of transaction', (done) => {
    request(app)
    .get(`/transactions/${transactionId}`)
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
    .get(`/transactions/${transactionId}`)
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

  it('it should return error message "unauthorized"', (done) => {
    request(app)
    .get(`/transactions/${transactionId}`)
    .set('access_token', invalidToken )
    .set('Accept', 'application/json')
    .send(newTransaction)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('message', "unauthorized")
        done()
    })
    .catch(err => {
        done(err)
    })
  })

})

//GET ALL MESSAGES
describe('Read messages case GET /messages', () => {
  it('Success test should return object with keys', (done) => {
    request(app)
    .get('/messages')
    .set('access_token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      let {body, status} = response
      console.log('MESSAGE', response.body);
      console.log({body, status});
      expect(status).toBe(200)
      expect(response).toHaveProperty('body', expect.any(Object))
      expect(body).toHaveProperty('msgAsSeller', expect.any(Array))
      expect(body).toHaveProperty('msgAsUser', expect.any(Array))
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


  it('it should return error message "unauthorized"', (done) => {
    request(app)
    .get('/messages')
    .set('access_token', invalidToken )
    .set('Accept', 'application/json')
    .send(newTransaction)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('message', "unauthorized")
        done()
    })
    .catch(err => {
        done(err)
    })
  })

})

// Update  Buyer Transaction
describe('Update Buyer Transaction success case PATCH /buyerTransactions/:id', () => {
  it('Success test should return json with message: message changed', (done) => {
      request(app)
      .patch('/buyerTransactions/'+transactionId)
      .set('access_token', token)
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
    .patch('/buyerTransactions'+transactionId)
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

  it('it should return error message "unauthorized"', (done) => {
    request(app)
    .patch('/buyerTransactions'+transactionId)
    .set('access_token', invalidToken)
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
  it('Success test should return json with message: message changed', (done) => {
      request(app)
      .patch('/sellerTransactions/'+transactionId)
      .send({ProductId})
      .set('access_token', token)
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
    .patch('/sellerTransactions/'+transactionId)
    .set('Accept', 'application/json')
    .send({ProductId})
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

  it('it should return error message "unauthorized"', (done) => {
    request(app)
    .patch('/sellerTransactions/'+transactionId)
    .set('access_token', invalidToken)
    .set('Accept', 'application/json')
    .send({ProductId})
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'unauthorized')
        done()
    })
    .catch(err => {
        done(err)
    })
  })
})






// DELETE User Message
describe('Delete product case DELETE /userMessages/:id', () => {
  it('Success Delete test should return message has been deleted', (done) => {
    request(app)
    .delete(`/userMessages/${transactionId}`)
    .set('access_token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(200)
      expect(response).toHaveProperty('body', expect.any(Object))
      expect(body).toHaveProperty('message', 'message has been deleted')
      done()
    })
    .catch(err => {
        done(err)
    })
  })
  it('Itshould return message unauthorized', (done) => {
    request(app)
    .delete(`/userMessages/${transactionId}`)
    .set('access_token', invalidToken)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(401)
      expect(response).toHaveProperty('body', expect.any(Object))
      expect(body).toHaveProperty('message', 'unauthorized')
      done()
    })
    .catch(err => {
        done(err)
    })
  })
 
  it('it should return error message "authentication failed" when the token is empty', (done) => {
    request(app)
    .delete(`/userMessages/${transactionId}`)
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
    
  it('Success Delete test should return message has been deleted', (done) => {
    request(app)
    .delete(`/sellerMessages/${transactionId}`)
    .set('access_token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(200)
      expect(response).toHaveProperty('body', expect.any(Object))
      expect(body).toHaveProperty('message', 'message has been deleted')
      done()
    })
    .catch(err => {
        done(err)
    })
  })

  it('It should return message unauthorized', (done) => {
    request(app)
    .delete(`/sellerMessages/${transactionId}`)
    .set('access_token', invalidToken)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      let {body, status} = response
      expect(status).toBe(401)
      expect(response).toHaveProperty('body', expect.any(Object))
      expect(body).toHaveProperty('message', 'unauthorized')
      done()
    })
    .catch(err => {
        done(err)
    })
  })
 
  it('it should return error message "authentication failed" when the token is empty', (done) => {
    request(app)
    .delete(`/sellerMessages/${transactionId}`)
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