const express = require('express');
const router = express.Router();
const Form = require('../models/form-model');
const frontEndHost = "http://localhost:3000";

// router.use((req,res,next) => {
//     if(!req.session.loggedin) res.redirect(`${frontEndHost}/user/login`);
//     next();
// })
router.get('/',(req,res) => {
    Form.find()
    .then(forms => res.json(forms))
    .catch(err => res.status(400).json({data: `Err ${err}`}))
});
router.post('/create',(req,res) => {
    const owner = req.session.username;
    const formName = req.body.formName;
    const description = req.body.description;
    const question = req.body.question;

    const newForm = new Form({
        "ownerUsername" : owner,
        formName,
        description,
        question
    });

    newForm.save()
    // .then(() => ({data: "Form Created"}))
    // .catch(err => console.log(err));
    // res.status(201).redirect(`${frontEndHost}/form/`);
});
router.put('/edit/:id',(req,res) => {
    Form.findByIdAndUpdate(req.params.id)
    .then(form => {
        form.description = req.body.description;
        form.formName = req.body.formName;
        form.question = req.body.question;

        form.save()
        // .then(() => ({data: "Form Updated"}))
        // .catch(err => console.log(err));
        res.status(204).redirect(`${frontEndHost}/form/`);
    })
});
router.delete('/delete/:id',(req,res) => {
    Form.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).redirect(`${frontEndHost}/form`))
    .catch(err => res.status(400).json('Err '+err));
})

module.exports = router;
