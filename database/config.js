const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log('Base de datos Conectada')
    
    } catch(error){
        console.log('Error al Conectar')
    }
}

module.exports = connectDB;