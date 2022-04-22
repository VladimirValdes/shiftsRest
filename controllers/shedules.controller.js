const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Schedule = require('../models/schedules');
const generateId = require('../helpers/generateCode');


const scheduleGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, schedules ] = await Promise.all([
        Schedule.countDocuments(query),
        Schedule.find(query)
               .skip(Number(from))
               .limit(Number(limit))
               .populate('user', 'name role')
               .populate('patient', 'name')
    ]);


    res.json({
        total,
        schedules
    });
}

const scheduleGetById = async( req, res = response ) => {

    const { id } = req.params;

    const schedule = await Schedule.findById( id );

    res.json({
        schedule,
    })
}


const schedulePost = async( req, res = response ) => {

    const { user, patient } = req.body;
    const code = generateId().slice(10, -4);
    const scheduleData = new Schedule({ user, patient, code });

 
    const schedule = await scheduleData.save();

   
    res.json({
        schedule
    });
}

const schedulePut = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, user, patient, condition } = req.body;

    const schedule = await Schedule.findByIdAndUpdate( id, { user, patient, condition }, { new: true } );

    res.json({
        schedule
    })
  
}

const scheduleDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const schedule = await Schedule.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        schedule
    })

    
}

module.exports = {
    scheduleGet,
    scheduleGetById,
    schedulePost,
    schedulePut,
    scheduleDelete
}