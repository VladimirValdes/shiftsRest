const { response, request } = require('express');


const {
    Role,
    User,
} = require('../models/index')


const isRoleValido = async( role = '') => {

    console.log({role});
    const existRol = await Role.findOne({ role });

    if ( !existRol ) {
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




















module.exports = {
    isRoleValido,
    emailExist,
    userExitsById,
    dniExists

}
