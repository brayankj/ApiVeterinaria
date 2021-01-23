const { Schema, model } = require('mongoose');

const Comment = Schema({
    email: { type: String, required: true },
    comment: { type: String, required: true },
});

Comment.method('toJSON', function (){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Comment', Comment );