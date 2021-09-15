const Usuario = require('../models/usuario');
const bcryptjs = require('bcrypt');
const generarJWT = require('../helpers/generarJWT');
const validarJWT = require('../middlewares/validarJWT');

const crearUsuario = async (req, resp) => {
    const { nombre, correo, password } = req.body
    const usuario = new Usuario({ nombre, correo, password })

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    
    const token = await generarJWT(usuario.nombre, usuario._id)

    resp.status(201).json({
        msg: 'registro',
        usuario, 
        token
    })
}

const loginUsuario = async (req, resp) => {
    try {
        const {correo, password} = req.body
        const usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            return resp.status(400).json({
                msg: 'No se ha registrado el Usuario'
            })
        }

        const validarPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validarPassword){
            return resp.status(400).json({
                msg: 'Password incorrecto'
            })
        }

        const token = await generarJWT(usuario.uid, usuario.nombre)

        resp.json({
            msg: 'Login Pasado',
            usuario,
            token

        })

    } catch (error) {
        resp.status(500).json({
            msg: 'Error del Servidor'
        })
    }
}


const revalidarToken = async (req, resp) => {
    const {uid, nombre} = req
    const token = await generarJWT(nombre, uid);
    resp.json({
        msg: 'revalidar',
        uid,
        nombre,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}