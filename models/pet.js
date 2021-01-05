const { Schema, model } = require('mongoose');

const PetSchema = Schema({
    name: { type: String, required: true },
    years: { type: Number, required: true },
    typePet: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    owner: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
});

PetSchema.method('toJSON', function (){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Pet', PetSchema );