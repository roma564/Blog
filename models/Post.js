import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required:true,
        unique: true
    },
    tags:{
        type: Array,
        default: []
    },
    viewsCount:{
        type: Number,
        default: 0
    },
    imageURL: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    
}, {
    timestamps: true
})

export default mongoose.model('Post', PostSchema)









// const mongoose = require('mongoose');
// module.exports = mongoose.model('User', UserSchema);