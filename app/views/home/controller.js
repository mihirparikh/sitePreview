/**
 * Created by mihirparikh on 11/6/16.
 */
(function () {
	'use strict';

	function homeController($interval, $timeout, apiService) {
		var vm = this;

		// URL Regex Pattern
		// TODO: make it work without the 'http|https'
		var pattern = new RegExp(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/, 'ig');

		vm.text = "";
		vm.title = "This is the home page.";
		// vm.textCount = 0;
		vm.foundUrl = "";
		vm.imgSrc = "";
		var checkInterval = 3000; // milliseconds
		var stopInterval = null;
		var baseImageRequest = 'http://localhost:9900/thumb-api?width=300&url=';


		// var queryparams = 'thumb-api?width=200&url=http://news.yahoo.com';
		vm.imgPath = "";

		var wordMap = {}; // TODO: this should be a LRU cache - maybe $cacheFactory

		// test service function
		// apiService.setupReqParams('http://www.yahoo.com', 200);
		//
		// apiService.requestThumbnail().then(function(result){
		// 	console.log("received thumbnail response!");
		// 	vm.imgSrc = result;
		// });

		var intervalFunc = function () {
			var words = vm.text.split(" ");
			console.log("word array: " + words);

			for (var i = 0; i < words.length; i++) {
				if (wordMap.hasOwnProperty(words[i])) {
					if (wordMap[words[i]] === true) {
						vm.foundUrl = words[i];
						apiService.requestHeaders(vm.foundUrl).then(function (res) {
							vm.imgPath = baseImageRequest + encodeURIComponent(vm.foundUrl);
						});
						return;
					} else {
						continue;
					}
				}

				// match expression - insert in to wordMap
				// TODO: this is expensive so run it as little as possible
				var res = pattern.exec(words[i]);
				if (res !== null) {
					wordMap[words[i]] = true;
					console.log(JSON.stringify(wordMap));
					vm.foundUrl = words[i];
					apiService.requestHeaders(vm.foundUrl).then(function (res) {
						vm.imgPath = baseImageRequest + encodeURIComponent(vm.foundUrl);
					});
					// vm.imgPath = baseImageRequest + encodeURIComponent('http://news.yahoo.com');
					return;
				} else {
					wordMap[words[i]] = false;
				}
			}
			// no URL found!
			vm.foundUrl = "";
		};

		// start
		vm.onFocus = function () {
			console.log('Begin polling...');

			stopInterval = $interval(intervalFunc, checkInterval, /*count == 0 for indefinite */ 0, true);
		};

		// stop
		vm.onBlur = function () {
			if (stopInterval !== null) {
				$timeout(function () {
					console.log('Stop polling...');
					$interval.cancel(stopInterval);
				}, checkInterval);
			}
		};

		// function detectUrl(str) {
		// 	var res = pattern.exec(str);
		// 	if (res !== null) {
		// 		console.log("Result: " + res);
		// 		vm.foundUrl = res[0];
		// 	}
		// }
	}

	homeController.$inject = ['$interval', '$timeout', 'apiDataService'];

	module.exports = homeController;
})();
