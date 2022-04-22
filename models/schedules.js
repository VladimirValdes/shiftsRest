const { Schema, model } = require('mongoose');

const SchudelesSchema = Schema({
    condition: {
        type: String,
        require: [ true, 'The condition is required'],
        default: 'PENDING',
        emun: ['ACTIVE', 'PENDING', 'FINISH'],
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    code: {
        type: String,
        required: [true, 'The code is required']
    }, 
    patient: {
        type:Schema.Types.ObjectId,
        ref: 'Patient',
    }, 
    status: {
        type: Boolean,
        default: true
    },
  
});

SchudelesSchema.methods.toJSON = function() {
    const { __v,  _id, ...schedule } = this.toObject();

    schedule.id = _id;
    return schedule;
}

module.exports = model('Schedule',  SchudelesSchema);