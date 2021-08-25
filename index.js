const mongoose = require("mongoose")
const express = require('express')
const crypto = require('crypto')
require('dotenv').config()

const app = express()
app.use(express.static('public'));
app.use(express.json());
mongoose.connect(process.env.MONGODBURI, {useNewUrlParser: true, useUnifiedTopology: true});

var conn = mongoose.connection;
conn.on('connected', function(){
    console.log('its connected')
})
const signuptableschema = new mongoose.Schema({
    email: String,
    password: String,
    userid: String,
    palette: [{red : Number, green: Number, blue: Number}]
})

const signuptable = mongoose.model("signuptable", signuptableschema);

function personadder(req, res){
    console.log('in personadder', req.body.email)
    const signuprow = new signuptable({
        email: req.body.email,
        password: crypto.createHash('md5').update(req.body.password).digest('hex')
    })
    signuptable.find({email: req.body.email}, (err, signuptableres) => {
        console.log(signuptableres)
        if(typeof(signuptableres[0]) === 'undefined') {
            signuprow.save()
            res.send({fallout: 'Signed up. Now you can login'})
        }
        else res.send({fallout: 'user exists'})
    })
}
function login(req, res){
    console.log('in login')
    signuptable.find({email: req.body.email}, (err, signuptableres) => {
        if(signuptableres[0] === undefined) {
            res.send({fallout: 'user doesnt exist on database'})
            return 0;
        }
        if(signuptableres[0].password === crypto.createHash('md5').update(req.body.password).digest('hex')) res.send({fallout: 'successul login'})
        else res.send({fallout: 'bad credentials'})
    })
}


app.get('/favicon.ico', (req, res) => {
    console.log('infavicon')
    res.sendFile('./public/favicon.ico')
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})
app.post('/personadder', personadder)
app.post('/login', login)

app.listen('3000', () => {
    console.log('communicating with 3000')
})