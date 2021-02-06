const { autenticacaoJWT } = require("../middleware/");
const controller = require("../controllers/usuario.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.get("/api/test/publico", controller.AcessoPublico);

    app.get(
        "/api/test/usuario", 
        [autenticacaoJWT.verificarToken],
        controller.AcessoUsuario
    );

    app.get(
        "/api/test/moderador", 
        [autenticacaoJWT.verificarToken],
        controller.AcessoUsuario
    );

    app.get(
        "/api/test/moderador", 
        [
            autenticacaoJWT.verificarToken,
            autenticacaoJWT.verificarModerador
        ],
        controller.AcessoModerador
    );

    app.get(
        "/api/test/administrador", 
        [
            autenticacaoJWT.verificarToken,
            autenticacaoJWT.verificarAdministrador
        ],
        controller.AcessoAdministrador
    );


};