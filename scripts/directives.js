
angular.module("directives",[])

.directive("loading",function(){
	return {
		restrict: "A",
		replace: true,
		template: '<img src="" alt="" />'
	}
});