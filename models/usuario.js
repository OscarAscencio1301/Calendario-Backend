const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
})

UsuarioSchema.methods.toJSON = function () {
    const {password, __v, _id, ...info} = this.toObject();
    info.uid = _id;
    return info;
}
module.exports = model('Usuario', UsuarioSchema);