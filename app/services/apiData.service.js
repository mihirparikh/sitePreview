/**
 * Created by mihirparikh on 11/6/16.
 */
(function() {

	'use strict';

	APIDataService.$inject = ['$http', '$q'];

	function APIDataService($http, $q) {
		var _this = this;

		var reqParams = {
			'url': '',
			'width': 200
		};

		var headers = {};

		var reqConfig = {
			url: 'http://localhost:9900/thumb-api',
			method: 'GET',
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
				defer.resolve(response);
			}, function(response) {
				var data = response.data || 'Request failed';
				var status = response.status;
				defer.reject({data: data, status: status});
			});

			return defer.promise;
		};

		return {
			setupReqParams: _setupReqParams,
			requestThumbnail: _requestThumbnail
		};
	}

	module.exports = APIDataService;

})();
