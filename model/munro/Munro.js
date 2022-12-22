const mongoose = require('mongoose');

const munroSchema = new mongoose.Schema({
    name: {
        type: String
    }, 
    height: {
        type: Number
    },
    latlng_lat: {
        type: Number
    },
    latlng_lng: {
        type: Number
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