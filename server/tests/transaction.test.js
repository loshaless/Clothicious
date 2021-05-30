const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { generateToken, verivyToken } = require('../helper/jwt')
const {User, Product, Transaction} = require('../models');


let token = ""
let invalidToken = ""
let UserId = 0
let SellerId = 0
let ProductId = 0

const user = {
  username: 'user',
  email: 'user@mail.com',
  password: 'user',
  phone: '021223344',
  address: 'Jl. Juanda No. 1 Jakarta Pusat',
  bankAccount: '00000123'
} 

const wrongUser = {
  username: 'wrongUser',
  email: 'wrongUser@mail.com',
  password: 'wrongUser',
  phone: '021223344',
  address: 'Jl. Juanda No. 1 Jakarta Pusat',
  bankAccount: '00000123'
}

const seller = {
  username: 'seller',
  email: 'seller@mail.com',
  password: 'seller',
  phone: '021223344',
  address: 'Jl. Juanda No. 1 Jakarta Pusat',
  bankAccount: '00000123'  
}

const product = {
  name: 'barang',
  SellerId,
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
  // queryInterface.bulkDelete('Transactions')
  // .then(user => {
  //   done()
  // })
  // .catch(err => {
  //   done();
  // })
})


beforeAll((done) => {
  User.create(user)
    .then((data) => {
      token = generateToken({data})
      UserId = data.id
      return User.create(seller)    
    })
    .then((data) => {
      SellerId = data.id
      return User.create(wrongUser)
    })
    .then((data) => {
      invalidToken = generateToken({data})
      return Product.create(product)
    })
    .then((data) => {
      ProductId = data.id
      done()
    })
    .catch((err) => {
      done()
    })
})


const newTransaction = {
  UserId,
  SellerId,
  ProductId,
  period: 4,
  status: true
}

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
        expect(status).toBe(200)
        expect(body).toHaveProperty('currentlyRenting', expect.any(Array))
        expect(body).toHaveProperty('rentedProducts', expect.any(Array))
        done()
    })
    .catch(err => {
        done()
    })
  })

  it('it should return error message internal server error', (done) => {
    request(app)
    .get('/transactions')
    .set('access_token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', "internal server error")
        done()
    })
    .catch(err => {
        done()
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
        done()
    })
  })

  it('it should return error message internal server error', (done) => {
    request(app)
    .get('/historyTransactions')
    .set('access_token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', "internal server error")
        done()
    })
    .catch(err => {
        done()
    })
  })
})

//CREATE TRANSACTION
describe('Create Transaction success case POST /transactions', () => {
  it('Success test should return json with id, UserId, SellerId, and ProductId', (done) => {
      request(app)
      .post('/transactions')
      .send(newTransaction)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
          let {body, status} = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('UserId', newTransaction.UserId)
          expect(body).toHaveProperty('SellerId', newTransaction.SellerId)
          expect(body).toHaveProperty('ProductId', newTransaction.ProductId)
          done()
      })
      .catch(err => {
          done()
      })
  })

  it('it should return error message "authentication failed', (done) => {
    request(app)
    .post('/transactions')
    .set('Accept', 'application/json')
    .send(newTransaction)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'authentication failed')
        done()
    })
    .catch(err => {
        done()
    })
  })

  it('it should return error message "unauthorized', (done) => {
    request(app)
    .patch('/transactions')
    .set('access_token', invalidToken)
    .set('Accept', 'application/json')
    .send(newTransaction)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(403)
        expect(body).toHaveProperty('message', "unauthorized")
        done()
    })
    .catch(err => {
        done()
    })
  })
})

// Update Transaction
describe('Create Transaction success case PATCH /transactions/:id', () => {
  it('Success test should return json with message transaction status and availibility has been updated', (done) => {
      request(app)
      .patch('/transactions/1')
      .send({
        ProductId
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
          let {body, status} = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('message', 'transaction status and availibility has been updated')
          done()
      })
      .catch(err => {
          done()
      })
  })

  it('it should return error message "authentication failed', (done) => {
    request(app)
    .patch('/transactions')
    .set('Accept', 'application/json')
    .send({
      ProductId
    })
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'authentication failed')
        done()
    })
    .catch(err => {
        done()
    })
  })

  it('it should return error message "unauthorized', (done) => {
    request(app)
    .patch('/transactions/1')
    .set('access_token', invalidToken)
    .set('Accept', 'application/json')
    .send({
      ProductId
    })
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(403)
        expect(body).toHaveProperty('message', "unauthorized")
        done()
    })
    .catch(err => {
        done()
    })
  })

})