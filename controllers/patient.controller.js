const { response } = require('express');
const Patients = require('../models/patients');
const Users = require('../models/users')
const utils = require('../helpers/db-validators')
let ObjectId = require('mongoose').Types.ObjectId;


const patientGet = async(req, res) => {
    
    let result = await Patients.where({status:true})
    
    res.json(result);
}

patientGetById = async( req, res ) => {

    const { id } = req.params;

    const patient = await Patients.findById( id );

    res.status(200).json({
        patient
    })
}


const patientPost = async( req, res ) => {

    const { fullname, dni, email, insurance_name, insurance_number } = req.body;
    
    
    const user_id = await Users.where({status:true, email:email});
    const result = await new Patients({ userId:user_id[0]._id, fullname, dni, email, insurance_name, insurance_number });
    
    // saved in DB
    const dataSaved = await result.save();

    res.status(200).json({
        msg:'Data Saved...'
    });
}

/*const userPut = async( req, res) => {

    const { _id, password, email, ...rest } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();

        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest, { new: true } );

    res.json({
        user
    })
  
}*/

const patientDelete = async( req, res) => {

    const {  id } = req.params;

    
    const result = await Patients.findByIdAndUpdate( id, { status: false }, { new: true });

    res.status(200).json({msg:'Data Delete...'})

    
}

module.exports = {
    patientGet,
    patientPost,
    patientGetById,
    patientDelete
}