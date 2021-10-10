var express = require('express');
var mongoose = require('mongoose');
var app = express();

const productsRoutes = require("./routes/products")
const ventasRoutes = require("./routes/ventas")
const usuariosRoutes = require("./routes/usuarios")

app.use(express.json()); //
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb+srv://al_prieto:1234@cluster0.k1w6p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
    console.log("Conectado")
});


app.use("/api/products", productsRoutes)
app.use("/api/ventas", ventasRoutes)
app.use("/api/usuarios", usuariosRoutes)

module.exports = app;