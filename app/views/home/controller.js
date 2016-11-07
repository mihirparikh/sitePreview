/**
 * Created by mihirparikh on 11/6/16.
 */
(function () {
	'use strict';

	function homeController($interval, $timeout) {
		var vm = this;

		// URL Regex Pattern
		// TODO: make it work without the 'http|https'
		var pattern = new RegExp(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/, 'ig');

		vm.text = "";
		vm.title = "This is the home page.";
		// vm.textCount = 0;
		vm.foundUrl = "";
		var checkInterval = 3000; // milliseconds
		var stopInterval = null;

		var wordMap = {};

		// vm.onKeyUp = function () {
		// 	// vm.textCount = vm.text.length;
		// 	vm.foundUrl = detectUrl(vm.text);
		// };

		var intervalFunc = function (str) {
			var words = str.split(" ");

			for (var i = 0; i < words.length; i++) {
				if (wordMap.hasOwnProperty(words[i])) {
					vm.foundUrl = words[i];
					return;
				}

				var res = pattern.exec(words[i]);
				if (res !== null) {
					wordMap[words[i]] = true;
					vm.foundUrl = words[i];
					return;
				}

				// no URL found!
				vm.foundUrl = "";
			}
		};

		// start
		vm.onFocus = function () {
			console.log('Begin polling...');

			stopInterval = $interval(intervalFunc, checkInterval, /*count == 0 for indefinite */ 0, true, vm.text);

			// stopInterval = $interval(function(){
			// 	var res = pattern.exec(vm.text);
			// 	if (res !== null) {
			// 		console.log("Result: " + res);
			// 		vm.foundUrl = res[0];
			// 	} else {
			// 		vm.foundUrl = "";
			// 	}
			// }, checkInterval);
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

	homeController.$inject = ['$interval', '$timeout'];

	module.exports = homeController;
})();
