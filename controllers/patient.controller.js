const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Patient = require('../models/patients');


const patientGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, patients ] = await Promise.all([
        Patient.countDocuments(query),
        Patient.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        patients
    });
}

const patientRoles = async( req, res = response ) => {
    const { role } = req.params;
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true, role };


    const [ total, patients ] = await Promise.all([
        Patient.countDocuments(query),
        Patient.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        patients
    });
}

const patientGetById = async( req, res = response ) => {

    const { id } = req.params;

    const patient = await Patient.findById( id );

    res.json({
        patient,
    })
}


const patientPost = async( req, res = response ) => {

    const { name, password, email, dni, role } = req.body;
    const patientData = new Patient({ name, dni, email, password, role });

    // password encrypt
    const salt = bcryptjs.genSaltSync();

    patientData.password = bcryptjs.hashSync(password, salt);

    // saved in DB
    const patient = await patientData.save();

   
    res.json({
        patient
    });
}

const patientPut = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();

        rest.password = bcryptjs.hashSync(password, salt);
    }

    const patient = await Patient.findByIdAndUpdate( id, rest, { new: true } );

    res.json({
        patient
    })
  
}

const patientDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const patient = await Patient.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        patient
    })

    
}

module.exports = {
    patientGet,
    patientGetById,
    patientPost,
    patientPut,
    patientDelete,
    patientRoles
}