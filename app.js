var app = angular.module('goodmorning', []);
app.controller('goodMorningCtrl', goodMorningCtrl)
app.directive('reel', reelDirective);

goodMorningCtrl.$inject = ['$scope'];
function goodMorningCtrl($scope) {

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

	$scope.reel0Data = [coffee[0],tea[0],esoresso[0]];
	$scope.reel1Data = [coffee[1],tea[1],esoresso[1]];
	$scope.reel2Data = [coffee[2],tea[2],esoresso[2]];

	$scope.stoppedAt = [ -1, -1, -1];
	$scope.startFlag = false;

	$scope.startMachine = function() {
		$scope.startFlag = true;
	}
}

function reelDirective() {
	return {
		restrict : 'E',
		scope : {
			data : '=',
			stoppedat : '=',
			start : '='
			// onStop : '@'
		},
		templateUrl : "reelDirective.tpl.html",
		link : function(scope) {
			scope.index = 0;

			var interval = 250;
			var change = Math.floor((Math.random() * 10) + 10);
			var mininterval = 10
			var maxinterval = 500;

			var fast = true;
			function startReel() {
				scope.reelSpin = setInterval(function() {
      				scope.index = (scope.index + 1) % scope.data.length;
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
					console.log(interval);
				}, interval);
			}

			var stop = function() {
				clearInterval(scope.reelSpin);
				start = false;
			}

			scope.$watch('start', function(newValue, oldValue){
				if(newValue) {
					console.log('start');
					startReel();
				}
			});
		}
	}
}
