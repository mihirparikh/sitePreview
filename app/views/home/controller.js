/**
 * Created by mihirparikh on 11/6/16.
 */
(function() {
	'use strict';

	function homeController() {
		var vm = this;

		// URL Regex Pattern - from regex.wtf
		var p = {
			protocol: '^(http(s)?(:\/\/))?(www\.)?',
			domain: '[a-zA-Z0-9-_\.]+',
			tld: '(\.[a-zA-Z0-9]{2,})',
			params: '([-a-zA-Z0-9:%_\+.~#?&//=]*)'
		};

		var pattern = new RegExp(p.protocol + p.domain + p.tld + p.params, 'gi');


		vm.text = "";
		vm.title = "This is the home page.";
		vm.textCount = 0;
		
		vm.onKeyUp = function () {
			vm.textCount = vm.text.length;
		};

		function detectUrl(string) {

		}
	}

	homeController.$inject = [];

	module.exports = homeController;
})();
