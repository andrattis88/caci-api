const db = require("../models/");
const PERFIS = db.PERFIS;
const Usuario = db.usuario;

verificarUsuarioOuEmailDuplicado = (req, res, next) => {
    // usuario
    Usuario.findOne({
        where: { 
            usuario : req.body.usuario
        }
    }).then((usuario) => {
        if (usuario) {
            res.status(400).send({
                message: "Este nome de usuario já se encontra em uso."
            });

            return;
        }    

        // email
        Usuario.findOne({
            where: {
               email : req.body.email 
            }
        }).then((usuario) => {
            if(usuario) {
                res.status(400).send({
                    message: "Este email já se encontra em uso."
                });
    
                return;
            }        

            next();
        }); 
    });  
};

verificarPerfisExistem = (req, res, next) => {
    if (req.body.perfis) {
        for (let i = 0; i < req.body.perfis.length; i++) {
            if (!PERFIS.includes(req.body.perfis[i])) {
                res.status(400).send({
                    message: 'O perfil "' + req.body.perfis[i] + '" não existe.' 
                });

                return;
            }
        }
    }

    next();
}

const verifySignUp = {
    verificarUsuarioOuEmailDuplicado : verificarUsuarioOuEmailDuplicado,
    verificarPerfisExistem : verificarPerfisExistem
}

module.exports = verifySignUp;