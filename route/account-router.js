const express = require('express');
const router = express.Router();
const Account = require('../models/account-model');
const frontEndHost = "http://localhost:3000";

router.get('/logout',(req,res) => {
    req.session.destroy(err => console.log(err));
    res.redirect(`${frontEndHost}/user/login`);
});
router.post('/auth',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(req.session.loggedin){
        res.redirect(`${frontEndHost}/form`);
    }else if(username && password){
        Account.find()
        .then(users => {
            if(users.filter(user => username === user.username).length === 1){
                req.session.username = username;
                req.session.loggedin = true;
                // res.redirect(`${frontEndHost}/form`);
                res.json({data: "success"})
            }
        }) 
    }else{
        res.status(400).json({data: "Username or Password not correct"});
    }
});
router.post('/register',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    Account.find()
    .then(users => {
        if(users.filter(user => user.username === username).length >= 1) 
        res.status(400).json({data: 'This username was already use'});
        else{
            const newUser = new Account({username,password});
            newUser.save()
            .then(() => {
                req.session.username = username;
                req.session.loggedin = true;
                res.redirect(`${frontEndHost}/form`);
            })
            .catch(err => res.status(400).json('Err '+err));
        }
        
    })
    .catch(err => res.status(400).json('Err '+err));
});
module.exports = router;