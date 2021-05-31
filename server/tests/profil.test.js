
const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { User } = require('../models')

const admin = {
    email: 'budi@mail.com',
    password: 'budi'
}
const tokenAdmin = ''

const profil = {
    name: 'admin',
    email: 'admin@mail.com',
    password: 'budi',
    phone: '021223344',
    address: 'Jl. Juanda No. 1 Jakarta Pusat',
    bankAccount: '00000123'
}

beforeAll((done) => {
    User.create(admin)
        .then((user) => {
            tokenAdmin = signToken(user)
            done()
        })
        .catch((err) => {
            done()
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(user => {
            done()
        })
        .catch(err => {
            done();
        })
})

describe('Update success case PUT /profil/:id', () => {
    it('Success test should return json with id, username, email, phone, address, bankAccount value', (done) => {
        request(app)
        .put('/profil/1')
        .send(profil)
        .set('access_token', tokenAdmin)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('username', UserValid.name)
            expect(body).toHaveProperty('email', UserValid.email)
            expect(body).toHaveProperty('phone', UserValid.phone)
            expect(body).toHaveProperty('address', UserValid.address)
            expect(body).toHaveProperty('bankAccount', UserValid.bankAccount)
            done()
        })
        .catch(err => {
            done()
        })
    })

    it('it should return error message "authentication failed"', (done) => {
        request(app)
        .put('/profil/1')
        .set('Accept', 'application/json')
        .send(profil)
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
        .put('/profil/1')
        .set('access_token', 'random')
        .set('Accept', 'application/json')
        .send(profil)
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


describe('Update success case PATCH /profil:id', () => {
    it('Success test should return json with message: Password has been successfully updated ', (done) => {
        request(app)
        .patch('/profil:id')
        .send({password: 'password'})
        .set('access_token', tokenAdmin)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('message', 'Password has been successfully updated')
            done()
        })
        .catch(err => {
            done()
        })
    })

    it('it should return error message "authentication failed', (done) => {
        request(app)
        .patch('/profil:id')
        .set('Accept', 'application/json')
        .send({password: 'password'})
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
        .patch('/profil/id')
        .set('access_token', 'random')
        .set('Accept', 'application/json')
        .send({password: 'password'})
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