var app = angular.module('goodmorning', []);
app.controller('goodMorningCtrl', goodMorningCtrl)
app.directive('reel', reelDirective);

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
	$scope.isRunnig = false;

	$scope.startMachine = function() {
		angular.forEach($scope.reels, function(reel){
			reel.runningFlag = true;
		});
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

function reelDirective() {
	return {
		restrict : 'E',
		scope : {
			options : '='
		},
		templateUrl : 'reelDirective.tpl.html',
		link : function(scope, element) {

			scope.data = scope.options.data;

			var interval;
			var change;
			var mininterval;
			var maxinterval;

			scope.image_background;

			var init = function() {
				scope.index = 0;
				interval = 100;
				change = Math.floor((Math.random() * 10) + 5);
				mininterval = 10;
				maxinterval = Math.floor((Math.random() * 100) + 200);

				//scope.image_background = {'background' : 'url(' + scope.data[scope.index].img + ')'};
			}

			var fast = true;
			function startReel() {

				var e =  angular.element(element.children()[0]).parent().parent()[0];

				scope.reelSpin = setInterval(function() {
					scope.index = (scope.index + 1) % scope.data.length;

					e.scrollTop = scope.index * 100;
					console.log(e.scrollTop);
					//scope.image_background = {'background' : 'url(' + scope.data[scope.index].img + ')'};
					scope.$apply();

					if(fast) {
						interval = interval - change;
						if(interval < mininterval)
						fast = false;
					} else {
						interval = interval + change;
						if(interval > maxinterval) {
							stop();
						}
					}
					//console.log(interval);
				}, interval);
			}

			var stop = function() {
				clearInterval(scope.reelSpin);
				scope.options.runningFlag = false;
				scope.options.stoppedAt = scope.index;
				scope.$emit('reelStopped');
			}

			scope.$watch('options.runningFlag', function(newValue, oldValue){
				if(newValue) {
					init();
					startReel();
				}
			});

			init();
		}
	}
}
