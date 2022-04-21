const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Office = require('../models/offices');


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

    const { name } = req.body;
    const officeData = new Office({ name });

   

    // saved in DB
    const office = await officeData.save();

   
    res.json({
        office
    });
}

const officePut = async( req, res = response ) => {

    const { id } = req.params;
    const { name, isAvalible = true } = req.body;

 
    const office = await Office.findByIdAndUpdate( id, { name, isAvalible }, { new: true } );

    res.json({
        office
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