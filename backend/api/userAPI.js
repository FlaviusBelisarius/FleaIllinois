var mongoose = require('mongoose');
var Product = require('../models/user');
var express = require('express');
router = express.Router();

var emailSet = new Set();  // check for duplicate emails

var userdata = mongoose.model('users', UserSchema);

userdata.find().exec().then(ret => {
    for (var i = 0; i < ret.length; i++){
        emailSet.add(ret[i].email)
    }
})

app.post('/api/users', function(req, res){
    var data = req.body;
    if (!data.name || !data.email){
        res.status(404).send({
            "message": "Error!",
            "data": "need name & email"
        })
    }
    if (emailSet.has(data.email)){
        res.status(404).send({
            "message": "Error!",
            "data": "duplicate email:" + data.email
        })
    }
    
    try{
        mongoose.connection.collection('users').insert(data);
    }catch (error) {
        res.status(500).send({
            "message": "Error!",
            "data": error
        });
    }

    emailSet.add(data.email)

    const cont = {
        "message": "ok",
        "data": data
    }
    res.status(201).send(cont);
})

app.get('/api/users', function(req, res){

    var result = userdata.find()
    
    if (req.query.where){
        result = result.where(JSON.parse(req.query.where))
    }
    

    if (req.query.select){
        result = result.select(JSON.parse(req.query.select))
    }

    if (req.query.sort){
        result = result.sort(JSON.parse(req.query.sort))
    }

    if (req.query.limit){
        var limit = parseInt(req.query.limit, 10)
        result = result.limit(limit);
    }

    if (req.query.skip){
        result = result.skip(parseInt(req.query.skip, 10));
    }

    if (req.query.count && req.query.count == "true"){
        result.countDocuments().exec().then(ret => {
            const cont = {
                "message": "ok",
                "data": ret
            }
            res.status(200).send(cont);
        }).catch(err => {
            res.status(404).send({
                "message": "Error!",
                "data": err
            })
        })
    }else{
        result.exec().then(ret => {
            const cont = {
                "message": "ok",
                "data": ret
            }           
            res.status(200).send(cont);
        }).catch(err => {
            res.status(404).send({
                "message": "Error!",
                "data": err
            })
        })
    }
})

app.get('/api/users/:id', function (req, res) {
    var ret;
    try{
        ret = userdata.find({"_id": req.params.id})
        if (req.query.select){
            ret = ret.select(JSON.parse(req.query.select))
        }
    }catch(error){
        res.status(404).send({
            "message": "Error!",
            "data": error
        });
    }
    ret.exec().then(result => {
        res.status(200).send({
            "message": "ok",
            "data": result
        });
    }).catch(err => {
        res.status(500).send({
            "message": "Error!",
            "data": err
        })
    })
})

app.put('/api/users/:id', function (req, res) {
    var data = req.body;
    if (!data.name || !data.email){
        res.status(404).send({
            "message": "Error!",
            "data": "need name & email"
        })
    }
    var currEmail;
    
    userdata.findById(req.params.id).exec().then(ret => {
        emailSet.delete(ret.email);
        currEmail = ret.email;
    }).catch(err =>{
        res.status(404).send({
            "message": "Error!",
            "data": err
        });
    })
    if (emailSet.has(data.email)){
        res.status(404).send({
            "message": "Error!",
            "data": "duplicate email"
        })
    }
    userdata.replaceOne({"_id": req.params.id}, req.body).exec().then(ret =>{
        res.status(200).send({
            "message": "ok",
            "data": ret
        });
    }).catch(err =>{
        emailSet.add(currEmail);   // add back to emailset
        res.status(500).send({
            "message": "Error!",
            "data": err
        });
    })
})

app.delete('/api/users/:id', function (req, res) {
    var currEmail;
    userdata.findById(req.params.id).exec().then(ret => {
        currEmail = ret.email;
    }).catch(err =>{
        res.status(404).send({
            "message": "Error!",
            "data": err
        });
    })
    userdata.deleteOne({"_id": req.params.id}).exec().then(ret =>{
        emailSet.delete(currEmail);
        res.status(200).send({
            "message": "ok",
            "data": ret
        });
    }).catch(err =>{
        res.status(404).send({
            "message": "Error!",
            "data": err
        });
    })
})
