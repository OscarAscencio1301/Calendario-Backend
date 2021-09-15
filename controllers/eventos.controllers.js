const { request, response } = require("express");
const Evento = require('../models/evento');

const crearEvento = async (req = request, res = response) => {
    try {
        const { start, end, title, nota } = req.body
        const evento = new Evento({ start, end, title, nota })

        evento.usuario = req.uid;

        await evento.save()

        res.status(200).json({
            ok: true,
            msg: 'Crear Evento',
            evento
        })
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })

    }
}




const editarEvento = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const uid = req.uid;
        const evento = await Evento.findById(id)

        if (evento.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de Editar ese evento'
            })
        }

        const eventoActualizado = {
            ...req.body,
            usuario: uid
        }

        const eventoNuevo = await Evento.findByIdAndUpdate(id, eventoActualizado, { new: true })

        res.status(200).json({
            ok: true,
            msg: 'Ediart Evento',
            eventoNuevo
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
}

const borrarEvento = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const uid = req.uid;
        const evento = await Evento.findById(id)

        if (evento.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de Editar ese evento'
            })
        }

        const eventoBorrado = await Evento.findOneAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Borrar Evento',
            eventoBorrado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
}

const mostrarEvento = async (req = request, res = response) => {
    try {
        const eventos = await Evento.find().populate('usuario', 'nombre');
        res.status(200).json({
            ok: true,
            msg: 'Mostrar Eventos',
            eventos
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
}

module.exports = {
    mostrarEvento,
    crearEvento,
    editarEvento,
    borrarEvento
}