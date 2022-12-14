var Comment = require('../models/comment')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var MongoClient = require('mongodb').MongoClient;
const { default: mongoose } = require('mongoose')
const { MongoUnexpectedServerResponseError } = require('mongodb')
var url = "mongodb+srv://AhmetBilalTuran:Ab!159357!Ab@cluster0.zujm3.mongodb.net/mydatabase?retryWrites=true&w=majority";

var functions={
    addNew: function(req,res){
        if((!req.body.commentuserId) || (!req.body.commentlocationId) || (!req.body.commentcontent) (!req.body.commentrating)){
            res.json({success: false, msg: 'Bütün Boşlukları Doldurunuz'})
        }else{
            var newComment = Comment({
                commentUserId: commentuserId,
                commentLocationId: commentlocationId,
                commentContent: commentcontent,
                commentRating: commentrating,
                commentDate: new Date(),
            })
            newComment.save(function(err){
                if(err){
                    res.json({success: false, msg: 'Kayıt Başarısız'})
                }
                else{
                    res.json({success: true, msg: 'Başarıyla Kaydolundu'})
                }
            })
        }
    },
    getComments: function(req,res){
        if(!req.body.commentlocationId){
            res.json({success: false, msg: 'Bütün Boşlukları Doldurunuz'})
        }else{
            Comment.find({commentLocationId: commentlocationId}, function(err, comments){
                if(err) throw err;
                res.json({success: true, 'array': comments})
            })
        }
    }
}

module.exports = functions