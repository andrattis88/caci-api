const { verifySignUp } = require("../middleware");
const controller = require("../controllers/autenticacao.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        
        next();
    });

    app.post(
        "/api/autenticacao/signup",
        [
            verifySignUp.verificarUsuarioOuEmailDuplicado,
            verifySignUp.verificarPerfisExistem
        ],
        controller.signup
    );

    app.post(
        "/api/autenticacao/login",
        controller.login
    );
}

