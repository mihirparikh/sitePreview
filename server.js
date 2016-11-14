// server.js

// BASE SETUP
// ==============================

// Call the packages we need
var express = require('express'); // call express
var https = require('https');
var http = require('http');

var app = express();
var path = require('path');
var proxy = require('express-http-proxy');

app.set('port', 9900);

var http = require('http');


//The url we want is `www.nodejitsu.com:1337/`
app.get("/head-api",
	function (req, resp, next) {
		// console.log('received HEAD request:');
		if (req.query.url) {
			next();
		} else {
			resp.status(200).json({status: 'failed'});
		}
	},
	function (req, resp) {
		var host = req.query.url.replace(/.*?:\/\//g, "");
		var options = {
			host: host,
			method: 'HEAD'
		};
		var headReq = http.request(options, function (response) {
			resp.status(200).json({status: 'success', resheaders: response.headers});
		});
		headReq.end();
		headReq.on('error', function(errStr){
			console.error('Unable to connect: ' + errStr);
			resp.status(400).json({status: 'failed'});
		});
	});

// app.get("/thumb-api",
// 	function (req, resp, next) {
// 		console.log("Got thumb request: " + req.originalUrl);
// 		if (req.query.url) {
// 			next()
// 		}
// 	},
// 	function (req, resp) {
// 		console.log("Executing thunbalizr proxy call..");
// 		var responseObj;
// 		var page = '';
// 		var imgHost = 'http://api.thumbalizr.com';
// 		var queryStr = req.originalUrl.replace(/\/thumb-api/, '');
// 		var options = {
// 			host: imgHost,
// 			method: 'GET',
// 			path: "queryStr"
// 		};
// 		console.log("image req url: " + imgHost + queryStr);
// 		var imgRequest = http.request(options, function(response) {
// 			console.log("Thumbalizr status: " + response.statusCode);
// 			console.log("Thumbalizr headers: " + response.headers);
// 			// console.log("Thumbalizr response: " + response.statusCode);
// 			response.on('data', function(chunk)
// 			{
// 				page = page + chunk;
// 			});
// 		});
// 		imgRequest.on('end', function(){
// 			//resp.status(200).write(page);
// 			resp.write(page);
// 			resp.end('');
// 		});
// 		imgRequest.on('error', function(err) {
// 			console.error("Thumbalizr Error! " + err);
// 			resp.status(400).send('Bad Request');
// 		});
// 	});
// app.get('*', function (req, res) {
// 	// load the single view file (angular will handle the page changes on the front-end)
// 	res.sendFile(__dirname + '/build/');
// });

// proxy thumb-api calls over to thumbalizr for snapshot images
app.use('/thumb-api', proxy('api.thumbalizr.com', {
	https: true,
	forwardPath: function (req, resp) {
		var returnPath = require('url').parse(req.url).path;
		console.log(returnPath);
		return returnPath;
	}
}));

app.use("/", express.static(__dirname + '/build'));

app.listen(app.get('port'));
console.log("Listening on port " + app.get('port'));