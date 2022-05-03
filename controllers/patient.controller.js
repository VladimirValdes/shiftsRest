const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Patient = require('../models/patients');


const patientGet = async( req, res = response ) => {
    const { limit = 10, from = 0 } = req.query;
    const query = { status: true };


    const [ total, patients ] = await Promise.all([
        Patient.countDocuments(query),
        Patient.find(query)
               .skip(Number(from))
               .limit(Number(limit))
               .populate('user', 'name role')
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

    const { name, email, dni, insurance_name, insurance_number } = req.body;
    const patientData = new Patient({  name, email, dni, insurance_name, insurance_number });

  
    const patient = await patientData.save();

   
    res.json(patient);
}

const patientPut = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, email, ...rest } = req.body;


    const patient = await Patient.findByIdAndUpdate( id, rest, { new: true } );

    res.json({
        patient
    })
  
}

const selectPatient = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, user } = req.body;


    const patient = await Patient.findByIdAndUpdate( id, { user }, { new: true } );

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
    selectPatient
}