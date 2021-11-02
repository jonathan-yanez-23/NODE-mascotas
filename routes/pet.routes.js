const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");



router.get("/", async (req, res) => {
    try {
        const pets = await Pet.find();
        return res.status(200).render("pets", {title: "Upgrade pets", pets: pets})
    } catch (err) {
        next(err)
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const pet = await Pet.findById(id);
        if (pet) {
            return res.status(200).json(pet);
        } else {
            return res.status(404).json("No pet found by this id");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get("/species/:species", async (req, res) => {
    const age = req.params.age;
    try {
        const petsByAge = await Pet.find({age: {$lt: age}});
        return res.status(200).json(petsByAge);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/create", async (req, res)=>{
    try {
        // CREAR instancia con los datos enviados
        const newPet = new Pet({
            name: req.body.name,
            species: req.body.species,
            age: req.body.age
        });

        // Guardar mascota en la DB
        const createdPet = await newPet.save();
        return res.status(200).json(createdPet);
    } catch (err) {
        next(err);
    }
});

router.put("/edit", async (req, res, next) => {
    try {
        const id = req.body.id;
        const updatedPet = await Pet.findByIdAndUpdate(
            id,
            {name: req.body.name}, // modificar el nombre de la mascota
            {new: true} // Conseguir el documento actualizado
        );
        return res.status(200).json(updatedPet);
    } catch (err) {
        next(err);
    }
});

router.delete("/delete/:id", async (req, res) =>{
    try {
        const id = req.params.id;
        await Pet.findByIdAndDelete(id);
        return res.status(200).json("Pet deleted");
    } catch (err) {
        next(err);
    }
})
module.exports = router;