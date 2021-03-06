const { Schema, model } = require('mongoose');

const AppointmentSchema = Schema({
    veterinary: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
    pet: { required: true, type: Schema.Types.ObjectId, ref: 'Pet' },
    owner: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String },
    treatment: { type: String },
    price: { type: Number, required: true },
    day: { type: String },
    nextappointment: { type: String },
    PaidOut: {  type: Boolean, default: false },
});

AppointmentSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'Appointment', AppointmentSchema );