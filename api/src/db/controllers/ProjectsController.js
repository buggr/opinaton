const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const Project = require('./../models/Projects')
const Teams = require('./../models/Teams')

module.exports = {
    async listAll(req, res) {
        const proj = await Project.find()

        return res.json(proj)
    },

    async listOne(req, res) {
        const proj = await Project.findOne({'_id': req.params.id})

        return res.json(proj)
    },

    async store(req, res) {
        const proj = await Project.create(req.body)

        return res.json(proj)
    },

    async updateFeeds(req, res) {
        const proj = await Project.findById(req.params.id)
        proj.feedback.push(req.body.feedback)
        proj.save()

        return res.json(proj)
    },

    async update(req, res) {
        console.log(req.body)
        const proj = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.json(proj)
    },

    async destroy(req, res) {
        await Project.findOneAndRemove(req.params.id)

        return res.send()
    }
}