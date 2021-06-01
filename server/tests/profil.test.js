const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { User } = require('../models')
const { generateToken } = require('../helper/jwt')


const user = {
    username: 'user',
    email: 'user@mail.com',
    password: 'user',
    phone: '123'
} 
  
const wrongUser = {
    username: 'wrongUser',
    email: 'wrongUser@mail.com',
    password: 'wrongUser',
    phone: '224'
}

let token = ""
let invalidToken = ""
let userId = 0


const profil = {
    name: 'user',
    email: 'user@mail.com',
    password: 'user',
    phone: '021223344',
    address: 'Jl. Juanda No. 1 Jakarta Pusat',
    bankAccount: '00000123'
}

beforeAll((done) => {
    console.log('beforeAll');
    User.create(user)
    .then((data) => {
        console.log('====>', data);
        token = generateToken(data.dataValues)
        console.log('before all token ', token);
        userId = data.dataValues.id
        return User.create(wrongUser)    
    })
    .then((data) => {
        invalidToken = generateToken(data.dataValues)
        done()
    })
    .catch((err) => {
        console.log('ERROR', err);
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

console.log('token', token);

describe('Update success case PUT /profil/:id', () => {
    it('Success test should return json with id, username, email, phone, address, bankAccount value', (done) => {
        request(app)
        .put(`/profil/${userId}`)
        .send(profil)
        .set('access_token', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            console.log({body, status});
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('username', body.username)
            expect(body).toHaveProperty('email', body.email)
            expect(body).toHaveProperty('phone', body.phone)
            expect(body).toHaveProperty('address', body.address)
            expect(body).toHaveProperty('bankAccount', body.bankAccount)
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    // no token
    it('it should return error message "jwt must be provided"', (done) => {
        request(app)
        .put(`/profil/${userId}`)
        .set('Accept', 'application/json')
        .send(profil)
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(500)
            expect(body).toHaveProperty('message', "jwt must be provided")
            done()
        })
        .catch(err => {
            done(err)
        })
    })


    // //invalid Token
    // it('it should return error message "unauthorized', (done) => {
    //     request(app)
    //     .put(`/profil/${userId}`)
    //     .set('access_token', invalidToken)
    //     .set('Accept', 'application/json')
    //     .send({
    //         name: 'editUser',
    //         email: 'user@mail.com',
    //         password: 'editUser',
    //         phone: '021223344',
    //         address: 'Jl. Juanda No. 1 Jakarta Pusat',
    //         bankAccount: '00000123'
    //     })
    //     .expect('Content-Type', /json/)
    //     .then(response => {
    //         let {body, status} = response
    //         expect(status).toBe(400)
    //         expect(body).toHaveProperty('message', "invalid signature")
    //         done()
    //     })
    //     .catch(err => {
    //         done(err)
    //     })
    // })
})


describe('Update success case PATCH /profil/:id', () => {
    it('Success test should return json with message: Password has been successfully updated ', (done) => {
        request(app)
        .patch(`/profil/${userId}`)
        .send({password: 'password'})
        .set('access_token', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            console.log({body, status});
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'Password has been successfully updated')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('it should return error message "jwt must be provided"', (done) => {
        request(app)
        .patch(`/profil/${userId}`)
        .set('Accept', 'application/json')
        .send({password: 'password'})
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(500)
            expect(body).toHaveProperty('message', "jwt must be provided")
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    // it('it should return error message "unauthorized"', (done) => {
    //     request(app)
    //     .patch(`/profil/${userId}`)
    //     .set('access_token', invalidToken)
    //     .set('Accept', 'application/json')
    //     .send({password: 'password'})
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