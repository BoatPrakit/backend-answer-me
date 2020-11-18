const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    ownerUsername: {
        type: String,
        required: true,
        trim: true
    },
    formName: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    description: {
        type: String
    },
    question: {
        type: Object
    }
},{
    timestamps: true
});

const Form = mongoose.model('form',formSchema,'form');
module.exports = Form;


