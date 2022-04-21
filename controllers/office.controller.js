const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Office = require('../models/users');


const officeGet = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };


    const [ total, offices ] = await Promise.all([
        Office.countDocuments(query),
        Office.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        offices
    });
}


officeGetById = async( req, res = response ) => {

    const { id } = req.params;

    const office = await Office.findById( id );

    res.json({
        office,
    })
}


const officePost = async( req, res = response ) => {

    const { name, password, email, dni, role } = req.body;
    const userData = new User({ name, dni, email, password, role });

   

    // saved in DB
    const user = await userData.save();

   
    res.json({
        user
    });
}

const officePut = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

 
    const user = await User.findByIdAndUpdate( id, rest, { new: true } );

    res.json({
        user
    })
  
}

const officeDelete = async( req, res = response ) => {

    const {  id } = req.params;

    
    const user = await User.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        user
    })

    
}

module.exports = {
    officeGet,
    officeGetById,
    officePost,
    officePut,
    officeDelete,
}