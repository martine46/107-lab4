var http = require("http");
var express = require("express");

var app = express();

app.get("/",function(req,res){
    res.send("<h1 style='color:darkblue;'>Hello from my server</h1>");
});

/*CONFIGURATION*/
var bodyParser = require("body-parser");
app.use(bodyParser.json());

var ejs = require('ejs');
app.set('views', __dirname + '/public');
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var mongoose = require("mongoose");
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-001-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var db = mongoose.connection;

var ejs = require('ejs'); 
app.set("views", __dirname + '/public');
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);


var ItemDB;
var messageDB;


/*WEB SERVER*/

 app.get("/", function (req, res){
     res.render('index.html')
 })
app.get("/contact", function (req, res) {
    res.render("contact.html");
});

app.get("/catalog", function (req, res) {
    res.render("index.html");
});

app.get('/admin', function (req, res){
    res.render('admin.html');
})

var bodyParser = require("body-parser"); 
app.use(bodyParser.json());


/*API FUNCTIONALITY*/
var items = [];
var count = 0;

app.get('/api/products', function (req, res) {
    console.log("User wants the catalog");

    ItemDB.find({},function(error, data){
        if(error){
            console.log("**Error on retrieving**",error);
            res.status(500);
            res.send(error); 
        }
        res.status(200);
        res.json(data);
    });
});

app.get('/api/products/:user', function(req, res){
    var name = req.params.user;

    ItemDB.find({ user: name }, function(error, data){ 
        if(error){
            console.log("**Error filtering", error);
            res.status(500);
            res.json(error);
        }
        res.status(200)
        res.json(data);
    });
});

app.post('/api/products', function (req, res) {
    console.log("User wants to save item");

    var itemForMongo = ItemDB(req.body);
    itemForMongo.save(function(error,savedItem){
        if(error){
            console.log("**Error saving item to DB",error);
            res.status(500); 
            res.send(error);
           
        }
        console.log("Item saved correctly");
        res.status(201); 
        res.json(savedItem);
    });

});

app.post('/api/message', function(req,res){
    var msg = req.body;
    console.log("New Message From", msg.name);

    var msgForMongo = messageDB(req.body);
    msgForMongo.save(function(error,savedMsg){
        if(error){
            console.log("Error saving message", error);
            res.status(500);
            res.send(error);
        }
        res.status(201);
        res.json(savedMsg);
    });
});

app.get('/api/message/:user', function(req, res){
    var userName = req.params.user;

    messageDB.find({ user: userName}, function(error, data){
        if(error){
            console.log("Error reading data", error);
            res.status(500);
            res.send(error);
        }
        res.status(200);
        res.json(data);
    })
});

db.on('error',function(error){
    console.log("**ERROR connecting to MongoDB**");
});

db.on('open',function(){
    console.log("Conneciton Success! The database is connected to the server");

    var itemSchema = mongoose.Schema({
            TheCode: String,
            title: String,
            price: Number,
            description: String,
            category: String,
            rating: Number,
            image: String,
            user: String
    });

    var messageSchema = mongoose.Schema({
        name: String,
        mail: String,
        message: String,
        user: String
    });

    ItemDB = mongoose.model("itemCH5", itemSchema);
    messageDB = mongoose.model("messageCH5", messageSchema);
});

app.listen(8080, function () {
    console.log("Server running at http://localhost:8080");
});