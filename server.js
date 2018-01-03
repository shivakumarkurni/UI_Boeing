var express=require("express");
var app=express();
var router=express.Router();
var bodyParser = require("body-parser");

var path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// var Contact = require("./app/index.html");
app.use(express.static(path.join(__dirname, "app")));

app.get('/',function(request,response){
	response.end(index.html);

});

var PORT=process.env.PORT|| 9000;
app.listen(PORT,function(){
	console.log("server listening to port"+PORT)
});