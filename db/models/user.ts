import mongoose from 'mongoose'

const Schema = mongoose.Schema;

// basic use model, keeps track of login information and saved concerts within the same document
const userSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    name: {
        required: true,
        type: String
    },
    concerts: [
        {
            name: { 
                type: String, 
                required: true 
            },
            venue: { 
                type: String, 
                required: true 
            },
            artists: { 
                type: String, 
                required: true
            },
            imageUrl: {
                type: String
            }
        }
    ]
})

const User = mongoose.model('User', userSchema)

export default User;