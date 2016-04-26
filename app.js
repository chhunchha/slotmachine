var app = angular.module('goodmorning', []);
app.controller('goodMorningCtrl', goodMorningCtrl);

goodMorningCtrl.$inject = ['$scope', '$timeout'];
function goodMorningCtrl($scope, $timeout) {

	var prize = [
		{name: 'Coffee', img: '/images/coffee_cup.jpeg'},
		{name: 'Tea', img: '/images/tea_cup.jpeg'},
		{name: 'Espresso', img: '/images/espress_cup.jpeg'}
	];

	var coffee = [
		{name:'coffee maker', img: '/images/coffee_maker.jpg'},
		{name:'coffee filter', img: '/images/coffee_filter.jpeg'},
		{name:'coffee grounds', img: '/images/coffee_grounds.jpeg'}
	];
	var tea = [
		{name:'teapot', img: '/images/tea_pot.jpeg'},
		{name:'tea strainer', img:'/images/tea_strainer.jpeg'},
		{name:'loose tea', img:'/images/loose_tea.jpeg'}
	];
	var esoresso = [
		{name:'espresso machine', img: '/images/espresso_machine.jpeg'},
		{name:'espresso tamper', img:'/images/espresso_tamper.jpg'},
		{name:'ground espresso beans', img:'/images/ground_espresso.jpg'}
	];

	$scope.reel0 = {
		data : [coffee[0],tea[0],esoresso[0]],
		stoppedAt : -1,
		runningFlag : false
	};

	$scope.reel1 = {
		data : [coffee[1],tea[1],esoresso[1]],
		stoppedAt : -1,
		runningFlag : false,
	};

	$scope.reel2 = {
		data : [coffee[2],tea[2],esoresso[2]],
		stoppedAt : -1,
		runningFlag : false
	};

	$scope.reels = [$scope.reel0, $scope.reel1, $scope.reel2];
	$scope.isRunning = false;
	$scope.everStarted = false;
	$scope.startMachine = function() {
		angular.forEach($scope.reels, function(reel){
			reel.runningFlag = true;
		});
		$scope.everStarted = true;
		$scope.isRunning = true;
		$scope.didYouWin = false;
		$scope.whatYouWon = {};
	}

	$scope.$on('reelStopped', function(){
		$scope.isAllStopped();
	});

	$scope.isAllStopped = function() {
		for(var i in $scope.reels) {
			if($scope.reels[i].runningFlag) {
				console.log(i, "is still running");
				return;
			}
		}
		console.log('all stopped');
		changeStatusToStopped();
		whatDidYouWin();
	}

	var changeStatusToStopped = function() {
		for(var i in $scope.reels) {
			$scope.reels[i].runningFlag = false;
		}
		$scope.isRunning = false;
		$scope.$apply();
	}

	$scope.didYouWin = false;
	$scope.whatYouWon = {};
	var whatDidYouWin = function() {
		$scope.didYouWin = false;
		$scope.whatYouWon = "";
		var stoppedAt = $scope.reels[0].stoppedAt;
		for(var i in $scope.reels) {
			if(stoppedAt != $scope.reels[i].stoppedAt) {
				return;
			}
		}

		$scope.didYouWin = true;
		$scope.whatYouWon = prize[stoppedAt];
		$scope.$apply();
	}
}
