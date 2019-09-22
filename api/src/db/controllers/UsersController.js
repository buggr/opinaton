const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const Users = require('./../models/Users')

module.exports = {
    async listAll(req, res) {
        const user = await Users.find()

        return res.json(user)
    },

    async listSelected(req, res) {
        const user = await Users.findAndFilter(req.query)

        return res.json(user)
    },

    async store(req, res) {
        const finder = await Users.findOne({email: req.body.email})

        if(!finder) {
            const nick = req.body.email.match(/(\w*)(?=@)/g)
            const user = await Users.create({
                nickname: nick,
                ...req.body
            })
            return res.json(user)
        }

        return res.json(finder)
    },

    async update(req, res) {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.json(user)
    },

    async destroy(req, res) {
        await Users.findOneAndRemove(req.params.id)

        return res.send()
    }
}