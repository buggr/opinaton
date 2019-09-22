const assert = require('assert')
const { UsersModel, HackathonsModel, ProjectsModel, TeamsModel, user_db, hack_db, proj_db, team_db } = require('../../server')

const mongoose = require('mongoose')

const chai = require('chai')
const chaiHttp = require('chai-http')

const MOCK_USER_DEFAULT = {
    email: 'user1@email.com',
    password: 'senha1'
}

const MOCK_USER_CADASTRO = {
    email: 'user2@email.com',
    password: 'senha2'
}

let MOCK_USER_ID = ""

const MOCK_HACK_DEFAULT = {
    name: 'Primeiro Hackathon',
    ended: true
}

const MOCK_HACK_CADASTRO = {
    name: 'Open Hack',
    ended: false
}

let MOCK_HACK_ID = ""

const MOCK_PROJ_DEFAULT = {
    name: 'Projeto 1',
    feedback: [{
        score: '8',
        notes: 'Nothing to add'
    }]
}

const MOCK_PROJ_CADASTRO = {
    name: 'Projeto 2',
    feedback: [{
        score: '3',
        notes: 'Really bad'
    }]
}

let MOCK_PROJ_ID = ""

const MOCK_TEAM_DEFAULT = {
    name: 'Time 1'
}

const MOCK_TEAM_CADASTRO = {
    name: 'Team 2'
}

let MOCK_TEAM_ID = ""

chai.use(chaiHttp)
chai.should()
chai.use(require('chai-things'))
let expect = chai.expect

