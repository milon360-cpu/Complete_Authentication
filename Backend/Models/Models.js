const mongoose = require("mongoose");

const userSchema = mongoose.Schema
(
    {
        email:
        {
            type : String,
            unique : true,
            required : [true, "Email is required"],
            trim : true,
            validate :
            {
                validator : (v)=>
                {
                    const validEmailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
                    return validEmailExpression.test(v);
                },
                message : (props)=> `${props.message} is not a valid email`
            }
        },
        password : 
        {
            type : String,
            required : [true, "Password is required"],
            trim : true
        },
        createdOn:
        {
            type : Date,
            default : Date.now
        }
    }
)

module.exports = mongoose.model("userSchema",userSchema);