const request = require('supertest');
const app = require('../app')
const { User, Product } = require('../models')
const { generateToken, verivyToken } = require('../helper/jwt')

let token = ""
let product = {}
let productId = 0

beforeAll((done) => {
  User.create({ username: 'tes', email: 'tes@gmail.com', password: 'admin' })
    .then((data) => {
      let user = { id: data.id, username: data.username, email: data.email }
      token = generateToken(user)
      return Product.create({
        name: 'barang',
        UserId: data.id,
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
    })
    .then((data) => {
      productId = data.id
      product = {
        name: data.name,
        UserId: data.UserId,
        rentPrice: data.rentPrice,
        guaranteePrice: data.guaranteePrice,
        frontImg: data.frontImg,
        backImg: data.backImg,
        sideImg: data.sideImg,
        fit: data.fit,
        lining: data.lining,
        sheerLevel: data.sheerLevel,
        bustSize: data.bustSize,
        waistSize: data.waistSize,
        hipsSize: data.hipsSize,
        length: data.length,
        stretchability: data.stretchability,
        thickness: data.thickness,
        availability: data.availability
      }
      done()
    })
    .catch(err => {
      done(err)
    })
})

afterAll((done) => {
  User.destroy({ where: {} })
    .then(() => {
      return Product.destroy({ where: {} })
    })
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
});

describe('success POST /products', function () {
  it('it should return created product data in object when product has been created successfully', function (done) {
    return request(app)
      .post('/products')
      .set('access_token', token)
      .send(product)
      .then(res => {
        expect(res.status).toBe(201)
        done();
      })
      .catch(err => {
        done(err)
      })
  });
});