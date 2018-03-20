
var Yike = angular.module("Yike",["ngRoute","Controllers","directives"]);

Yike.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/today",{
		templateUrl: "./views/today.html",
		controller: "todayController"
	}).when("/older",{
		templateUrl: "./views/older.html",
		controller: "olderController"
	}).when('/author',{
		templateUrl: './views/author.html',
		controller: 'authorController'
	}).when('/category',{
		templateUrl: './views/category.html',
		controller: 'categoryController'
	}).when('/favourite',{
		templateUrl: './views/favourite.html',
		controller: 'favouriteController'
	}).when('/settings',{
		templateUrl: './views/settings.html',
		controller: 'settingsController'
	}).when('/list',{
		templateUrl: './views/list.html',
		controller: 'listController'
	}).otherwise({
		redirectTo: "/today"
	})
}]);

Yike.run(["$rootScope",function($rootScope){
	
	$rootScope.collapsed = false;

	$rootScope.toggle = function(){

		$rootScope.collapsed = !$rootScope.collapsed;
		var navs = document.querySelectorAll(".navs dd");

		if($rootScope.collapsed){
			for(var i=0,len=navs.length;i<len;i++){
				navs[i].style.transform = "translate(0)";
				navs[i].style.transitionDelay = "0.2s";
				navs[i].style.transitionDuration = (i+1)*0.15 + "s";
			}
		}else {
			var len = navs.length-1;
			for(var j=len;j>0;j--){
				navs[j].style.transform = "translate(-100%)";
				navs[j].style.transitionDelay = "";
				navs[j].style.transitionDuration = (len - j)*0.15 + "s";
			}
		}
	}
}])