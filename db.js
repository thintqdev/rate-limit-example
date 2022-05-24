const mongoose = require('mongoose');

async function connect(app) {
    try {
        await mongoose.connect('mongodb://localhost:27017/quangthin_db');
        console.log('MongoDB Connected...');
    }
    catch (err) {
        console.log(err);
        console.log('MongoDB Failed...');
    }
}
module.exports = {connect};