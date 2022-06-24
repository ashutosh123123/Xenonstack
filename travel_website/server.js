var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/firstdb');

var db = mongoose.connection;

app.post("/signup ",(req,res)=>{
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email


    var data= {
"name": name,
"password": password,
"email":email
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            console.log(err);
        }
        console.log("Inserted");
    });
    return res.redirect('')
})

app.get("/",(req,res)=>{
    res.set({"Allow-access-Allow-origin":'*'})
   
}).listen(3000);

console.log("Listening on 3000");