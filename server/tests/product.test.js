// const jest = require('jest')
const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { generateToken } = require('../helper/jwt')
const {User, Product} = require('../models');


let token = ""
let invalidToken = ""
let productId = 0

const user = {
  username: 'user',
  email: 'user@mail.com',
  password: 'user',
  phone: '887'
} 

const wrongUser = {
  username: 'wrongUser',
  email: 'wrongUser@mail.com',
  password: 'wrongUser',
  phone: '555'
}

const newProduct = {
  name: 'barang',
  UserId: 0,
  rentPrice: 10000,
  guaranteePrice: 10000,
  fit: 'fitDong',
  lining: true,
  sheerLevel: true,
  bustSize: 3,
  waistSize: 3,
  hipsSize: 3,
  length: 3,
  stretchability: 3,
  thickness: 3,
  availability: true,
  description: 'good',
  category: 'women',
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
  jest.setTimeout(30000)
  User.create(user)
    .then((data) => {
      token = generateToken(data.dataValues)
      // console.log('token  ==> ',token);
      newProduct.UserId = data.dataValues.id
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

// POST
describe('Create product case POST /products', () => {
  it('Success test should return json of product', (done) => {
    request(app)
    .post('/products')
    .set('access_token', token)
    .field('name', 'barang')
    .field('UserId', 0)
    .field('rentPrice', 10000)
    .field('guaranteePrice', 10000)
    .field('fit', 'fitDong')
    .field('lining', true)
    .field('sheerLevel', true)
    .field('bustSize', 3)
    .field('waistSize', 3)
    .field('hipsSize', 3)
    .field('length', 3)
    .field('stretchability', 3)
    .field('thickness', 3)
    .field('availability', true)
    .field('description', 'good')
    .field('category', 'women')
    .attach('productImages','tests/uploads/backImg-1622449988779.jpg')
    .attach('productImages','tests/uploads/frontImg-1622449740764.jpg')
    .attach('productImages','tests/uploads/sideImg-1622449992077.jpg')
    .then(response => {
      let {body, status} = response
      console.log('BARU', {body, status});
      productId = body.data.id
      expect(status).toBe(201)
      expect(response).toHaveProperty('body', expect.any(Object))
      expect(body.data).toHaveProperty('id', expect.any(Number))
      expect(body.data).toHaveProperty('name', newProduct.name)
      expect(body.data).toHaveProperty('UserId', newProduct.UserId)
      expect(body.data).toHaveProperty('rentPrice', newProduct.rentPrice)
      expect(body.data).toHaveProperty('guaranteePrice', newProduct.guaranteePrice)
      expect(body.data).toHaveProperty('fit', newProduct.fit)
      expect(body.data).toHaveProperty('lining', newProduct.lining)
      expect(body.data).toHaveProperty('sheerLevel', newProduct.sheerLevel)
      expect(body.data).toHaveProperty('bustSize', newProduct.bustSize)
      expect(body.data).toHaveProperty('waistSize', newProduct.waistSize)
      expect(body.data).toHaveProperty('hipsSize', newProduct.hipsSize)
      expect(body.data).toHaveProperty('length', newProduct.length)
      expect(body.data).toHaveProperty('stretchability', newProduct.stretchability)
      expect(body.data).toHaveProperty('thickness', newProduct.thickness)
      expect(body.data).toHaveProperty('description', newProduct.description)
      expect(body.data).toHaveProperty('category', newProduct.category)
      done()
    })
    .catch(err => {
        done(err)
    })

  }, 30000)

  it('it should return error message "jwt must be provided', (done) => {
    request(app)
    .post('/products')
    .field('name', 'barang')
    .field('UserId', 0)
    .field('rentPrice', 10000)
    .field('guaranteePrice', 10000)
    .field('fit', 'fitDong')
    .field('lining', true)
    .field('sheerLevel', true)
    .field('bustSize', 3)
    .field('waistSize', 3)
    .field('hipsSize', 3)
    .field('length', 3)
    .field('stretchability', 3)
    .field('thickness', 3)
    .field('availability', true)
    .field('description', 'good')
    .field('category', 'women')
    .attach('productImages','tests/uploads/backImg-1622449988779.jpg')
    .attach('productImages','tests/uploads/frontImg-1622449740764.jpg')
    .attach('productImages','tests/uploads/sideImg-1622449992077.jpg')
    .then(response => {
        let {body, status} = response
        // console.log({body, status});
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'jwt must be provided')
        done()
    })
    .catch(err => {
        done(err)
    })
  })

  // it('it should return error message "unathorized"', (done) => {
  //   request(app)
  //   .post('/products')
  //   .set('access_token', invalidToken)
  //   .set('Accept', 'application/json')
  //   .field('name', 'barang')
  //   .field('UserId', 0)
  //   .field('rentPrice', 10000)
  //   .field('guaranteePrice', 10000)
  //   .field('fit', 'fitDong')
  //   .field('lining', true)
  //   .field('sheerLevel', true)
  //   .field('bustSize', 3)
  //   .field('waistSize', 3)
  //   .field('hipsSize', 3)
  //   .field('length', 3)
  //   .field('stretchability', 3)
  //   .field('thickness', 3)
  //   .field('availability', true)
  //   .field('description', 'good')
  //   .field('category', 'women')
  //   .attach('productImages','tests/uploads/backImg-1622449988779.jpg')
  //   .attach('productImages','tests/uploads/frontImg-1622449740764.jpg')
  //   .attach('productImages','tests/uploads/sideImg-1622449992077.jpg')
  //   .expect('Content-Type', /json/)
  //   .then(response => {
  //       let {body, status} = response
  //       expect(status).toBe(201)
  //       expect(response).toHaveProperty('body', expect.any(Object))
  //       done()
  //   })
  //   .catch(err => {
  //       done(err)
  //   })
  // })


  //name must not be empty  
  it('it should return error message "name must not be empty', (done) => {
    request(app)
    .post('/products')
    .set('access_token', token)
    .field('name', '')
    .field('UserId', 0)
    .field('rentPrice', 10000)
    .field('guaranteePrice', 10000)
    .field('fit', 'fitDong')
    .field('lining', true)
    .field('sheerLevel', true)
    .field('bustSize', 3)
    .field('waistSize', 3)
    .field('hipsSize', 3)
    .field('length', 3)
    .field('stretchability', 3)
    .field('thickness', 3)
    .field('availability', true)
    .field('description', 'good')
    .field('category', 'women')
    .attach('productImages','tests/uploads/backImg-1622449988779.jpg')
    .attach('productImages','tests/uploads/frontImg-1622449740764.jpg')
    .attach('productImages','tests/uploads/sideImg-1622449992077.jpg')
    .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'name must not be empty')
        done()
    })
    .catch(err => {
        done(err)
    })
  }, 30000)
    

  // // harga sewa harus integer

  it('it should return error message "price must be an integer', (done) => {
    request(app)
    .post('/products')
    .set('access_token', token)
    .field('name', 'barang')
    .field('UserId', 0)
    .field('rentPrice', 'sepuluh')
    .field('guaranteePrice', 10000)
    .field('fit', 'fitDong')
    .field('lining', true)
    .field('sheerLevel', true)
    .field('bustSize', 3)
    .field('waistSize', 3)
    .field('hipsSize', 3)
    .field('length', 3)
    .field('stretchability', 3)
    .field('thickness', 3)
    .field('availability', true)
    .field('description', 'good')
    .field('category', 'women')
    .attach('productImages','tests/uploads/backImg-1622449988779.jpg')
    .attach('productImages','tests/uploads/frontImg-1622449740764.jpg')
    .attach('productImages','tests/uploads/sideImg-1622449992077.jpg')
    .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'price must be an integer')
        done()
    })
    .catch(err => {
        done(err)
    })
  }, 30000)

  // harga sewa harus lebih dari 0
  it('it should return error message "price cannot be minus"', (done) => {
    request(app)
    .post('/products')
    .set('access_token', token)
    .field('name', 'barang')
    .field('UserId', 0)
    .field('rentPrice', 10000)
    .field('guaranteePrice', -1)
    .field('fit', 'fitDong')
    .field('lining', true)
    .field('sheerLevel', true)
    .field('bustSize', 3)
    .field('waistSize', 3)
    .field('hipsSize', 3)
    .field('length', 3)
    .field('stretchability', 3)
    .field('thickness', 3)
    .field('availability', true)
    .field('description', 'good')
    .field('category', 'women')
    .attach('productImages','tests/uploads/backImg-1622449988779.jpg')
    .attach('productImages','tests/uploads/frontImg-1622449740764.jpg')
    .attach('productImages','tests/uploads/sideImg-1622449992077.jpg')
    .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'price cannot be minus')
        done()
    })
    .catch(err => {
        done(err)
    })
  }, 30000)


  // harga sewa harus lebih dari 0
  it('it should return error message "price cannot be minus"', (done) => {
    request(app)
    .post('/products')
    .set('access_token', token)
    .field('name', 'barang')
    .field('UserId', 0)
    .field('rentPrice', 10000)
    .field('guaranteePrice', -1)
    .field('fit', 'fitDong')
    .field('lining', true)
    .field('sheerLevel', true)
    .field('bustSize', 3)
    .field('waistSize', 3)
    .field('hipsSize', 3)
    .field('length', 3)
    .field('stretchability', 3)
    .field('thickness', 3)
    .field('availability', true)
    .field('description', 'good')
    .field('category', 'women')
    .attach('productImages','tests/uploads/backImg-1622449988779.jpg')
    .attach('productImages','tests/uploads/frontImg-1622449740764.jpg')
    .attach('productImages','tests/uploads/sideImg-1622449992077.jpg')
    .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'price cannot be minus')
        done()
    })
    .catch(err => {
        done(err)
    })
  }, 30000)
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
          expect(body[0]).toHaveProperty('name', newProduct.name)
          expect(body[0]).toHaveProperty('UserId', newProduct.UserId)
          expect(body[0]).toHaveProperty('rentPrice', newProduct.rentPrice)
          expect(body[0]).toHaveProperty('guaranteePrice', newProduct.guaranteePrice)
          expect(body[0]).toHaveProperty('fit', newProduct.fit)
          expect(body[0]).toHaveProperty('lining', newProduct.lining)
          expect(body[0]).toHaveProperty('sheerLevel', newProduct.sheerLevel)
          expect(body[0]).toHaveProperty('bustSize', newProduct.bustSize)
          expect(body[0]).toHaveProperty('waistSize', newProduct.waistSize)
          expect(body[0]).toHaveProperty('hipsSize', newProduct.hipsSize)
          expect(body[0]).toHaveProperty('length', newProduct.length)
          expect(body[0]).toHaveProperty('stretchability', newProduct.stretchability)
          expect(body[0]).toHaveProperty('thickness', newProduct.thickness)
          done()      
        })
      .catch(err => {
          done(err)
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
      console.log('SALAH', body);
      expect(status).toBe(200)
      expect(response).toHaveProperty('body', expect.any(Object))
      expect(body).toHaveProperty('id', expect.any(Number))
      expect(body).toHaveProperty('name', newProduct.name)
      expect(body).toHaveProperty('UserId', newProduct.UserId)
      expect(body).toHaveProperty('rentPrice', newProduct.rentPrice)
      expect(body).toHaveProperty('guaranteePrice', newProduct.guaranteePrice)
      expect(body).toHaveProperty('fit', newProduct.fit)
      expect(body).toHaveProperty('lining', newProduct.lining)
      expect(body).toHaveProperty('sheerLevel', newProduct.sheerLevel)
      expect(body).toHaveProperty('bustSize', newProduct.bustSize)
      expect(body).toHaveProperty('waistSize', newProduct.waistSize)
      expect(body).toHaveProperty('hipsSize', newProduct.hipsSize)
      expect(body).toHaveProperty('length', newProduct.length)
      expect(body).toHaveProperty('stretchability', newProduct.stretchability)
      expect(body).toHaveProperty('thickness', newProduct.thickness)
      expect(body.User).toHaveProperty('id', expect.any(Number))
      expect(body.User).toHaveProperty('username', expect.any(String))
      done()      
    })
    .catch(err => {
      done(err)
    })
  })
})


