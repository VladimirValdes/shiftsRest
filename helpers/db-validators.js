const { response, request } = require('express');



const {
    User,
    Patient
} = require('../models/index');
const roles = require('../models/roles');


const isRoleValido = async( role = '') => {
    const roles = [ 'ADMIN_ROLE', 'DOCTOR_ROLE', 'MANAGER_ROLE'];


    
    if ( !roles.includes(role) ) {
        throw new Error(` This Rol  ${ role } doesn't exist in the DB`);
    }
}


const emailExist = async( email = '' ) => {
    
    const existEmail = await User.findOne({ email });

    if ( existEmail ) {
        
      throw new Error(`Email ${ existEmail.email } has already been register in DB`);
    }
}


const userExitsById = async( id ) => {

    const idExist = await User.findById(id);

    if ( !idExist ) {
        throw new Error(`Id ${ id } doesn't exist`)
    }
}

const dniExists = async( dni ) => {

    const dniExist = await User.findOne({ dni });

    if ( dniExist ) {
        throw new Error(`DNI ${ dni } already exist`)
    }
}

const dniPatientExists = async( dni ) => {

    const dniExist = await Patient.findOne({ dni });

    if ( dniExist ) {
        throw new Error(`DNI ${ dni } already exist`)
    }
}


const emailPatientExist = async( email = '' ) => {
    
    const existEmail = await Patient.findOne({ email });

    if ( existEmail ) {
        
      throw new Error(`Email ${ existEmail.email } has already been register`);
    }
}



module.exports = {
    isRoleValido,
    emailExist,
    userExitsById,
    dniExists,
    dniPatientExists,
    emailPatientExist
}
