/**
 * Created by mihirparikh on 11/6/16.
 */
(function() {

	'use strict';

	APIDataService.$inject = ['$http', '$q'];

	function APIDataService($http, $q) {
		var _this = this;

		var _urlPattern = new RegExp(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/, 'ig');

		function _getUrlPattern() {
			return _urlPattern;
		}

		// for converting binary images to Base64
		function _arrayBufferToBase64(buffer) {
			var binary = '';
			var bytes = new Uint8Array(buffer);
			var raw = String.fromCharCode(null, bytes);
			// var len = bytes.byteLength;
			// for (var i = 0; i < len; i++) {
			// 	binary += String.fromCharCode(bytes[i]);
			// }
			//return window.btoa(binary);
			return window.btoa(raw);
		}

		var reqParams = {
			'url': '',
			'width': 200
		};

		var headers = {};

		var reqConfig = {
			url: '/thumb-api',
			method: 'GET',
			responseType: 'arrayBuffer',
			params: reqParams,
			headers: headers
		};

		// implement HTTP API calls here

		var _setupReqParams = function(target, sizeW) {
			if (angular.isDefined(target)) {
				reqParams.url = target;
			}

			if (angular.isDefined(sizeW)) {
				reqParams.width = sizeW;
			}
		};

		var _requestThumbnail = function() {
			var defer = $q.defer();

			$http(reqConfig).then(function(response) {
				// var str = _arrayBufferToBase64(response.data);
				var str = window.btoa(response.data);
				console.log(str);
				defer.resolve(str);
			}, function(response) {
				var data = response.data || 'Request failed';
				var status = response.status;
				defer.reject({data: data, status: status});
			});

			return defer.promise;
		};

		var _requestHeaders = function(url) {
			var defer = $q.defer();

			var url = "head-api?url=" + encodeURIComponent(url);

			$http.get(url).then(function(result){
				defer.resolve(result);
			}, function(err) {
				defer.reject(err);
			});

			return defer.promise;
		};

		return {
			setupReqParams: _setupReqParams,
			requestThumbnail: _requestThumbnail,
			requestHeaders: _requestHeaders,
			getUrlPattern: _getUrlPattern
		};
	}

	module.exports = APIDataService;

})();
