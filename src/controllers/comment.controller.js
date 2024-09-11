import { CommentModel } from "../models/commentModel.js";

export const commentId = async (req, res) => {
    try {
        const {id} = req.params
        const commtId = await CommentModel.commtId(id)
        if(commtId.length === 0) return res.status(400).json({message: 'No exite este comentario'})
        res.status(200).json(commtId);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const commentfromInc = async (req, res) => {
    try {
        const {idInc} = req.params
        const commtFu = await CommentModel.commtFrInc(idInc)
        if(commtFu.length === 0) return res.status(400).json({message: 'No se registran comentarios en este incidente'})
        res.status(200).json(commtFu);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const commentstAll = async (req, res) => {
    try {
        const commt = await CommentModel.commtAll()
        if(commt.length === 0) return res.status(400).json({message: 'No hay comentarios registrados'})
        res.status(200).json(commt);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}