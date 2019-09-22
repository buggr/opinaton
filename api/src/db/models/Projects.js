const mongoose = require('mongoose')
const mongooseFindAndFilter = require('mongoose-find-and-filter')

const ProjectsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    feedback: {
        type: [mongoose.Schema.Types.Mixed]
    },
    description: {
        type: String,
        required: true
    }
})

ProjectsSchema.plugin(mongooseFindAndFilter)

module.exports = mongoose.model('Projects', ProjectsSchema)