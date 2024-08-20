const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    password_hash: {
        type: String,
        required: true
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

userSchema.methods.createHash = async (plainPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
}

userSchema.methods.validatePassword = async (candidatePassword) => {
    return await bcrypt.compare(candidatePassword, this.password_hash);
}

const User = mongoose.model('User', userSchema);

module.exports = ({
    User
})