const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User model
const User = require('../../model/users/UserInstance');

// Validation
const { registerValidation, loginValidation } = require('../../validation');

/* End-point: Login */
router.post('/login', async (req, res) => {

    const {error} = loginValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if user already exists
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).send('Email or password is incorrect');
    }

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
        return res.status(400).send('Email or password is incorrect');
    }

    // Create & assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    
    res.status(200).header('auth-token', token).json({
        token : token, 
        userid: user._id,
        username: user.firstname,
        isAdmin: user.isAdmin
    });
});

router.post('/register', async (req, res) => {

    const {error} = registerValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if user already exists
    const emailExists = await User.findOne({
        email: req.body.email
    })

    if (emailExists) {
        return res.status(400).send('Email already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt); 

    // Create a new user
    const user = new User({
        firstname: req.body.firstname,
        surname: req.body.surname,
        isAdmin: req.body.isAdmin,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/details/:userId', async (req, res) => {

    let user = await User.findOne({_id: req.params.userId});

    return res.json({
        firstname: user.firstname,
        surname: user.surname,
        isAdmin: user.isAdmin,
        email: user.email
    });
});

router.put('/update-user/:userId', async (req, res) => {

    const updatedUser = await User.updateOne(
        { _id: req.params.userId }, req.body  
    );
    
    return res.json(updatedUser);
});

router.delete('/delete-user/:userId', async (req, res) => {    

    const deletedUser = await User.deleteOne(
        { _id: req.params.userId }
    );

    return res.json(deletedUser);
});

router.get('/all-users', async (req, res) => {
    let allUsers = await User.find();

    return res.json(allUsers);
});

module.exports = router;