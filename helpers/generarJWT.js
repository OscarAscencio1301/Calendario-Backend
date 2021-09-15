const jwt = require('jsonwebtoken')

const generarJWT = (nombre, uid) => {
    return new Promise((resolve, reject) => {
        const payload = { nombre, uid };

            jwt.sign(payload, process.env.SECRETKEY, {
                expiresIn: '3h'
            }, (error, token) => {

                if(error){
                    reject('No se pudo generar el token')
                }else{
                    resolve(token)
                }

            })

    })
}

module.exports = generarJWT;