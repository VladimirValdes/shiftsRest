const { response, request } = require('express');
const  jwt  = require('jsonwebtoken');

const User = require('../models/users');


const validateJWT = async( req = request, res = response, next ) => {

    // get params from headers
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'There is not toke on the request'
        });
    }

    try {

        // Check if a valid token
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById( uid );

        // check if user is null o undefined

        if ( !user ) {
            return res.status(401).json({
                msg: 'Token no valido'
            })
        }

        // check if status is true

        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Token no valido'
            })
        }

        req.user = user;



        next();


        
    } catch (error) {
        console.log(error);

        if ( error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                msg: 'Token has expired'
            })
        } 

        res.status(401).json({
            msg: 'Token no valido'   
        });
    }

}

module.exports = {
    validateJWT,
}