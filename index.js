const mongoose = require("mongoose")
const express = require('express')
const crypto = require('crypto')
require('dotenv').config()

var email, password
const app = express()
app.use(express.static('public'));
app.use(express.json());
mongoose.connect(process.env.MONGODBURI, {useNewUrlParser: true, useUnifiedTopology: true});

var conn = mongoose.connection;
conn.on('connected', function(){
    console.log('its connected')
})
const signuptableschemaref = new mongoose.Schema({
    email: String,
    password: String,
    userid: String,
    palettes: Array,
    teststring: String
})

const signuptable = mongoose.model("signuptable", signuptableschemaref);

function personadder(req, res){
    const signuprow = new signuptable({
        email: req.body.email,
        password: crypto.createHash('md5').update(req.body.password).digest('hex'),
        userid: req.body.email
    })
    signuptable.find({email: req.body.email}, (err, signuptableres) => {
        if(typeof(signuptableres[0]) === 'undefined') {
            signuprow.save()
            res.send({fallout: 'Signed up. Now you can login'})
        }
        else res.send({fallout: 'user exists'})
    })
}
function login(req, res){
    email = req.body.email
    password = req.body.password
    signuptable.find({email: req.body.email}, (err, signuptableres) => {
        if(signuptableres[0] === undefined) {
            res.send({fallout: 'user doesnt exist on database'})
            return 0;
        }
        if(signuptableres[0].password === crypto.createHash('md5').update(req.body.password).digest('hex')) res.send({fallout: 'successul login'})
        else res.send({fallout: 'bad credentials'})
    })
}
function savepalette(req, res){
    signuptable.updateOne({email: req.body.email}, {palettes: req.body.palettestoupload}, (err) => {
        if(err) console.log(err)
    })
    signuptable.find({email: req.body.email}, (err, signuptableres) => {
        if(err) console.log(err)
    })
    res.send({fallout: 'updated'})
}
function getuserpalettes(req, res){
    signuptable.find({email: req.body.email}, (err, signuptableres) => {
        if(err) console.log(err)
        else{
            res.send({fallout: signuptableres[0].palettes})
        }
    })
}


app.get('/favicon.ico', (req, res) => {
    res.sendFile('./public/favicon.ico')
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})
app.post('/personadder', personadder)
app.post('/login', login)
app.post('/savepalette', savepalette)
app.post('/getuserpalettes', getuserpalettes)

app.listen('3000', () => {
    console.log('communicating with 3000')
})