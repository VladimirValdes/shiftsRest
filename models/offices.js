const { Schema, model } = require('mongoose');

const OfficeSchema = Schema({
    name:{
        type: String,
        require: [ true, 'The name is required']
    },
    userId: {
        type: Schema.types.objectId,
        ref: 'User'
    },
    isAvalible:{
        type: String,
        require: [ true, 'The isAvalible is required']
    },
    status: {
        type: Boolean,
        default: true
    },
  
});

OfficeSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();

    user.uid = _id;
    return user;
}

module.exports = model('User',  OfficeSchema);