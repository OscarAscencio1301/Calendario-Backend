const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, resp = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token no Existe'
        })
    }


    try {
        const payload = jwt.verify(token, process.env.SECRETKEY);
        req.uid = payload.uid;
        req.nombre = payload.nombre;

        next();
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token no Valido'
        })
    }
}

module.exports = validarJWT;