(function(){
	'use strict';

	require('./home');

	module.exports = angular.module('dashboard.views', ['dashboard.views.home']);
})();