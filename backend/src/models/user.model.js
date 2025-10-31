import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config/server.config';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    fullName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    } ,
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false 
    },
    refreshToken: {
        type: String, 
        default: null
    }
}, {
    timestamps: true
});



UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});



UserSchema.methods.isPasswordCorrect = async function(password) {
   
    const userWithPassword = await this.constructor.findOne({ _id: this._id }).select('+password');
    if (!userWithPassword) return false;
    return await bcrypt.compare(password, userWithPassword.password);
};


UserSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        { _id: this._id, email: this.email },
        config.auth.ACCESS_TOKEN_SECRET,
        { expiresIn: config.auth.ACCESS_TOKEN_EXPIRY } // Short-lived
    );
};


UserSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        { _id: this._id },
        config.auth.REFRESH_TOKEN_SECRET,
        { expiresIn: config.auth.REFRESH_TOKEN_EXPIRY }
    );
};

const User = mongoose.model('User', UserSchema);
export default User;