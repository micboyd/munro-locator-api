const router = require('express').Router();

const Munro = require('../../model/munro/Munro');
const User = require('../../model/users/UserInstance');


router.get('/all-munros', async (req, res) => {

    const allMunros = await Munro.find();

    res.status(200).json(allMunros);
});

router.get('/all-complete-munros/:userId', async (req, res) => {

    const allCompleteMunros = await CompletedMunro.find(
        { 
            userId: req.params.userId
        }
    );

    res.status(200).json(allCompleteMunros);
    
});

// Get incomplete munros
router.get('/all-incomplete-munros/:userId', async (req, res) => {

    const allMunros = await Munro.find();

    const user = await User.find(
        { 
            userId: req.params.userId
        }
    );

    console.log(user.completeMunros);

    res.status(200).json(allIncompleteMunros);
});

// Add Complete Munro
router.post('/add-complete-munro', async (req, res) => {

    const completeMunroInstance = await CompletedMunro.create(req.body);

    res.status(200).json(completeMunroInstance);
});

// Delete Complete Munro
router.delete('/delete-complete-munro/:completeMunroId', async (req, res) => {    

    const deleteCompleteMunro = await CardioInstance.deleteOne(
        { 
            munroId: req.params.completeMunroId
        }
    );

    res.status(200).json(deleteCompleteMunro);
});

module.exports = router;
