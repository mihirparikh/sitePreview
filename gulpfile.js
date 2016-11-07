/**
 * gulp task to run local
 *
 **/

"use strict";

var gulp = require("gulp");
var open = require("open");
var rimraf = require("rimraf");
var spawn = require("cross-spawn");
var path = require("path");
// var Server = require('karma').Server;

/**
 * A function that will register default gulp tasks.
 *
 * @param {Object} gulp - A reference to the gulp module
 */

var config = require(path.resolve("webpack.config.js"));
config.entry.vendor.unshift("expose?$!expose?jQuery!jquery", "bootstrap-sass");

var port = (config && config.devServer && config.devServer.port) ? config.devServer.port : 9900;

/////////////////////////////////////////////////////////////////////////////
// local development

gulp.task("run", ["serve:dev", "open:dev"]);

gulp.task("serve:dev", function (done) {
	// Run the webpack-dev-server CLI
	var webpackDevServer = spawn("node", [
		"node_modules/webpack-dev-server/bin/webpack-dev-server.js",
		"--config", "./webpack.config.js",
		"--inline", "--hot",
		"--content-base", "build/",
		"--history-api-fallback"
	], {
		stdio: 'inherit'
	});

	webpackDevServer.on("close", done);
});

gulp.task("open:dev", function () {
	open("http://localhost:" + port + "/#/home");
});

// packaging
gulp.task("clean", function (done) {
	rimraf("{./build, .tmp/}", done);
});

gulp.task("package", ["clean"], function (done) {
	// Run the webpack CLI
	var webpackCompiler = spawn("node", ["node_modules/webpack/bin/webpack.js",
	                                     "--config", "./webpack.config.js"
	], {
		stdio: 'inherit'
	});

	webpackCompiler.on("close", done);
});

// set the default task
gulp.task("default", ["package"]);