describe('API test enviroment / before all: ', function () {
    this.timeout(Infinity)
    this.beforeAll(done => {
        UsersModel.deleteMany({}, function (err) {})
        HackathonsModel.deleteMany({}, function (err) {})
        ProjectsModel.deleteMany({}, function (err) {})
        TeamsModel.deleteMany({}, function (err) {})

        const res = chai.request(app || process.env.URL_API)
            .post('/users')
            .send(MOCK_USER_DEFAULT)
            .then(result => {
                MOCK_USER_ID = result.body._id
            })

        const res2 = chai.request(app || process.env.URL_API)
            .post('/hackathons')
            .send(MOCK_HACK_DEFAULT)
            .then(result => {
                body = result.body
                MOCK_HACK_ID = body._id
            })

        const res3 = chai.request(app || process.env.URL_API)
            .post('/projects')
            .send(MOCK_PROJ_DEFAULT)
            .then(result => {
                MOCK_PROJ_ID = result.body._id
            })
        
        const res4 = chai.request(app || process.env.URL_API)
            .post('/teams')
            .send(MOCK_TEAM_DEFAULT)
            .then(result => {
                MOCK_TEAM_ID = result.body._id
                done()
            })
    })

    describe('Users database Test environment: ', function() {
        it('verificar conexao', async () => {
            const result = await user_db.isConnected()
    
            expect('Conectado').to.deep.equal(result)
        })
    
        it('cadastro', done => {
            chai.request(app || process.env.URL_API)
                .post('/users')
                .send(MOCK_USER_CADASTRO)
                .then(res => {
                    MOCK_USER_ID = res.body._id
                    res.should.have.status(200)
                    done()
                })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('listar todos os usuarios', done => {
            chai.request(app || process.env.URL_API)
                .get('/users')
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.all.have.property('_id')
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('atualizar um usuario', done => {
            const _id = MOCK_USER_ID
            const expected = {
                password: "senha123"
            }
    
            chai.request(app || process.env.URL_API)
                .put(`/users/${_id}`)
                .send(expected)
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.have.property('password', 'senha123')
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('deletar um usuario', done => {
            const _id = MOCK_USER_ID
            chai.request(app || process.env.URL_API)
                .delete(`/users/${_id}`)
                .then(res => {
                    res.should.have.status(200)
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    })
    
    describe('Hackathons database Test environment: ', function() {
        it('verificar conexao', async () => {
            const result = await hack_db.isConnected()
    
            expect('Conectado').to.deep.equal(result)
        })
    
        it('cadastro', done => {
            chai.request(app || process.env.URL_API)
                .post('/hackathons')
                .send(MOCK_HACK_CADASTRO)
                .then(res => {
                    MOCK_HACK_ID = res.body._id
                    res.should.have.status(200)
                    done()
                })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('listar todos os hackathons', done => {
            chai.request(app || process.env.URL_API)
                .get('/hackathons')
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.all.have.property('_id')
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('atualizar um hackathon', done => {
            const _id = MOCK_HACK_ID
            const expected = {
                name: "Primeiro Hackathon do Mundo"
            }
    
            chai.request(app || process.env.URL_API)
                .put(`/hackathons/${_id}`)
                .send(expected)
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.have.property('name', 'Primeiro Hackathon do Mundo')
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })

        it('definir um time no hackathon', done => {
            const _id = MOCK_HACK_ID
            const team_id = MOCK_TEAM_ID

            chai.request(app || process.env.URL_API)
                .put(`/hackathons/${_id}/team/${team_id}`)
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.have.nested.property('teams[0].participants')
                    done()
                })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('deletar um hackathon', done => {
            const _id = MOCK_HACK_ID
            chai.request(app || process.env.URL_API)
                .delete(`/hackathons/${_id}`)
                .then(res => {
                    res.should.have.status(200)
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    })
    
    describe('Projects database Test environment: ', function() {
        it('verificar conexao', async () => {
            const result = await proj_db.isConnected()
    
            expect('Conectado').to.deep.equal(result)
        })
    
        it('cadastro', done => {
            chai.request(app || process.env.URL_API)
                .post('/projects')
                .send(MOCK_PROJ_CADASTRO)
                .then(res => {
                    MOCK_PROJ_ID = res.body._id
                    res.should.have.status(200)
                    done()
                })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('listar todos os projetos', done => {
            chai.request(app || process.env.URL_API)
                .get('/projects')
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.all.have.property('_id')
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('atualizar um projeto', done => {
            const _id = MOCK_PROJ_ID
            const expected = {
                name: "Primeiro Projeto"
            }
    
            chai.request(app || process.env.URL_API)
                .put(`/projects/${_id}`)
                .send(expected)
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.have.property('name', 'Primeiro Projeto')
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('definir um time dentro de um projeto', done => {
            const _id = MOCK_PROJ_ID
            const team_id = MOCK_TEAM_ID
            chai.request(app || process.env.URL_API)
                .put(`/projects/${_id}/team/${team_id}`)
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.have.nested.property('ref_team.participants')
                    done()
                })
                .catch(err => {
                    console.log('Erro no request')
                    done(err)
                })
        })
    
        it('deletar um projeto', done => {
            const _id = MOCK_PROJ_ID
            chai.request(app || process.env.URL_API)
                .delete(`/projects/${_id}`)
                .then(res => {
                    res.should.have.status(200)
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    })
    
    describe('Teams database Test environment: ', function() {
        it('verificar conexao', async () => {
            const result = await team_db.isConnected()
    
            expect('Conectado').to.deep.equal(result)
        })
    
        it('cadastro', done => {
            chai.request(app || process.env.URL_API)
                .post('/teams')
                .send(MOCK_TEAM_CADASTRO)
                .then(res => {
                    MOCK_TEAM_ID = res.body._id
                    res.should.have.status(200)
                    done()
                })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('listar todos os times', done => {
            chai.request(app || process.env.URL_API)
                .get('/teams')
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.all.have.property('_id')
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('atualizar um time', done => {
            const _id = MOCK_TEAM_ID
            const expected = {
                name: "Primeiro Time"
            }
    
            chai.request(app || process.env.URL_API)
                .put(`/teams/${_id}`)
                .send(expected)
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.have.property('name', 'Primeiro Time')
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('definir os participantes do time', done => {
            const _id = MOCK_TEAM_ID
            const user_id = MOCK_USER_ID
    
            chai.request(app || process.env.URL_API)
                .put(`/teams/${_id}/user/${user_id}`)
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.have.nested.property('participants[0].email')
                    done()
                })
                .catch(err => {
                    console.log('Erro no request')
                    done(err)
                })
        })
    
        it('definir os projetos do time', done => {
            const _id = MOCK_TEAM_ID
            const proj_id = MOCK_PROJ_ID
    
            chai.request(app || process.env.URL_API)
                .put(`/teams/${_id}/project/${proj_id}`)
                .then(res => {
                    res.should.have.status(200)
                    res.body.should.have.nested.property('projects[0].feedback')
                    done()
                })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    
        it('deletar um time', done => {
            const _id = MOCK_TEAM_ID
            chai.request(app || process.env.URL_API)
                .delete(`/teams/${_id}`)
                .then(res => {
                    res.should.have.status(200)
                    done()
                 })
                .catch(err => {
                    console.log("Erro no request")
                    done(err)
                })
        })
    })
})

