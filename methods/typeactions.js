var Route = require('../models/route')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var MongoClient = require('mongodb').MongoClient;
const { default: mongoose } = require('mongoose')
const { MongoUnexpectedServerResponseError } = require('mongodb')
var url = "mongodb+srv://AhmetBilalTuran:Ab!159357!Ab@cluster0.zujm3.mongodb.net/mydatabase?retryWrites=true&w=majority";

var functions ={
    addNew: function(req,res){
        if(!res.body.typename){
            res.json({success: false, msg: 'Bütün Boşlukları Doldurunuz'})
        }else{
            newType = Type({
                typeName: typename
            })
            newType.save(function(err){
                if(err){
                    res.json({success: false, msg: 'Kayıt Başarısız'})
                }
                else{
                    res.json({success: true, msg: 'Başarıyla Kaydolundu'})
                }
            })
        }
    }
}

module.exports = functions