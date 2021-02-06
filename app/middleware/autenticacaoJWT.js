const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Usuario = db.Usuario;

verificarToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message : "O token de acesso não foi encontrado"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Acesso não autorizado"
            });
        }
        
        res.usuarioId = decoded.id;
        next();
    });
};

verificarAdministrador = (req, res, next) => {
    Usuario.findByPk(req.usuarioId).then( usuario => {
        usuario.getPerfis().then( perfis => {
            for (let i = 0; i < perfis.length; i++) {
                if (perfis[i] === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Acesso negado. Perfil de Administrador exigido."
            });
        });
    });
};


verificarModerador = (req, res, next) => {
    Usuario.findByPk(req.usuarioId).then( usuario => {
        usuario.getPerfis().then( perfis => {
            for (let i = 0; i < perfis.length; i++) {
                if (perfis[i] === "moderador") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Acesso negado. Perfil de Moderador exigido."
            });
        });
    });
};


verificarAdministradorOuModerador = (req, res, next) => {
    Usuario.findByPk(req.usuarioId).then( usuario => {
        usuario.getPerfis().then( perfis => {
            for (let i = 0; i < perfis.length; i++) {
                if (perfis[i] === "moderador") {
                    next();
                    return;
                }

                if (perfis[i] === "administrador") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Acesso negado. Perfil de Moderador exigido."
            });
        });
    });
};

const autenticacaoJWT = {
    verificarToken : verificarToken,
    verificarAdministrador : verificarAdministrador,
    verificarModerador : verificarModerador,
    verificarAdministradorOuModerador : verificarAdministradorOuModerador
}

module.exports = autenticacaoJWT;