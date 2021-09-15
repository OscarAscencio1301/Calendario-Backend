const moment = require('moment');
const Usuario = require('../models/usuario');
const Evento = require('../models/evento');

const validarEmail = async(correo = '') => {
    const emailExiste = await Usuario.findOne({correo})
    if(emailExiste){
        throw new Error(`El email ${correo}, ya está registrado`)
    }
}
const validarId = async(id) => {
    const idExiste = await Evento.findById(id)
    if(!idExiste){
        throw new Error(`El id ${id} no existe en la BD`)
    }
}

const esFecha = (fecha) => {
    if(!fecha){
        return false
    }
    const fechaValidar = moment(fecha)
    if(fechaValidar.isValid()){
        return true
    }else{
        return false;
    }
}

module.exports = {
    validarEmail,
    validarId,
    esFecha
}