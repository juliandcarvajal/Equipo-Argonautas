const Usuario = require('../models/mUsuarios');

exports.getUsuarios = (req, res) => {
    /// Aca van todas las funciones a utilizar como la multiplicacion con postman q trabajamos
    Usuario.find().then((usuarioResult) => {
        res.status(200).json(usuarioResult);
    });
}

exports.addUsuarios = (req, res) => {
    const usuariosAdd = new Usuario({
        Documento: req.body.Documento,
        NombreApellido: req.body.NombreApellido,
        Telefono: req.body.Telefono,
        Correo: req.body.Correo,
        Sucursal: req.body.Sucursal,
        Role: req.body.Role,
        Estado: req.body.Estado
    });

    usuariosAdd.save().then((createdUsuario) => {
        console.log(createdUsuario);
        res.status(201).json("Created satisfied");
    });
};

exports.getUsuariosId = (req, res) => {
    Usuario.findById(req.params.id).then((usuarioResult) => {
        if (usuarioResult) {
            res.status(200).json(usuarioResult);
        } else {
            res.status(404).json("No Encontrado")
        }
    });
};

exports.deleteUsuario = (req, res) => {
    Usuario.findById(req.params.id).then((usuarioResult) => {
        if (usuarioResult) {
            Usuario.findByIdAndDelete({ _id: req.params.id }, req.body, function (err) {
                res.status(200).json("Deleted")
            });
        } else {
            res.status(404).json("No Encontrado")
        }
    });

}

exports.updateUsuarioById = (req, res) => {
    Usuario.findById(req.params.id).then((usuarioResult) => {
        if (usuarioResult) {
            Usuario.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err) {
                res.status(200).json("Update")
            });
        } else {
            res.status(404).json("No Update")
        }
    });
}