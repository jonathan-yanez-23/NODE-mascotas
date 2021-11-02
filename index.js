require("./db"); 
// Llamada al archivo de conexion de base de datos mongodb
// Modulos que hacen falta
const express = require("express");
const Pet = require("./models/Pet");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const passport = require("passport");
require("./passport");

// CONFIGURAR SERVER
const server = express();
server.use (express.json());
server.use(express.urlencoded({extended: false}));
const PORT = 4044;


// RUTAS
petRoutes = require("./routes/pet.routes");
shelterRoutes = require("./routes/shelter.routes");
userRoutes = require("./routes/user.routes");
indexRoutes = require("./routes/index.routes");


// Inicializar passport
server.use(passport.initialize())

// AGREGAR Routes
server.use("/pets", petRoutes);
server.use("/shelters", shelterRoutes);
server.use("/users", userRoutes);
server.use("/", indexRoutes);


// Middleware para cuando no haya ruta
server.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

// Agregar controlador de errores con vista de ERROR
server.use((err, req, res, next) => {
    return res.status(err.status || 500).render('error', {
        message: err.message || 'Unexpected error',
        status: err.status || 500,
    });
});

server.use(express.static(path.join(__dirname, "public")));

// Handlebars
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "hbs");

//Agregar el helper custom (if customizado)
hbs.registerHelper("gte", (a, b, opts) => {
    if (a >= b){
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

hbs.registerHelper("uppercase", (str) => {
    return str.toUpperCase();
});
server.listen(PORT, ()=>{
    console.log(`server running on localhost:${PORT}`);
});