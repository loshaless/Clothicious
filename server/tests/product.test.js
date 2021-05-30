const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { generateToken } = require('../helper/jwt')
const {User, Product} = require('../models');

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


const newProduct = {
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


let token = ""
let invalidToken = ""
let product = {}
let productId = 0

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
      // console.log('DATA USER>>>', data);
      token = generateToken(data.dataValues)
      console.log('token  ==> ',token);
      return User.create(wrongUser)    
    })
    .then((data) => {
      invalidToken = generateToken(data.dataValues)
      return Product.create(newProduct)
    })
    .then((data) => {
      productId = data.id
      product = data
      done()
    })
    .catch((err) => {
      done()
    })
})


// POST
describe('Create product case POST /products', () => {
  it('Success test should return json of product', (done) => {
      request(app)
      .post('/products')
      .set('access_token', token)
      .set('Accept', 'application/json')
      .send(product)
      .expect('Content-Type', /json/)
      .then(response => {
          let {body, status} = response
          console.log({body, status});
          expect(status).toBe(201)
          expect(response).toHaveProperty('body', expect.any(Object))
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('name', createdProduct.name)
          expect(body).toHaveProperty('UserId', createdProduct.UserId)
          expect(body).toHaveProperty('rentPrice', createdProduct.rentPrice)
          expect(body).toHaveProperty('guaranteePrice', createdProduct.guaranteePrice)
          expect(body).toHaveProperty('frontImg', createdProduct.frontImg)
          expect(body).toHaveProperty('backImg', createdProduct.backImg)
          expect(body).toHaveProperty('sideImg', createdProduct.sideImg)
          expect(body).toHaveProperty('fit', createdProduct.fit)
          expect(body).toHaveProperty('lining', createdProduct.lining)
          expect(body).toHaveProperty('sheerLevel', createdProduct.sheerLevel)
          expect(body).toHaveProperty('bustSize', createdProduct.bustSize)
          expect(body).toHaveProperty('waistSize', createdProduct.waistSize)
          expect(body).toHaveProperty('hipsSize', createdProduct.hipsSize)
          expect(body).toHaveProperty('length', createdProduct.length)
          expect(body).toHaveProperty('stretchability', createdProduct.stretchability)
          expect(body).toHaveProperty('thickness', createdProduct.thickness)
          done()
      })
      .catch(err => {
          done(err)
      })
  })

  it('it should return error message "authentication failed', (done) => {
    request(app)
    .post('/products')
    // .timeout(1000)
    .set('Accept', 'application/json')
    .send(product)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        console.log('body', body);
        console.log('status', status);
        expect(status).toBe(403)
        expect(body).toHaveProperty('message', 'authentication failed')
        done()
    })
    .catch(err => {
      // console.log('err', err);
        done(err)
    })
  })

  it('it should return error message "unathorized"', (done) => {
    request(app)
    .post('/products')
    .set('access_token', invalidToken)
    .set('Accept', 'application/json')
    .send(product)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(403)
        expect(body).toHaveProperty('message', "unathorized")
        done()
    })
    .catch(err => {
        done()
    })
  })

  it('it should return error message "name must not be empty', (done) => {
    request(app)
    .post('/products')
    .set('access_token', token)
    .set('Accept', 'application/json')
    .send({
      name: '',
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
    })
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'name must not be empty')
        done()
    })
    .catch(err => {
        done()
    })
  })


  // harga harus lebih besar dari 0
  it('it should return error message "price must be more than 0', (done) => {
    request(app)
    .post('/products')
    .set('access_token', token)
    .set('Accept', 'application/json')
    .send({
      name: '',
      UserId: 1,
      rentPrice: 0,
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
    })
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'price should be more than 0')
        done()
    })
    .catch(err => {
        done()
    })
  })
    


  // harga harus integer
  it('it should return error message "price must be more than 0', (done) => {
    request(app)
    .post('/products')
    .set('access_token', token)
    .set('Accept', 'application/json')
    .send({
      name: '',
      UserId: 1,
      rentPrice: '10000',
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
    })
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'price should be in number')
        done()
    })
    .catch(err => {
        done()
    })
  })
})

