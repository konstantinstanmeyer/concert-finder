import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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