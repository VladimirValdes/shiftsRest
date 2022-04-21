const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/users');
const { generateJWT } = require('../helpers/generateJwt');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        // Check if email exists
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password are not correct'
            });
        }

        // If user is not active
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'User / Password  are not correct'
            })
        }

        // Check password

        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password are not correct'
            });
        } 

        // Generar  el JWT
        const token = await generateJWT( user.id );


        res.json({
            user,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    }

    
}

const renewToken = async( req, res = response ) => {

    const uid = req.user._id;

     // generate Token
     const token = await generateJWT( uid );


     // Get User
    const user = await User.findById(uid);

     res.json({
         user,
         token,
        
     })
}

module.exports = {
    login,
    renewToken,
}