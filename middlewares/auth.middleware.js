function isAuthenticated(req, res, next){
    // Si el booleano d autenticacion devuelve true, avanzamos al siguiente punto
    if(req.isAuthenticated()){
        return next();
    } else {
        // En caso de no hacer usuarios logeados, a login
        return res.redirect("/login");
    }
}

module.exports = {
    isAuthenticated
}