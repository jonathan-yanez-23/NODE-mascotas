const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");
router.get("/", async (req, res, next)=>{
    try {
        const pets = await Pet.find();
        res.status(200).render("index", {title: "Upgrade Pets", pets: pets});
    } catch (err) {
        next(err);
    }
    
});

router.get("/pet/:id", async (req, res, next)=>{
    try {
        const id  = req.params.id;
        const pet = await Pet.findById(id);
        return res.status(200).render("pet",{
            title: "Upgrade single pet",
            pet: pet,
            id: id
        });
    } catch (err) {
        // return res.status(404).render("pet",{
        //     title: "Upgrade single pet",
        //     pet: undefined,
        //     id: req.params.id
        // });
        next(err);
    }
    
});

router.get("/register", (req, res, next) => {
    res.render("register");
});

router.get("/login", (req, res, next) => {
    res.render("login");
});
module.exports = router;