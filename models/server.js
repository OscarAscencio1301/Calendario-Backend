const express = require('express')
const cors = require('cors');
const connectDB = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.connect();
        this.middkewares();
        this.routes();
    }
    async connect(){
        await connectDB();
    }

    routes(){
        this.app.use('/api/auth', require('../routes/auth.routes'))
        this.app.use('/api/eventos', require('../routes/eventos.routes'))
    }
    middkewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor instalado en: ${this.port}`)
        })
    }
}

module.exports = Server;