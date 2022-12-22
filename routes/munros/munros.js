const router = require('express').Router();

const User = require("../../model/users/UserInstance");
const Munro = require('../../model/munro/Munro');


router.get('/all-munros', async (req, res) => {

    const allMunros = await Munro.find();

    res.status(200).json(allMunros);
});

router.get('/all-incomplete-munros/:userId', async (req, res) => {

    const user = await User.findOne(
        {
            _id: req.params.userId
        }
    );

    const allIncompleteMunros = await Munro.find(
        { 
            _id: { $nin: user.completedMunros } 
        }
    );

    res.status(200).json(allIncompleteMunros);
});

router.get('/all-complete-munros/:userId', async (req, res) => {

    const user = await User.findOne(
        {
            _id: req.params.userId
        }
    );

    const allCompleteMunros = await Munro.find(
        { 
            _id: { $in: user.completedMunros } 
        }
    );

    res.status(200).json(allCompleteMunros);
});

router.put('/update-complete-munros/:userId', async (req, res) => {

    const updateCompleteMunros =  await User.updateOne(
        { 
            _id: req.params.userId 
        },
        req.body
    )

    res.status(200).json(updateCompleteMunros);
});

module.exports = router;