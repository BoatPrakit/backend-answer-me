const express = require('express');
const router = express.Router();
const Form = require('../models/form-model');
const frontEndHost = "http://localhost:3000";
const Answer = require('../models/answer-model');
// router.use((req,res,next) => {
//     if(!req.session.loggedin) res.redirect(`${frontEndHost}/user/login`);
//     next();
// })

// Form zone
router.get('/',(req,res) => {
    Form.find()
    .then(forms => res.json(forms))
    .catch(err => res.status(400).json({data: `Err ${err}`}))
});
router.post('/create',(req,res) => {
    const owner = req.session.username;
    // const owner = req.body.username;
    const formName = req.body.formName;
    const description = req.body.description;
    const question = req.body.question;

    const newForm = new Form({
        "ownerUsername" : owner,
        formName,
        description,
        question
    });

    newForm.save();
    // res.status(201).redirect(`${frontEndHost}/form/`);
    res.json("create success")
});
router.put('/edit/:id',(req,res) => {
    Form.findByIdAndUpdate(req.params.id)
    .then(form => {
        form.description = req.body.description;
        form.formName = req.body.formName;
        form.question = req.body.question;

        form.save();
        // res.status(204).redirect(`${frontEndHost}/form/`);
        res.json("edit success");
    })
});
router.delete('/delete/:id',(req,res) => {
    Form.findByIdAndRemove(req.params.id)
    .then(() => {
        res.json("Delete success")
        // res.status(204).redirect(`${frontEndHost}/form`);
    })
    .catch(err => res.status(400).json('Err '+err));
});
//  End Form zone

// Answer Zone
router.get('/:formId/answers/',(req,res,next) => {
    Form.findById(req.params.formId)
    .then(forms => {
        const requestUsername = req.session.username;
        if(forms.filter(form => form.ownerUsername === requestUsername).length !== 1){
            res.redirect(`${frontEndHost}/form`);
        }
    });
    next();
},(req,res) => {

    Answer.find({formId: req.params.formId})
    .then(answers => res.json({answers}))
    .catch(err => res.status(400).json({data: 'Err'+err}));
});

router.post('/:formId/answer/',(req,res) => {
    const answerUsername = req.session.username;
    const formId = req.params.formId;
    const answer = req.body.answer;

    const newAnswer = new Answer({
        answerUsername: answerUsername,
        formId,
        answer
    })
    newAnswer.save();
    res.status(201).redirect(`${frontEndHost}/form`)
})
module.exports = router;
