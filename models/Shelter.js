const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shelterSchema = new Schema(
    {
        name: {type: String, required: true},
        location: {type: String, required: true},
        pets: [{type: mongoose.Types.ObjectId, ref: "Pet"}]
    },
    {
        timestamps: true
    }
);
const Shelter = mongoose.model("Shelter", shelterSchema);
module.exports = Shelter;