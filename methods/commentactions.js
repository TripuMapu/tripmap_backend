var Comment = require('../models/comment')
var Location = require('../models/location')

var functions={
    

    addNew: function(req,res){
        if((!req.body.userId) || (!req.body.locationId) || (!req.body.content)|| (!req.body.rating)){
            res.json({success: false, msg: 'Bütün Boşlukları Doldurunuz'})
        }else{
            Location.findOne({_id: req.body.locationId}, function(err, location){
                if(err) throw err
                if(!location){
                    res.json({success: false, msg: 'İstenilen kriterde lokasyon bulunmamaktadır.'})
                }else{
                    var newComment = Comment({
                        commentUserId: req.body.userId,
                        commentLocationId: req.body.locationId,
                        commentContent: req.body.content,
                        commentRating: parseFloat(req.body.rating),
                        commentDate:new Date().toLocaleString('tr-TR', {timeZone: 'Europe/Istanbul'}),
                    })
                    newComment.save(function(err){
                        if(err){
                            res.json({success: false, msg: 'Kayıt Başarısız'})
                        }
                        else{
                           Comment.aggregate([{$match: {commentLocationId: req.body.locationId}},{$group:{_id: null, average: {$avg: '$commentRating'}}},], function(err, result){
                                console.log()
                                Location.findOneAndUpdate({_id: req.body.locationId},{locationAvarageRating: parseFloat((result[0])['average'])}, function(err, location){
                                    if(err) throw err
                                    res.json({success: true, msg: 'Başarıyla yorum eklendi'})
                                    
                                })
                            });
                        }
                    })
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