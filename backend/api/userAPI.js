var express = require('express');
router = express.Router();

var User = require('../models/user');
var Product = require('../models/product');

function parseQuery(condition) {
    if (typeof condition !== 'undefined'){
        return JSON.parse(condition);
    }
    return condition;
}

router.get('/', function(req, res) {
    User.find(parseQuery(req.query.where))
        .sort(parseQuery(req.query.sort))
        .select(parseQuery(req.query.select))
        .skip(parseQuery(req.query.skip))
        .limit(parseQuery(req.query.limit))
        .exec()
        .then(users => {
            if(users){
                if(req.query.count){
                    return res.status(200).json({
                        message: "OK", 
                        data: users.length
                    });
                }
                if(users.length == 0){
                    return res.status(404).json({
                        message: "User not found",
                        data: []
                    });
                }
                return res.status(200).json({
                    message: "OK", 
                    data: users
                });
            }

        })
        .catch(err => {
            return res.status(500).json({
                message: "Server Error",
                data: err
            });
        })
});

router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, targetUser){
        if(targetUser){
            return res.status(200).json({
                message: "OK",
                data: targetUser
            });
        }else if(err){
            if (err.name == "CastError") {
                return res.status(400).json({
                    message:"User id is invalid", 
                    data: {"Invalid id is": req.params.id}
                });
            }
            return res.status(500).json({
                message: "Server error",
                data: err
            });
        }else{
            return res.status(404).json({
                message: "User not found",
                data: []
            });
        }
    });
});

function validateEmail(email){ // make sure input email is a valid email
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

router.post('/', function(req, res) {
    if (!req.body.email) {
        return res.status(400).json({
            message:'Post request must have user email', 
            data: []
        });
    }
    if(!validateEmail(req.body.email)){
        return res.status(400).json({
            message:"user email is invalid", 
            data: {"Invalid email is": req.body.email}
        });
    }
    const newUser = {
        email: req.body.email, // must have
        name: req.body.name, // it's ok to be null or empty
        verified: req.body.verified,
    }
    User.findById(req.body.email, function(userErr, targetUser){
        if(targetUser){
            return res.status(404).json({
                message: "User already exists",
                data: []
            });
        }else if(userErr){
            if (userErr.name == "CastError") {
                return res.status(400).json({
                    message:"user email is invalid", 
                    data: {"Invalid email is": req.body.email}
                });
            }
            return res.status(500).json({
                message: "Server error",
                data: err
            });
        }else{
            User.create(newUser)
                .then(postRes => {
                    return res.status(201).json({
                        message: "User successfully created", 
                        data: postRes
                    })
                })
                .catch(err => {
                    return res.status(500).json({
                        message: "Server Error",
                        data: err
                    });
                });
        }
    });
});

router.put('/:id', function(req, res) {
    if(req.body.name){
        Product.updateMany({sellerID: req.params.id}, {"$set":{"sellerName": req.body.name}});
        Product.updateMany({buyerID: req.params.id}, {"$set":{"buyerName": req.body.name}});
    }
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedUser){
        if(updatedUser){
            return res.status(201).json({
                message: 'User updated',
                data: updatedUser
            });
        }else if(err){
            if (err.name == "CastError") {
                return res.status(400).json({
                    message:"User id is invalid", 
                    data: {"Invalid id is": req.params.id}
                });
            }
            return res.status(500).json({
                message: "Server error",
                data: err
            });
        }else{
            return res.status(404).json({
                message: "User not found",
                data: []
            });
        }
    });
});

router.delete('/:id', function(req, res) {
    User.findByIdAndDelete(req.params.id, function (err, targetUser){
        if(targetUser){
            return res.status(200).json({
                message: 'User deleted',
                data: targetUser
            });
        }else if(err){
            if (err.name == "CastError") {
                return res.status(400).json({
                    message:"User id is invalid", 
                    data: {"Invalid id is": req.params.id}
                });
            }
            return res.status(500).json({
                message: "Server error",
                data: err
            });
        }else{
            return res.status(404).json({
                message: "User not found",
                data: []
            });
        }
    });
});

module.exports = router;
