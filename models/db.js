// npm install mongoose --save
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
    .catch((err) => {
        console.log(err);
    });
module.exports = { mongoose };