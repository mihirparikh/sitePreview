/**
 * Created by mihirparikh on 11/5/16.
 */
(function () {
	'use strict';

	module.exports = angular.module('dashboard.services', [])
		.service('apiDataService', require('./apiData.service'));

})();