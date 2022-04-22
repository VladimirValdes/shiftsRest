const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Schedule = require('../models/schedules');


const scheduleGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, schedules ] = await Promise.all([
        Schedule.countDocuments(query),
        Schedule.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        schedules
    });
}

scheduleGetById = async( req, res = response ) => {

    const { id } = req.params;

    const schedule = await Schedule.findById( id );

    res.json({
        schedule,
    })
}


const schedulePost = async( req, res = response ) => {

    const { user, patient } = req.body;
    const scheduleData = new Schedule({ user, patient });

 
    const schedule = await scheduleData.save();

   
    res.json({
        schedule
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
    scheduleGet,
    userGetById,
    userPost,
    userPut,
    userDelete,
    userRoles
}