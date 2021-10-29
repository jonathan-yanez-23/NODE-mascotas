const express = require("express");
const PORT = 4044;
const server = express();

server.use('/', (req, res)=>{
    res.send("Hello Upgrade Hub");
});

server.listen(PORT, ()=>{
    console.log(`server running on localhost:${PORT}`);
})