// UPDATE
describe('Update product case PUT /products', () => {
  it('Success test should return json of product', (done) => {
      request(app)
      .put(`/products/${productId}`)
      .set('access_token', token)
      .field('name', 'barang')
      .field('UserId', 0)
      .field('rentPrice', 10000)
      .field('guaranteePrice', 10000)
      .field('fit', 'fitDong')
      .field('lining', true)
      .field('sheerLevel', true)
      .field('bustSize', 3)
      .field('waistSize', 3)
      .field('hipsSize', 3)
      .field('length', 3)
      .field('stretchability', 3)
      .field('thickness', 3)
      .field('availability', true)
      .field('description', 'good')
      .field('category', 'women')
      .attach('productImages','tests/uploads/backImg-1622449988779.jpg')
      .attach('productImages','tests/uploads/frontImg-1622449740764.jpg')
      .attach('productImages','tests/uploads/sideImg-1622449992077.jpg')
      .then(response => {
        let {body, status} = response
        expect(status).toBe(200)
        expect(response).toHaveProperty('body', expect.any(Object))
        done()
      })
      .catch(err => {
          done(err)
      })
  }, 30000)

  it('it should return error message "jwt must be provided"', (done) => {
    request(app)
    .put(`/products/${productId}`)
    .set('Accept', 'application/json')
    .field('name', 'barang')
    .field('UserId', 0)
    .field('rentPrice', 10000)
    .field('guaranteePrice', 10000)
    .field('fit', 'fitDong')
    .field('lining', true)
    .field('sheerLevel', true)
    .field('bustSize', 3)
    .field('waistSize', 3)
    .field('hipsSize', 3)
    .field('length', 3)
    .field('stretchability', 3)
    .field('thickness', 3)
    .field('availability', true)
    .field('description', 'good')
    .field('category', 'women')
    .attach('productImages','tests/uploads/backImg-1622449988779.jpg')
    .attach('productImages','tests/uploads/frontImg-1622449740764.jpg')
    .attach('productImages','tests/uploads/sideImg-1622449992077.jpg')
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
    .put(`/products/${productId}`)
    .set('access_token', invalidToken)
    .set('Accept', 'application/json')
    .field('name', 'barang')
    .field('UserId', 0)
    .field('rentPrice', 10000)
    .field('guaranteePrice', 10000)
    .field('fit', 'fitDong')
    .field('lining', true)
    .field('sheerLevel', true)
    .field('bustSize', 3)
    .field('waistSize', 3)
    .field('hipsSize', 3)
    .field('length', 3)
    .field('stretchability', 3)
    .field('thickness', 3)
    .field('availability', true)
    .field('description', 'good')
    .field('category', 'women')
    .attach('productImages','tests/uploads/backImg-1622449988779.jpg')
    .attach('productImages','tests/uploads/frontImg-1622449740764.jpg')
    .attach('productImages','tests/uploads/sideImg-1622449992077.jpg')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', "unauthorized")
        done()
    })
    .catch(err => {
        done(err)
    })
  })

