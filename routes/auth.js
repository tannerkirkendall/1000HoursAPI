const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userObj = await User.findOne({email:req.body.email});
    if (userObj) return res.status(400).send('Email Exists');

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hasedPassword
    });

    try{
         const savedUser = await user.save();
         res.send();
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('Email Not Exists');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Wrong Pass');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('x-access-token', token).send({accessToken: token, firstName: user.firstName});
});

module.exports = router;