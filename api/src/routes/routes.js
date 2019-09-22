const express = require('express')
const routes = express.Router()

const UsersController = require('./../db/controllers/UsersController')
const HackathonsController = require('./../db/controllers/HackathonsController')
const ProjectsController = require('./../db/controllers/ProjectsController')
const TeamsController = require('./../db/controllers/TeamsController')

routes.get('/users', UsersController.listAll)
routes.get('/user', UsersController.listSelected)
routes.post('/users', UsersController.store)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.destroy)

routes.get('/hackathons', HackathonsController.listAll)
routes.get('/hackathon', HackathonsController.listSelectedTeamsByName)
routes.post('/hackathons', HackathonsController.store)
routes.put('/hackathons/:id/team/:teamId', HackathonsController.linkTeams)
routes.put('/hackathons/:id', HackathonsController.update)
routes.delete('/hackathons/:id', HackathonsController.destroy)

routes.get('/projects', ProjectsController.listAll)
routes.get('/project/:id', ProjectsController.listOne)
routes.post('/projects', ProjectsController.store)
routes.post('/projects/:id', ProjectsController.updateFeeds)
routes.put('/projects/:id', ProjectsController.update)
routes.delete('/projects/:id', ProjectsController.destroy)

routes.get('/teams', TeamsController.listAll)
routes.get('/team', TeamsController.listOne)
routes.post('/teams', TeamsController.store)
routes.put('/teams/:id/user/:userId', TeamsController.linkParticipant)
routes.put('/teams/:id/project/:projId', TeamsController.linkProject)
routes.put('/teams/:id', TeamsController.update)
routes.delete('/teams/:id', TeamsController.destroy)

module.exports = routes