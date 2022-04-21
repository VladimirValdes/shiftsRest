const { Schema, model } = require('mongoose');

const SchudelesSchema = Schema({
    condition: {
        type: String,
        require: [ true, 'The condition is required']
    }, 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    code: {
        type: String,
        required: [true, 'The code is required']
    }, 
    patientId: {
        type: Schema.types.objectId,
        ref: 'User',
    }, 
    status: {
        type: Boolean,
        default: true
    },
  
});

SchudelesSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();

    user.uid = _id;
    return user;
}

module.exports = model('User',  SchudelesSchema);