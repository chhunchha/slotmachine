angular.module('goodmorning')
.directive('reel', reelDirective);

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
				interval = 300;
				change = Math.floor((Math.random() * 10) + 5);
				mininterval = 10;
				maxinterval = Math.floor((Math.random() * interval) + interval);

				//scope.image_background = {'background' : 'url(' + scope.data[scope.index].img + ')'};
			}

			var fast = true;
			function startReel() {

				var e =  angular.element(element.children()[0]).parent()[0];

				scope.reelSpin = setInterval(function() {
					scope.index = (scope.index + 1) % scope.data.length;

					var scrollTop = scope.index * 100;
					$(e).animate({scrollTop: scrollTop}, interval - 100);
					// e.scrollTop = scope.index * 100;

					//console.log(e.scrollTop);
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