// GET
describe('Read product case GET /products', () => {
  it('Success test should return json of products', (done) => {
      request(app)
      .get('/products')
      .set('access_token', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
          let {body, status} = response
          expect(status).toBe(200)
          expect(response).toHaveProperty('body', expect.any(Array))
          expect(body[0]).toHaveProperty('id', expect.any(Number))
          expect(body[0]).toHaveProperty('name', createdProduct.name)
          expect(body[0]).toHaveProperty('UserId', createdProduct.UserId)
          expect(body[0]).toHaveProperty('rentPrice', createdProduct.rentPrice)
          expect(body[0]).toHaveProperty('guaranteePrice', createdProduct.guaranteePrice)
          expect(body[0]).toHaveProperty('frontImg', createdProduct.frontImg)
          expect(body[0]).toHaveProperty('backImg', createdProduct.backImg)
          expect(body[0]).toHaveProperty('sideImg', createdProduct.sideImg)
          expect(body[0]).toHaveProperty('fit', createdProduct.fit)
          expect(body[0]).toHaveProperty('lining', createdProduct.lining)
          expect(body[0]).toHaveProperty('sheerLevel', createdProduct.sheerLevel)
          expect(body[0]).toHaveProperty('bustSize', createdProduct.bustSize)
          expect(body[0]).toHaveProperty('waistSize', createdProduct.waistSize)
          expect(body[0]).toHaveProperty('hipsSize', createdProduct.hipsSize)
          expect(body[0]).toHaveProperty('length', createdProduct.length)
          expect(body[0]).toHaveProperty('stretchability', createdProduct.stretchability)
          expect(body[0]).toHaveProperty('thickness', createdProduct.thickness)
          done()      
        })
      .catch(err => {
          done()
      })
  })

  it('it should return error message internal server error', (done) => {
      request(app)
      .get('/products')
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


// GET BY ID
describe('Read product case GET /products', () => {
  it('Success test should return json of products', (done) => {
    request(app)
    .get(`/products/${productId}`)
    .set('access_token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      let {body, status} = response
      .expect(status).toBe(200)
      .expect(body).toHaveProperty('body', expect.any(Object))
      expect(body).toHaveProperty('id', expect.any(Number))
      expect(body).toHaveProperty('name', createdProduct.name)
      expect(body).toHaveProperty('UserId', createdProduct.UserId)
      expect(body).toHaveProperty('rentPrice', createdProduct.rentPrice)
      expect(body).toHaveProperty('guaranteePrice', createdProduct.guaranteePrice)
      expect(body).toHaveProperty('frontImg', createdProduct.frontImg)
      expect(body).toHaveProperty('backImg', createdProduct.backImg)
      expect(body).toHaveProperty('sideImg', createdProduct.sideImg)
      expect(body).toHaveProperty('fit', createdProduct.fit)
      expect(body).toHaveProperty('lining', createdProduct.lining)
      expect(body).toHaveProperty('sheerLevel', createdProduct.sheerLevel)
      expect(body).toHaveProperty('bustSize', createdProduct.bustSize)
      expect(body).toHaveProperty('waistSize', createdProduct.waistSize)
      expect(body).toHaveProperty('hipsSize', createdProduct.hipsSize)
      expect(body).toHaveProperty('length', createdProduct.length)
      expect(body).toHaveProperty('stretchability', createdProduct.stretchability)
      expect(body).toHaveProperty('thickness', createdProduct.thickness)
      done()
    })
    .catch(err => {
      done()
    })
  })

  it('it should return error message internal server error', (done) => {
    request(app)
    .get(`/products/${productId}`)
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


// UPDATE
describe('Update product case PUT /products', () => {
  it('Success test should return json of product', (done) => {
      request(app)
      .put(`/products/${productId}`)
      .set('access_token', token)
      .set('Accept', 'application/json')
      .send(newProduct)
      .expect('Content-Type', /json/)
      .then(response => {
        let {body, status} = response
        expect(status).toBe(200)
        expect(response).toHaveProperty('body', expect.any(Object))
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('name', createdProduct.name)
        expect(body).toHaveProperty('UserId', createdProduct.UserId)
        expect(body).toHaveProperty('rentPrice', createdProduct.rentPrice)
        expect(body).toHaveProperty('guaranteePrice', createdProduct.guaranteePrice)
        expect(body).toHaveProperty('frontImg', createdProduct.frontImg)
        expect(body).toHaveProperty('backImg', createdProduct.backImg)
        expect(body).toHaveProperty('sideImg', createdProduct.sideImg)
        expect(body).toHaveProperty('fit', createdProduct.fit)
        expect(body).toHaveProperty('lining', createdProduct.lining)
        expect(body).toHaveProperty('sheerLevel', createdProduct.sheerLevel)
        expect(body).toHaveProperty('bustSize', createdProduct.bustSize)
        expect(body).toHaveProperty('waistSize', createdProduct.waistSize)
        expect(body).toHaveProperty('hipsSize', createdProduct.hipsSize)
        expect(body).toHaveProperty('length', createdProduct.length)
        expect(body).toHaveProperty('stretchability', createdProduct.stretchability)
        expect(body).toHaveProperty('thickness', createdProduct.thickness)
        done()
      })
      .catch(err => {
          done()
      })
  })

  it('it should return error message "authentication failed', (done) => {
    request(app)
    .put(`/products/${productId}`)
    .set('Accept', 'application/json')
    .send(product)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(403)
        expect(body).toHaveProperty('message', 'authentication failed')
        done()
    })
    .catch(err => {
        done()
    })
  })

  it('it should return error message "unathorized"', (done) => {
    request(app)
    .put(`/products/${productId}`)
    .set('access_token', invalidToken)
    .set('Accept', 'application/json')
    .send(product)
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(403)
        expect(body).toHaveProperty('message', "unathorized")
        done()
    })
    .catch(err => {
        done()
    })
  })

  it('it should return error message "name must not be empty', (done) => {
    request(app)
    .put(`/products/${productId}`)
    .set('access_token', token)
    .set('Accept', 'application/json')
    .send({
      name: '',
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
    })
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'name must not be empty')
        done()
    })
    .catch(err => {
        done()
    })
  })


  // harga harus lebih besar dari 0
  it('it should return error message "price must be more than 0', (done) => {
    request(app)
    .put(`/products/${productId}`)
    .set('access_token', token)
    .set('Accept', 'application/json')
    .send({
      name: '',
      UserId: 1,
      rentPrice: 0,
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
    })
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'price should be more than 0')
        done()
    })
    .catch(err => {
        done()
    })
  })
    


  // harga harus integer
  it('it should return error message "price must be more than 0', (done) => {
    request(app)
    .put(`/products/${productId}`)
    .set('access_token', token)
    .set('Accept', 'application/json')
    .send({
      name: '',
      UserId: 1,
      rentPrice: '10000',
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
    })
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'price should be in number')
        done()
    })
    .catch(err => {
        done()
    })
  })
})

// DELETE
describe('Delete product case DELETE /products', () => {
  it('Success test should return json of product', (done) => {
      request(app)
      .delete(`/products/${productId}`)
      .set('access_token', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
          let {body, status} = response
          expect(status).toBe(200)
          expect(response).toHaveProperty('body', expect.any(Object))
          expect(body).toHaveProperty('messge', 'Product has been deleted')
          done()
      })
      .catch(err => {
          done()
      })
  })
  it('it should return error message "authentication failed" when the token is empty', (done) => {
    request(app)
    .delete(`/products/${productId}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(403)
        expect(body).toHaveProperty('message', 'authentication failed')
        done()
    })
    .catch(err => {
        done()
    })
  })

  it('it should return error message "unauthorized" when user not authorized', (done) => {
    request(app)
    .delete(`/products/${productId}`)
    .set('access_token', token)
    .set('Accept', 'application/json')
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