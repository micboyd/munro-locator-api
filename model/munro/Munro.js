const mongoose = require('mongoose');

const munroSchema = new mongoose.Schema({
    name: {
        type: String
    }, 
    height: {
        type: Number
    }, 
    gridref_letters: {
        type: String
    }, 
    gridref_eastings: {
        type: String
    }, 
    gridref_northings: {
        type: String
    },
    latlng_lat: {
        type: Number
    },
    latlng_lng: {
        type: Number
    },
    smcid: {
        type: String
    },
    metoffice_loc_id: {
        type: String
    },
    region: {
        type: String
    },
    detailed_region: {
        type: String
    },
    meaning: {
        type: String
    },
    image_url: {
        type: String
    }
});

module.exports = mongoose.model('Munro', munroSchema);