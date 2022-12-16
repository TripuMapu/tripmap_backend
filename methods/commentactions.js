var Comment = require('../models/comment')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var MongoClient = require('mongodb').MongoClient;
const { default: mongoose } = require('mongoose')
const { MongoUnexpectedServerResponseError } = require('mongodb')
var url = "mongodb+srv://AhmetBilalTuran:Ab!159357!Ab@cluster0.zujm3.mongodb.net/mydatabase?retryWrites=true&w=majority";

var functions={
    addNew: function(req,res){
        if((!req.body.userId) || (!req.body.locationId) || (!req.body.content)|| (!req.body.rating)){
            res.json({success: false, msg: 'Bütün Boşlukları Doldurunuz'})
        }else{
            var newComment = Comment({
                commentUserId: req.body.userId,
                commentLocationId: req.body.locationId,
                commentContent: req.body.content,
                commentRating: req.body.rating,
                commentDate: new Date(),
            })
            newComment.save(function(err){
                if(err){
                    res.json({success: false, msg: 'Kayıt Başarısız'})
                }
                else{
                    res.json({success: true, msg: 'Başarıyla yorum eklendi'})
                }
            })
        }
    },
    getComments: function(req,res){
        if(!req.body.locationId){
            res.json({success: false, msg: 'Bütün Boşlukları Doldurunuz'})
        }else{
            Comment.find({commentLocationId: parseInt(req.body.locationId)}, function(err, comments){
                if(err) throw err;
                res.json({success: true, 'array': comments})
            })
        }
    }
}

module.exports = functions