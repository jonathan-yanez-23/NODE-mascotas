const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creamos el esquema de mascots
const petSchema = new Schema(
    {
        name: {type: String, required: true},
        age: {type: Number},
        species: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

// Creamos el modelo y lo exportamos
const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;