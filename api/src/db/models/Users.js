const mongoose = require('mongoose')
const mongooseFindAndFilter = require('mongoose-find-and-filter')

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: (v) => {
              return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                    .test(v)
            },
            message: props => `${props.value} is not a valid e-mail!`
        },
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        unique: true
    },
    avatar_url: {
        type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
})

UsersSchema.plugin(mongooseFindAndFilter)

module.exports = mongoose.model('User', UsersSchema)