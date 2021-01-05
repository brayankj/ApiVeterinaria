const { Schema, model } = require('mongoose');

const AppointmentSchema = Schema({
    veterinary: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
    pet: { required: true, type: Schema.Types.ObjectId, ref: 'Pet' },
    notes: { type: String },
    treatment: { type: String },
    day: { type: Date, default: Date.now },
    nextappointment: { type: String },
});

module.exports = model( 'Appointment', AppointmentSchema );