//   it('it should return error message "name must not be empty', (done) => {
//     request(app)
//     .put(`/products/${productId}`)
//     .set('access_token', token)
//     .set('Accept', 'application/json')
//     .send({
//       name: '',
//       UserId: 1,
//       rentPrice: 10000,
//       guaranteePrice: 10000,
//       frontImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       backImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       sideImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       fit: 'fitDong',
//       lining: true,
//       sheerLevel: true,
//       bustSize: 3,
//       waistSize: 3,
//       hipsSize: 3,
//       length: 3,
//       stretchability: 3,
//       thickness: 3,
//       availability: true,
//       description: 'good',
//       category: 'women'
//     })
//     .expect('Content-Type', /json/)
//     .then(response => {
//         let {body, status} = response
//         expect(status).toBe(400)
//         expect(body).toHaveProperty('message', 'name must not be empty')
//         done()
//     })
//     .catch(err => {
//         done(err)
//     })
//   })


//   // harga harus lebih besar dari 0
//   it('it should return error message "price cannot be minus"', (done) => {
//     request(app)
//     .put(`/products/${productId}`)
//     .set('access_token', token)
//     .set('Accept', 'application/json')
//     .send({
//       name: 'barang',
//       UserId: 1,
//       rentPrice: -1,
//       guaranteePrice: 10000,
//       frontImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       backImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       sideImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       fit: 'fitDong',
//       lining: true,
//       sheerLevel: true,
//       bustSize: 3,
//       waistSize: 3,
//       hipsSize: 3,
//       length: 3,
//       stretchability: 3,
//       thickness: 3,
//       availability: true,
//       description: 'good',
//       category: 'women'
//     })
//     .expect('Content-Type', /json/)
//     .then(response => {
//         let {body, status} = response
//         expect(status).toBe(400)
//         expect(body).toHaveProperty('message', 'price cannot be minus')
//         done()
//     })
//     .catch(err => {
//         done(err)
//     })
//   })

