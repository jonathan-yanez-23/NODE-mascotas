// ESTE ARCHIVO ESTABLECE LA CONEXION CON LAS BASE DE DATOS
const mongoose = require("mongoose");

// ENLACE A NUESTRA BASE DE DATOS
const DB_URL = "mongodb://localhost:27017/upgrade_class_3";

//FUNCIONDE CONEXION AL SERVIDOR CON LOS DATOS
mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

