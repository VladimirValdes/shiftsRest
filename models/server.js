
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;


        // Paths
        this.userPath = '/api/users';
        this.authPath = '/api/auth';
      



        // DB connection
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // routes
        this.routes();

    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Parse JSON
        this.app.use(express.json());

        // Public Folder
        this.app.use( express.static('public'));


      

    }

    async dbConnection() {
        await dbConnection();
    }

    routes() {

        this.app.use( this.userPath, require('../routes/user.route'));
        this.app.use( this.authPath, require('../routes/auth.route'));
        

    }
    
    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server runs on port ${ this.port }`);
        })
    }
}

module.exports = Server;