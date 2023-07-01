const express = require("express");
const cors = require("cors");
const router  = require("./Router/Router");
const app = express();

app.use(cors());
app.use(router);

// routing error 
app.use((req,res,next)=>
{
    res.status(404).send 
    (
        {
            success : false,
            message : "Page not found",
            status : 404
        }
    )
})

// server error 
app.use((err,req,res,next)=>
{
    res.status(500).send 
    (
        {
            success : false,
            message : err.message,
            status : 500
        }
    )
})

module.exports = app;