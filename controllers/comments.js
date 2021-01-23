const Comment = require('../models/comments');

const createComment = async( req, res ) => { 
    try {
        const comment = new Comment( req.body );
        await comment.save();
        res.status(200).json( { ok: true, comment } );
    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Comentarios' 
        });
    }
}

const getComments = async( req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json( { ok: true, comments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Pets' 
        });
    }
}

const deleteComment = async( req, res ) => {
    const idComment = req.params.id;
    try {
        const comment = await Comment.findById( idComment );
        if ( !comment ) {
            return res.status(404).json({
                ok: false,
                msg: 'El comentario que tratas de eliminar no existe',
            });
        }
        await Comment.findByIdAndDelete( idComment );
        res.status(200).json({
            ok: true,
            msg: 'Comentario Eliminado!',
        });
    } catch (error) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el Servidor consulta al Administrador *Comentarios' 
        });
    }
}

module.exports = { 
    createComment,
    getComments,
    deleteComment, 
}