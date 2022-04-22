const { Schema, model } = require('mongoose');

const PatientSchema = Schema({
    name: {
        type: String,
        require: [ true, 'The fullName is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    dni: {
        type: String,
        require: [ true, 'The dni is required']
    }, 
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    insurance_name: {
        type: String,
        required: [true, 'The insurance_name is required']
    }, 
    insurance_number: {
        type: String,
        required: [true, 'The insurance_number is required']
    },  
    status: {
        type: Boolean,
        default: true
    },
});

PatientSchema.methods.toJSON = function() {
    const { __v, _id, ...patient } = this.toObject();

    patient.id = _id;
    return patient;
}

module.exports = model('Patient',  PatientSchema);