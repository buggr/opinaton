const mongoose = require('mongoose')
const mongooseFindAndFilter = require('mongoose-find-and-filter')

const TeamsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    participants: {
        type: [{
            type: mongoose.Schema.Types.Mixed
        }],
        validate: [arrayLimit, '{PATH} must be a maximum of 5']
    },
    projects: {
        type: [{
            type: mongoose.Schema.Types.Mixed
        }]
    }
})

TeamsSchema.plugin(mongooseFindAndFilter)

function arrayLimit(val) {
    return val.length <= 5
}

module.exports = mongoose.model('Teams', TeamsSchema)