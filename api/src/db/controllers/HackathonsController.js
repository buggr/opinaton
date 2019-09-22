const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const Hackathons = require('./../models/Hackathons')
const Teams = require('./../models/Teams')

module.exports = {
    async linkTeams(req, res) {
        const team = await Teams.findOne({'_id': req.params.teamId}).select('-createdAt -__v')

        const hack = await Hackathons.findByIdAndUpdate(req.params.id, { teams: team }, { new: true })

        return res.json(hack)
    },

    async listAll(req, res) {
        const hack = await Hackathons.find()

        return res.json(hack)
    },
    
    async listSelectedTeamsByName(req, res) {

        const hack = await Hackathons.find({
            teams: {
                $elemMatch: req.query
            }
        })

        return res.json(hack)
    },

    async store(req, res) {
        const finder = await Hackathons.findOne({'name': req.body.name})

        if(!finder) {
            const hack = await Hackathons.create(req.body)
            return res.json(hack)
        }

        return res.json(finder)
    },

    async update(req, res) {
        const hack = await Hackathons.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.json(hack)
    },

    async destroy(req, res) {
        await Hackathons.findOneAndRemove(req.params.id)

        return res.send()
    }
}