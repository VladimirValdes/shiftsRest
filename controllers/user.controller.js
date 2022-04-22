const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/users');


const userGet = async( req, res = response ) => {
    const { limit = 10, from = 0 } = req.query;
    const query = { status: true };


    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        users
    });
}

const userRoles = async( req, res = response ) => {
    const { role } = req.params;
    const { limit = 10, from = 0 } = req.query;
    const query = { status: true, role };


    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
               .skip(Number(from))
               .limit(Number(limit))
    ]);


    res.json({
        total,
        users
    });
}

userGetById = async( req, res = response ) => {

    const { id } = req.params;

    const user = await User.findById( id );

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
    userDelete,
    userRoles
}