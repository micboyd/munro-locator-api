const router = require('express').Router();

const Munro = require('../../model/munro/Munro');

router.get('/all-munros', async (req, res) => {

    const allMunros = await Munro.find();

    res.status(200).json(allMunros);
});

router.put('/update-munro-instance/:munroId', async (req, res) => {
    const updatedMunro = await Munro.updateOne(
        { _id : req.params.munroId },
        req.body
    )

    res.status(200).json(updatedMunro);
});

module.exports = router;