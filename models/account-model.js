const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const accountSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        trim: String,
        required: true,
        minlength: 8
    }
},{timestamps: true});
const Account = mongoose.model('useraccount',accountSchema,"accounts");
module.exports = Account;