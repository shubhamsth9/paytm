const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/';
mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    } 
});

const user = mongoose.model('User', userSchema);

module.exports = ({
    User
})