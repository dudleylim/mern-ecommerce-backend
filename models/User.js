const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    wishlist: [
        {
            productId: {
                type: String
            }
        }
    ],
    isAdmin: {
        type: Boolean
    }
}, { timestamps: true })

userSchema.statics.loginUser = async function(email, password) {
    // validate fields
    if (!email || !password) {
        throw Error('Missing field(s)');
    }

    // retrieve email
    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Email does not exist');
    }

    // compare password with hash
    const match = await bcrypt.compare(password, user.password);

    // return email (jwt logic will be in controller)
    if (match) {
        return user
    } else {
        throw Error('Invalid credentials');
    }
}

userSchema.statics.signupUser = async function(email, password) {
    // validate fields
    if (!email || !password) {
        throw Error('Missing field(s)');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email not valid');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    // see existing email
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('User already exists');
    }

    // create salt and hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create user
    try {
        const user = await this.create({
            email,
            password: hash,
            wishlist: [],
            isAdmin: false
        });

        return user;
    } catch (error) {
        throw Error("User signup failed");
    }
}

module.exports = mongoose.model('User', userSchema);