const express = require("express");
const { createSingleUser, loginUser } = require("../Controllers/Controller");
const router = express.Router();
const passport = require("passport");
router.use(express.urlencoded({extended:true}));
router.use(express.json());
router.use(passport.initialize());
require("../Config/Passport");

router.post("/create/single/user",createSingleUser);
router.post("/login/user",loginUser);

router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res)=>
    {
        return res.status(200).send 
        (
            {
                success : true,
                email : req.body.email             
            }
        )
                    
    }
)

module.exports = router;