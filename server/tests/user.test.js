const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(user => {
            done()
        })
        .catch(err => {
            done();
        })
})

//register
describe('Register success case POST /register', () => {
    it('Success test should return json with id, username, email, phone, address, bankAccount value', (done) => {
        request(app)
        .post('/register')
        .send(
            {
                name: 'budi',
                email: 'budi@mail.com',
                password: 'budi',
                phone: '021223344',
                address: 'Jl. Juanda No. 1 Jakarta Pusat',
                bankAccount: '00000123'
            })
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

    //name is required
    it('It should return error message "username must not be empty"', (done) => {
        request(app)
        .post('/register')
        .send({
            email: 'budi@mail.com',
            password: 'budi',
            phone: '021223344',
            address: 'Jl. Juanda No. 1 Jakarta Pusat',
            bankAccount: '00000123'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', "username must not be empty")
            done()
        })
        .catch(err => {
            done()
        })
    })

    //email is required
    it('It should return error message "email must not be empty"', (done) => {
        request(app)
        .post('/register')
        .send({
            username: 'budi00',
            password: 'budi',
            phone: '021223344',
            address: 'Jl. Juanda No. 1 Jakarta Pusat',
            bankAccount: '00000123'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', "email must not be empty")
            done()
        })
        .catch(err => {
            done()
        })
    })


    //email must be unique
    it('It should return error message "email must be unique"', (done) => {
        request(app)
        .post('/register')
        .send({
            username: 'budi',
            email: 'budi@mail.com',
            password: 'budi',
            phone: '021223344',
            address: 'Jl. Juanda No. 1 Jakarta Pusat',
            bankAccount: '00000123'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', "email must be unique")
            done()
        })
        .catch(err => {
            done()
        })
    })

     //email should be valid
    it('It should return error message "email should be valid"', (done) => {
        request(app)
        .post('/register')
        .send({
            username: 'budi',
            email: 'budi aja',
            password: 'budi',
            phone: '021223344',
            address: 'Jl. Juanda No. 1 Jakarta Pusat',
            bankAccount: '00000123'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', "email should be valid")
            done()
        })
        .catch(err => {
            done()
        })
    })

    //phone is required
    it('It should return error message "phone must be unique"', (done) => {
        request(app)
        .post('/register')
        .send({
            username: 'budi',
            email: 'budi@mail.com',
            password: 'budi',
            phone: '',
            address: 'Jl. Juanda No. 1 Jakarta Pusat',
            bankAccount: '00000123'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', "phone must be unique")
            done()
        })
        .catch(err => {
            done()
        })
    })



    //address is required
    it('It should return error message "address must be unique"', (done) => {
        request(app)
        .post('/register')
        .send({
            username: 'budi',
            email: 'budi@mail.com',
            password: 'budi',
            phone: '021223344',
            address: '',
            bankAccount: '00000123'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', "address must be unique")
            done()
        })
        .catch(err => {
            done()
        })
    })

   //bankAccount is required
   it('It should return error message "bank account must be unique"', (done) => {
        request(app)
        .post('/register')
        .send({
            username: 'budi',
            email: 'budi@mail.com',
            password: 'budi',
            phone: '021223344',
            address: '',
            bankAccount: '00000123'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', "bank account must be unique")
            done()
        })
        .catch(err => {
            done()
        })
    })
})


//login
describe('Login success case POST /login', () => {
    //success
    it('Test response json with id, name, token value', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'budi@mail.com',
            password: 'budi'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('token', expect.any(String))
            done()
        })
        .catch(err => {
            done()
        })
    })

    // wrong email
    it('it response json with invalid email orpassword', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'wrongbudi@mail.com',
            password: 'budi'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'invalid email orpassword')
            done()
        })
        .catch(err => {
            done()
        })
    })
    
    //wrong password
    it('it response json with invalid email or password', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'budi@mail.com',
            password: 'wrongbudi'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'invalid email or password')
            done()
        })
        .catch(err => {
            done()
        })
    })

    // blank email password
    it('it response json with invalid email or password', (done) => {
        request(app)
        .post('/login')
        .send({
            email: '',
            password: ''
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'invalid email or password')
            done()
        })
        .catch(err => {
            done()
        })
    })
})


