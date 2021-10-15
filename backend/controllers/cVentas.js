const Venta = require('../models/mVentas');

exports.getVentas = (req, res) => { /// Aca van todas las funciones a utilizar como la multiplicacion con postman q trabajamos y la conexion a la BD para
    Venta.find().then((postResult) => {
        res.status(200).json(postResult);
    });



};

exports.addVentas = (req, res) => {
    const ventasAdd = new Venta({
        Fecha_Venta: req.body.Fecha_Venta,
        Producto: req.body.Producto,
        Referencia: req.body.Referencia,
        Precio: req.body.Precio,
        Descripcion: req.body.Descripcion,
        Sucursal: req.body.Sucursal,
        Vendedor: req.body.Vendedor,
        Categoria: req.body.Categoria
    });

    ventasAdd.save().then((createdVenta) => {
        console.log(createdVenta);
        res.status(201).json("Venta registrada");
    });
};

exports.getVentaId = (req, res) => {
    Venta.findById(req.params.id).then((ventaResult) => {
        if (ventaResult) {
            res.status(200).json(ventaResult);
        } else {
            res.status(404).json("Venta no encontrada");
        }
    });
};

exports.deleteVentaId = (req, res) => {
    Venta.findById(req.params.id).then((ventaResult) => {
        if (ventaResult) {
            Venta.findByIdAndDelete({ _id: req.params.id }, req.body, function (err) {
                res.status(200).json("Deleted")
            });
        } else {
            res.status(404).json("No Encontrado")
        }
    });

}

exports.updateVentaId = (req, res) => {
    Venta.findById(req.params.id).then((ventaResult) => {
        if (ventaResult) {
            Venta.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err) {
                res.status(200).json("Update")
            });
        } else {
            res.status(404).json("No Update")
        }
    });
}