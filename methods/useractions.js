var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var MongoClient = require('mongodb').MongoClient;
const { default: mongoose } = require('mongoose')
const { MongoUnexpectedServerResponseError } = require('mongodb')
var url = "mongodb+srv://AhmetBilalTuran:Ab!159357!Ab@cluster0.zujm3.mongodb.net/mydatabase?retryWrites=true&w=majority";

var functions ={
    addNew: function(req,res){
        if((!req.body.username) || (!req.body.password) || (!req.body.email) || (!req.body.fullname)){
            res.json({success: false, msg: 'Bütün Boşlukları Doldurunuz'})
        }
        else{
            User.findOne({
                username: req.body.username,
            }, function (err,user){
                if(err) throw err
                if(!user){
                    User.findOne({
                        email: req.body.email
                    }, function(err,user){
                        if(err) throw err
                        if(!user){
                            var newUser = User({
                                fullname: req.body.fullname,
                                username: req.body.username,
                                password: req.body.password,
                                email: req.body.email,
                                profilepicture: '',
                                bookmarks: Array,

                            });
                            newUser.save(function(err, newUser){
                                if(err){
                                    res.json({success: false, msg: 'Kayıt Başarısız'})
                                }
                                else{
                                    res.json({success: true, msg: 'Başarıyla Kaydolundu'})
                                }
                            })
                        }else{
                            res.status(200).send({success: false, msg: 'Bu email kullanılmakta'})
                        }
                    })
                    
                }else{
                    res.status(200).send({success: false, msg: 'Bu kullanıcı adı kullanılmakta'})
                }
            })
            
        }
    },
    login: function (req,res){
        User.findOne({
            username: req.body.username
        }, function(err, user){
            if(err) throw err
            if(!user){
                res.status(200).send({success: false, msg: 'Giriş Başarısız, Kullanıcı Adı veya Şifre Yanlış'})
            }
            else{
                user.comparePassword(req.body.password, function(err, isMatch){
                    if(isMatch && !err){
                        var token = jwt.encode(user, config.secret)
                        res.json({success: true, token: token, msg: 'Giriş Başarılı'})
                    }
                    else{
                        return res.status(200).send({success: false, msg: 'Giriş Başarısız, Kullanıcı Adı veya Şifre Yanlış'})
                    }
                })
            }
        }
        )
    },
    getinfo: function(req,res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({success: true, msg: 'hello ' + decodedtoken.username, "userid": decodedtoken._id, "username": decodedtoken.username, "email": decodedtoken.email, "profilepicture": `http://10.0.2.2:8080${decodedtoken.profilepicture}`, 'isArtist': decodedtoken.isArtist})
        }else{
            return res.json({success: false, msg: 'no headers'})
        }
    },
}



module.exports = functions