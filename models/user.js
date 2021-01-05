const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    names: { type: String, required: true },
    lastnames: { type: String, required: true },
    years: { type: Number, required: true },
    image: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true ,default: 'USER_ROLE' },
    active: { type: Boolean, default: false },
    google: { type: Boolean, default: false },
});

UserSchema.method( 'toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'User', UserSchema );