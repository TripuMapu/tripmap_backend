const express = require('express')
const useractions = require('../methods/useractions')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send('working fine')
})

router.post('/adduser', useractions.addNew)
router.post('/login', useractions.login)
router.get('/getinfo', useractions.getinfo)

module.exports = router