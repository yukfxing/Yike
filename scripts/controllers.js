
angular.module("Controllers",[])
//侧栏导航
.controller("navController",["$scope",function($scope){
	$scope.navs = [
		{link:"#/today",icon:"icon-home",text:"今日一刻"},
		{link:"#/older",icon:"icon-file-empty",text:"往期内容"},
		{link:"#/author",icon:"icon-pencil",text:"热门作者"},
		{link:'#/category',icon: 'icon-menu',text: '栏目浏览'},
		{link:'#/favourite',icon: 'icon-heart',text: '我的喜欢'},
		{link:'#/settings', icon: 'icon-cog',text: '设置'}
	];
}])
//每日一刻
.controller("todayController",["$scope","$http","$filter","$rootScope",function($scope,$http,$filter,$rootScope){

	var today = $filter("date")(new Date,"yyyy-MM-dd");

	$rootScope.title = '今日一刻';
	$rootScope.index = 0;
	$rootScope.hiden = false;

	$http({
		url: "./api/today.php",
		method: "get",
		params: {today: today}
	}).success(function(info){
		$rootScope.hiden = true;
		console.log(info);
		$scope.date = today;
		$scope.posts = info.posts;
	})
}])
//往期精彩
.controller("olderController",["$scope","$http","$rootScope",function($scope,$http,$rootScope){

	$rootScope.title = '往期内容';
	$rootScope.index = 1;
	$rootScope.hiden = false;

	$http({
		url: "./api/older.php",
		method: "get"
	}).success(function(info){
		$rootScope.hiden = true;
		console.log(info);
		$scope.date = info.date;
		$scope.posts = info.posts;
	});

}])
//热门作者
.controller('authorController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){

		$rootScope.title = '热门作者';
		$rootScope.index = 2;
		$rootScope.hiden = false;

		$http({
			url: './api/author.php'
		}).success(function(info){
			$rootScope.hiden = true;
			console.log(info);
			$scope.rec = info.rec;
			$scope.all = info.all;
		})
}])
//栏目浏览
.controller('categoryController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){

	$rootScope.title = '栏目浏览';
	$rootScope.index = 3;
	$rootScope.hiden = false;

	$http({
		url: './api/category.php'
	}).success(function(info){
		$rootScope.hiden = true;
		console.log(info);
		$scope.columns =  info.columns;
	})
}])
//栏目内容
.controller('listController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){

	$rootScope.hiden = false;

	$http({
		url: './api/list.php'
	}).success(function(info){
		$rootScope.hiden = true;
		console.log(info);
		$scope.column = info.column;
		$scope.posts = info.posts;
	})
}])
//我的喜欢
.controller('favouriteController',['$scope','$rootScope',function($scope,$rootScope){
	$rootScope.title = '我的喜欢';
	$rootScope.index = 4;
	$rootScope.hiden = true;
}])
//设置
.controller('settingsController',['$scope','$rootScope',function($scope,$rootScope){
	$rootScope.title = '设置';
	$rootScope.index = 5;
	$rootScope.hiden = true;
}]);