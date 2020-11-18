const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answerUsername: {
        type: String,
        required: true,
        trim: true,
    },
    formId: {
        type: Schema.Types.ObjectId,
        ref: 'form'
    },
    answers: {
        type: Object,
    }
},{timestamps: true});

const Answer = mongoose.model('answer',answerSchema,'form');
module.exports = Answer;