const mongoose = require("mongoose");
// Importamos el model Pet en este archivo
const Pet = require("./models/Pet");
const Schema = mongoose.Schema;
// creamos los datos d elas mascotas
const pets= [
    {
        name: "Anastasio",
        age: 3,
        species: "dog"
    },
    {
        name: "Botijo",
        age: 4,
        species: "cat"
    },
    {
        name: "Calixto",
        age: 5,
        species: "dog"
    },
    {
        name: "Deidara",
        age: 6,
        species: "frog"
    },
    {
        name: "Ganimedes",
        age: 7,
        species: "turtle"
    }
];

const petDocuments = pets.map(pet => new Pet(pet));

// CONEXION
mongoose
.connect("mongodb://localhost:27017/upgrade_class_3", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async ()=>{
    // Usar Pet.find() obtendremos un array con todos los pets de la db
    const allPets = await Pet.find();
    // Si existen pets previamente, dropearemos la coleccion
    if(allPets.length){
        await Pet.collection.drop();
    }
})
.catch((err)=>console.log(`Error deleting data: ${err}`))
.then(async () => {
    // Una vez vaciada la db de mascotas, usaremos el array de petDocuments
    // para llenar la base de datos con todas las mascotas
    await Pet.insertMany(petDocuments);
})
.catch((err)=>console.log(`Error creating data: ${err}`))
.finally(() => mongoose.disconnect()); // Nos desconectamos de la base de datos