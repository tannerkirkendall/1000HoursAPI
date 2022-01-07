const router = require('express').Router();
const User = require('../models/User'); 
const { registerValidation } = require('../validation');

router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    try{
         const savedUser = await user.save();
         res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;