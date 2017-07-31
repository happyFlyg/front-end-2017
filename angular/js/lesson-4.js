angular.module('app',[])
.controller('firstCtrl',function($scope){
	$scope.msg='Hello Angular!';
})
.controller('secCtrl',function($scope){
    $scope.msg='你好吗？';
})