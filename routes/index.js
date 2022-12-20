const express = require('express')
const useractions = require('../methods/useractions')
const locationactions = require('../methods/locationactions')
const commentactions = require('../methods/commentactions')
const districtactions = require('../methods/districtactions')
const routeactions = require('../methods/routeactions')
const typeactions = require('../methods/typeactions')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send('working fine')
})

router.post('/adduser', useractions.addNew)
router.post('/login', useractions.login)
router.get('/getinfo', useractions.getinfo)
router.post('/addtype', typeactions.addNew)
router.post('/gettypes', typeactions.gettypes)
router.post('/addcomment', commentactions.addNew)
router.post('/getcomments', commentactions.getComments)
router.post('/addlocation', locationactions.addNew)
router.post('/findlocations', locationactions.findlocation)
router.post('/getdistricts', districtactions.getdistricts)
router.post('/adddistrict', districtactions.addNew)
router.post('/getalllocations', locationactions.getalllocations)

module.exports = router
