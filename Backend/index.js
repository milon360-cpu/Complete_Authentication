const app = require("./app");
require("dotenv").config();
require("./Config/DbConfig");
const port = process.env.PORT;


app.listen(port,()=>
{
    console.log("Server is running");
})