const db = require("../models/");
const config = require("../config/auth.config.js");
const Usuario = db.usuario;
const Perfil = db.perfil;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { usuario } = require("../models/");

exports.signup = (req, res) => {
     Usuario.create({
      usuario: req.body.usuario,
      email: req.body.email,
      senha: bcrypt.hashSync(req.body.senha, 8)
    }).then(usuario => {
        if (req.body.perfis) {
            Perfil.findAll({
                where: {
                    nome: { [Op.or]: req.body.perfis }
                }
            }).then(perfis => {
                usuario.setPerfis(perfis).then(() => {
                    res.send({ message: "Usuário criado com sucesso." });
                });
            });
        } else {
                usuario.setPerfis([1]).then(() => {
                    res.send({ message: "Usuário criado com sucesso." });
                });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};
  
exports.login = (req, res) => {
    Usuario.findOne({
        where : { usuario : req.body.usuario}
    }).then(usuario => {
        if (!usuario) {
            res.status(404).send({ message : "Usuário não encontrado."});
        }

        var senhaEValida = bcrypt.compareSync(req.body.senha, usuario.senha);

        if (!senhaEValida) {
            res.status(401).send({ message : "Senha incorreta."});            
        }

        var token = jwt.sign({ id: usuario.id }, config.secret, { expiresIn: 86400 });

        var permissoes = [];

        usuario.getPerfis().then(perfis => {
            
            for (let i = 0; i < perfis.length; i++) {       
                       
                permissoes.push("PERFIL_" + perfis[i].nome.toUpperCase());
            }

            res.status(200).send({
                id : usuario.id,
                nome_usuario : usuario.usuario,
                email: usuario.email,
                perfis: permissoes,
                acess_token: token

            });
        });


    }).catch(err => {
        res.status(500).send({ message : "ERROR: " + err.message });
    });
};