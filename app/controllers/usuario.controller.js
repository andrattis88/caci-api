exports.AcessoPublico = (req, res) => { 
    res.status(200).send("Conteúdo Público.");
}

exports.AcessoUsuario = (req, res) => {
    res.status(200).send("Conteúdo para Usuários autenticados.");
}

exports.AcessoModerador = (req, res) => {
    res.status(200).send("Conteúdo para Moderadores autenticados.");
}

exports.AcessoAdministrador = (req, res) => {
    res.status(200).send("Conteúdo para Administradores autenticados.");
}