//   // harga harus integer
//   it('it should return error message "price must be an integer', (done) => {
//     request(app)
//     .put(`/products/${productId}`)
//     .set('access_token', token)
//     .set('Accept', 'application/json')
//     .send({
//       name: 'barang',
//       UserId: 1,
//       rentPrice: 'seribu',
//       guaranteePrice: 10000,
//       frontImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       backImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       sideImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       fit: 'fitDong',
//       lining: true,
//       sheerLevel: true,
//       bustSize: 3,
//       waistSize: 3,
//       hipsSize: 3,
//       length: 3,
//       stretchability: 3,
//       thickness: 3,
//       availability: true,
//       description: 'good',
//       category: 'women'
//     })
//     .expect('Content-Type', /json/)
//     .then(response => {
//         let {body, status} = response
//         expect(status).toBe(400)
//         expect(body).toHaveProperty('message', 'price must be an integer')
//         done()
//     })
//     .catch(err => {
//         done(err)
//     })
//   })


//   // guarantee sewa harus integer

//   it('it should return error message "price must be an integer', (done) => {
//     request(app)
//     .put(`/products/${productId}`)
//     .set('access_token', token)
//     .set('Accept', 'application/json')
//     .send({
//       name: 'barang',
//       UserId: 1,
//       rentPrice: 10000,
//       guaranteePrice: 'sepuluh',
//       frontImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       backImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       sideImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       fit: 'fitDong',
//       lining: true,
//       sheerLevel: true,
//       bustSize: 3,
//       waistSize: 3,
//       hipsSize: 3,
//       length: 3,
//       stretchability: 3,
//       thickness: 3,
//       availability: true,
//       description: 'good',
//       category: 'women'
//     })
//     .expect('Content-Type', /json/)
//     .then(response => {
//         let {body, status} = response
//         expect(status).toBe(400)
//         expect(body).toHaveProperty('message', 'price must be an integer')
//         done()
//     })
//     .catch(err => {
//         done(err)
//     })
//   })
//   // harga sewa harus lebih dari 0
//   it('it should return error message "price cannot be minus"', (done) => {
//     request(app)
//     .put(`/products/${productId}`)
//     .set('access_token', token)
//     .set('Accept', 'application/json')
//     .send({
//       name: 'barang',
//       UserId: 1,
//       rentPrice: 10000,
//       guaranteePrice: -1,
//       frontImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       backImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       sideImg: 'https://images.unsplash.com/photo-1621972660772-6a0427d5e102?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//       fit: 'fitDong',
//       lining: true,
//       sheerLevel: true,
//       bustSize: 3,
//       waistSize: 3,
//       hipsSize: 3,
//       length: 3,
//       stretchability: 3,
//       thickness: 3,
//       availability: true,
//       description: 'good',
//       category: 'women'
//     })
//     .expect('Content-Type', /json/)
//     .then(response => {
//         let {body, status} = response
//         expect(status).toBe(400)
//         expect(body).toHaveProperty('message', 'price cannot be minus')
//         done()
//     })
//     .catch(err => {
//         done(err)
//     })
//   })
})

// // DELETE
describe('Delete product case DELETE /products', () => {
  it('Success test should return json of product', (done) => {
    request(app)
    .delete(`/products/${productId}`)
    .set('access_token', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        let {body, status} = response
        // console.log('>>>>>>>>..', {body, status});
        expect(status).toBe(200)
        expect(response).toHaveProperty('body', expect.any(Object))
        expect(body).toHaveProperty('message', 'Product has been deleted')
        done()
    })
    .catch(err => {
        done(err)
    })
  })
//   it('it should return error message "authentication failed" when the token is empty', (done) => {
//     request(app)
//     .delete(`/products/${productId}`)
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .then(response => {
//         let {body, status} = response
//         expect(status).toBe(500)
//         expect(body).toHaveProperty('message', 'jwt must be provided')
//         done()
//     })
//     .catch(err => {
//         done(err)
//     })
//   })

//   it('it should return error message "unauthorized" when user not authorized', (done) => {
//     request(app)
//     .delete(`/products/${productId}`)
//     .set('access_token', token)
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .then(response => {
//         let {body, status} = response
//         expect(status).toBe(401)
//         expect(body).toHaveProperty('message', "unauthorized")
//         done()
//     })
//     .catch(err => {
//         done(err)
//     })
//   })
})