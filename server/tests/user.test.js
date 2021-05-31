const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { User } = require('../models')


const existingUser = {
    username: 'dummy',
    password: 'dummy',
    email: 'dummy@mail.com'
}

afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(user => {
            done()
        })
        .catch(err => {
            done();
        })
})

beforeAll((done) => {
    User.create(existingUser)
        .then((data) => {
            console.log(data);
            done()
        })
        .catch((err) => {
            done()
        })
})

//register
describe('Register success case POST /register', () => {
    it('Success test should return json with id, username, email, phone, address, bankAccount value', (done) => {
        request(app)
        .post('/register')
        .send(
            {
                username: 'budi',
                email: 'budi@mail.com',
                password: 'budi',
            })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            console.log({body, status});
            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('username', body.username)
            expect(body).toHaveProperty('email', body.email)
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    //name is required
    it('It should return error message "username must not be empty"', (done) => {
        request(app)
        .post('/register')
        .send({
            username: '',
            email: 'budi@mail.com',
            password: 'budi',
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
            done(err)
        })
    })

    //email is required
    it('It should return error message "email must not be empty"', (done) => {
        request(app)
        .post('/register')
        .send({
            username: 'budi00',
            password: 'budi',
            email: ''
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
            done(err)
        })
    })


    //username must be unique
    it('It should return error message "username must be unique"', (done) => {
        request(app)
        .post('/register')
        .send({
            username: 'budi',
            email: 'budi123@mail.com',
            password: 'budi123',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', "username must be unique")
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    //email must be unique
    it('It should return error message "email must be unique"', (done) => {
        request(app)
        .post('/register')
        .send({
            username: 'budi000',
            email: 'budi@mail.com',
            password: 'budi123',
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
            done(err)
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
            done(err)
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
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    // wrong email
    it('it response json with invalid email or password', (done) => {
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
            expect(body).toHaveProperty('message', 'invalid email or password')
            done()
        })
        .catch(err => {
            done(err)
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
            done(err)
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
            done(err)
        })
    })
})


