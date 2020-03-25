var http = require("http");
var path = require("path");
var express = require("express");
var axios = require("axios");
var app = express();

var axios_instance;
var data;

exports.sendJsonToLocalServer = function(url, destination) {

	axios_instance = axios.create({
		headers: {"Access-Control-Allow-Origin": "*"}
	});

	axios.get(url).then(function(res) {
		data = res.data;
	});

	setInterval(function() {
		axios.get(url).then(function(res) {
			data = res.data;
		});
	}, 300*1000);

	app.get("/" + destination, function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.send(data);
		console.log("Data sent to http://localhost:8080/" + destination);
	});

}

app.listen(8080);
