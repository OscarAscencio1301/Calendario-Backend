const {Schema, model} = require('mongoose');

const EventoSchema = Schema({
    start: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },

    end: {
        type: Date,
        required: [true, 'La fecha de fin es obligatoria']
    },

    title: {
        type: String,
        required: [true, 'El titulo es Obligatorio']
    },

    nota: {
        type: String
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

EventoSchema.methods.toJSON = function(){
    const {__v, _id, ...datos} = this.toObject();
    datos.id = _id
    return datos
}
module.exports = model('Evento', EventoSchema);