const { response } = require('express');
const Patients = require('../models/patients');


const patientGet = async( req, res = response ) => {
    

    res.json({'hola':'mundo'});
}

patientGetById = async( req, res = response ) => {

    const { id } = req.params;

    const patient = await Patients.findById( id );

    res.json({
        user,
    })
}


const userPost = async( req, res = response ) => {

    const { name, password, email, dni, role } = req.body;
    const userData = new User({ name, dni, email, password, role });

    // password encrypt
    const salt = bcryptjs.genSaltSync();

    userData.password = bcryptjs.hashSync(password, salt);

    // saved in DB
    const user = await userData.save();

   
    res.json({
        user
    });
}

const userPut = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();

        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest, { new: true } );

    res.json({
        user
    })
  
}

const userDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const user = await User.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        user
    })

    
}

module.exports = {
    userGet,
    userGetById,
    userPost,
    userPut,
    userDelete
}