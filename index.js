require("./db"); 
// Llamada al archivo de conexion de base de datos mongodb
// Modulos que hacen falta
const express = require("express");
const Pet = require("./models/Pet");

// CONFIGURAR SERVER
const server = express();
server.use (express.json());
server.use(express.urlencoded({extended: false}));
const PORT = 4044;


// RUTAS
petRoutes = require("./routes/pet.routes");
shelterRoutes = require("./routes/shelter.routes");

// AGREGAR Routes
server.use("/pets", petRoutes);
server.use("/shelters", shelterRoutes);

// Middleware para cuando no haya ruta
server.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

// Agregar el controlador de errores.
server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || "Unexpected error");
});


server.listen(PORT, ()=>{
    console.log(`server running on localhost:${PORT}`);
});