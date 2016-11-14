/**
 * Created by mihirparikh on 11/6/16.
 */
(function () {
	'use strict';

	function homeController($interval, $timeout, apiService, appConfig) {
		var vm = this;

		// vm.text = "";
		vm.title = "Begin typing your message...";

		vm.foundUrl = "";
		vm.imgPath = "";

		var stopInterval = null;
		var baseImageRequest = 'http://localhost:9900/thumb-api?width=300&url=';

		var wordMap = {}; // TODO: this should be a LRU cache - maybe $cacheFactory

		// return imageUrl
		var getImagePath = function(url) {
			var headerPromise = apiService.requestHeaders(url).then(function (res) {
				return (baseImageRequest + encodeURIComponent(url));
			}, function(err) {
				console.error('Bad URL: ' + err);
			});

			return headerPromise;
		};

		var intervalFunc = function () {
			var words = vm.text.split(" ");
			console.log("word array: " + words);

			for (var i = 0; i < words.length; i++) {
				// look within map
				if (wordMap.hasOwnProperty(words[i])) {
					if (wordMap[words[i]] !== null) {
						vm.foundUrl = words[i];
						vm.imgPath = wordMap[words[i]];
						return;
					} else {
						continue;
					}
				}

				// match expression - insert into wordMap
				// TODO: this is expensive so run it as little as possible
				var match = apiService.getUrlPattern().exec(words[i]);
				if (match !== null) {
					// wordMap[words[i]] = true;
					console.log(JSON.stringify(wordMap));
					vm.foundUrl = words[i];
					getImagePath(vm.foundUrl).then(function(result){
						vm.imgPath = result;
						wordMap[words[i]] = result; // cache if valid URL
					}, function(err) {
						vm.imgPath = '';
						wordMap[words[i]] = null; // force 'cache-miss' for bad URLs
					});
					return;
				}
			}
			// no URL found!
			vm.foundUrl = '';
			vm.imgPath = '';
		};

		// start
		vm.onFocus = function () {
			console.log('Begin polling...');

			stopInterval = $interval(intervalFunc, appConfig.pollInterval, /*count == 0 for indefinite */ 0, true);
		};

		// stop
		vm.onBlur = function () {
			if (stopInterval !== null) {
				$timeout(function () {
					console.log('Stop polling...');
					$interval.cancel(stopInterval);
					stopInterval = null; //TODO: not sure if this is abs needed?
				}, appConfig.pollInterval);
			}
		};
	}

	homeController.$inject = ['$interval', '$timeout', 'apiDataService', 'appConfig'];

	module.exports = homeController;
})();
