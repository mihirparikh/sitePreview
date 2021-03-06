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
var url = require('url');

app.set('port', 9900);

var http = require('http');


//The url we want is `www.nodejitsu.com:1337/`
app.get("/head-api",
	function (req, resp, next) {
		// console.log('received HEAD request:');
		if (req.query.url) {
			next();
		} else {
			resp.status(400).json({status: 'failed'});
		}
	},
	function (req, resp) {
		var targetUrl = url.parse(req.query.url);
		// console.log(JSON.stringify(targetUrl));

		// callback for http/https
		function httpReqCallback(response) {
			// console.log("https req headers: " + JSON.stringify(response.headers));
			// console.log("https req status: " + JSON.stringify(response.statusCode));

			var data = {};
			data['status'] = 'success';
			if (response.statusCode === 301 || response.statusCode === 302) {
				data['location'] = response.headers.location || '';
			}
			// resp.status(response.statusCode).json({status: 'success'});
			resp.status(200).json(data);
		}

		var options = {
			host: targetUrl.hostname,
			port: targetUrl.port,
			path: targetUrl.path,
			method: 'HEAD'
		};
		var headReq;
		if (targetUrl.protocol.match(/^https/) !== null) {
			headReq = https.request(options, httpReqCallback);
		} else {
			headReq = http.request(options, httpReqCallback);
		}

		headReq.end();
		headReq.on('error', function(errStr){
			console.error('Unable to connect: ' + errStr);
			resp.status(400).json({status: 'failed'});
		});
	});

// proxy thumb-api calls over to thumbalizr for snapshot images
app.use('/thumb-api', proxy('api.thumbalizr.com', {
	https: true,
	forwardPath: function (req, resp) {
		var returnPath = require('url').parse(req.url).path;
		// console.log(returnPath);
		return returnPath;
	}
}));

app.use("/", express.static(__dirname + '/build'));

app.listen(app.get('port'));
console.log("Listening on port " + app.get('port'));