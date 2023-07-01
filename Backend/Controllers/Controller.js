const userSchema = require("../Models/Models");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require("dotenv").config();

// create single user 
exports.createSingleUser = async(req,res)=>
{
    const user = await userSchema.findOne({email: req.body.email});
    try 
    {
        if(!user)
        {
            bcrypt.hash(req.body.password, saltRounds, async(err, hash)=>
                {
                   const newUser = userSchema
                   (
                    {
                        email : req.body.email,
                        password : hash
                    }
                   )
                   await newUser
                   .save()
                   .then((newUser)=>
                   {
                        res.status(201).send 
                        (
                            {
                                success : true,
                                message : "Create single user",
                                status: 201,
                                data : 
                                {
                                    email : newUser.email,
                                }
                            }
                        )
                   })
                   .catch((err)=>
                   {
                        res.status(401).send 
                        (
                            {
                                success : false,
                                message : err.message,
                                status: 401,
                            
                            }
                        )
                   })
                  
                });
        }
        else 
        {
            res.status(500).send 
            (
                {
                    success : false,
                    message : "This user already exist",
                    status: 500
                }
            )
        }
    } 
    catch (error) 
    {
        res.status(500).send 
        (
            {
                success : false,
                message :error.message,
                status: 500
            }
        )
    }
}



// login user 
exports.loginUser = async(req,res)=>
{
    const user = await userSchema.findOne({email: req.body.email});
    try 
    {
        if(user)
        {
             bcrypt.compare(req.body.password, user.password, async(err, result)=> 
            {
                if(result)
                {   
                    const payload = 
                    {
                        id: user._id,
                        email : user.email
                    }

                    const token = jwt.sign(payload, process.env.SECRET_KEY, 
                        {
                            expiresIn : "1d"
                        });

                    res.status(200).send 
                    (
                        {
                            success : true,
                            message : "authorized user",
                            status : 200,
                            data : 
                            {
                                email : user.email,
                                token : "Bearer "+token             
                            }
                        }
                    )
                }
                else 
                {
                    res.status(500).send 
                    (
                        {
                            success : false,
                            message : "Incorrect Password",
                            status : 500,                         
                        }
                    )
                }
            });
        }
        else 
        {
            res.status(401).send 
                    (
                        {
                            success : false,
                            message : "Incorrect Email",
                            status : 401,                         
                        }
                    )
        }
    }
    catch (error)
    {
        res.status(500).send 
        (
            {
                success : false,
                message : error.message,
                status : 500,                         
            }
        )
    }
}


