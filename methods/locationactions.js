var Location = require('../models/location')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var MongoClient = require('mongodb').MongoClient;
const { default: mongoose } = require('mongoose')
const { MongoUnexpectedServerResponseError } = require('mongodb')
var url = "mongodb+srv://AhmetBilalTuran:Ab!159357!Ab@cluster0.zujm3.mongodb.net/mydatabase?retryWrites=true&w=majority";

var functions ={
    addNew: function(req, res){
        if((!req.body.locationtypeId)|| (!req.body.locationdistrictId)||(!req.body.locationname)||(!req.body.locationimageurl)||(!req.body.locationdefination)||(!req.body.locationcoordinate)||(!req.body.locationavaragerating)){
            res.json({success: false, msg: 'Bütün Boşlukları Doldurunuz'})
        }
        else{
            var newLocation = Location({
                locationTypeId: req.body.locationtypeId,
                locationDistrictId: req.body.locationdistrictId,
                locationName: req.body.locationname,
                locationImageUrl: req.body.locationimageurl,
                locationDefination: req.body.locationdefination,
                locationCoordinate: req.body.locationcoordinate,
                locationAvarageRating: req.body.locationavarageratin
            }) 
            newLocation.save(function(err){
                if(err) throw err;
                res.json({success: true, msg: 'Lokasyon başarıyla kaydedilmiştir'})
            })
        }
    },
    findlocation: function(req,res){
        if((!req.body.locationtypeId)||(!req.body.locationdistrictId)){
            res.json({success: false, msg: 'Bütün Boşlukları Doldurunuz'})
        }else{
            Location.find({locationTypeId: req.body.locationtypeId, locationDistrictId: req.body.locationdistrictId}, function(err, locations){
                if(err) throw err;
                if(!locations){
                    res.json({success: false, msg: 'İstenilen kriterde lokasyon bulunmamaktadır'})
                }else{
                    res.json({success: true, 'array': locations})
                }
            }) 
        }
    }

}

module.exports = functions