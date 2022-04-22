const { Schema, model } = require('mongoose');

const OfficeSchema = Schema({
    name:{
        type: String,
        require: [ true, 'The name is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isAvalible:{
        type: Boolean,
        require: [ true, 'The isAvalible is required'],
        default: true
    },
    status: {
        type: Boolean,
        default: true
    },
  
});

OfficeSchema.methods.toJSON = function() {
    const { __v, _id, ...office } = this.toObject();

    office.id = _id;
    return office;
}

module.exports = model('Office',  OfficeSchema);