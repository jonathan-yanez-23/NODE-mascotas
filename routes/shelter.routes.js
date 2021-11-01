const express = require("express");
const router = express.Router();
const Shelter = require("../models/Shelter");
const Pet = require("../models/Pet");
router.get("/", async (req, res)=>{
    try {
        const shelters = await Shelter.find();
        return res.status(200).json(shelters);
    } catch (err) {
        next(err);
    }
});

router.post("/create", async (req, res)=>{
    try {
        // Crear nueva instancia ocn los datos enviados
        const newShelter = new Shelter(
            {
                name: req.body.name,
                location: req.body.location,
            }
        );

        //Guardar shelter en la DB
        const createdShelter = await newShelter.save();
        return res.status(200).json(createdShelter);
    } catch (err) {
        next(err);
    }
});

router.put("/add-pet", async (req, res, next) => {
    try {
        const shelterId = req.body.shelterId;
        const petId = req.body.petId;
        const updatedShelter = await Shelter.findByIdAndUpdate(
            shelterId,
            {$push: {pets: petId}},
            {new: true}
        );
        return res.status(200).json(updatedShelter);
    } catch (err) {
        next(err)
    }
});
module.exports = router;