(function(){

	angular
		.module("turtleFacts")
		.controller("listCtrl", listCtrl);

	listCtrl.$inject = ['quizMetrics', 'dataService'];

	function listCtrl(quizMetrics,dataService) {
		var vm = this;

		vm.quizMetrics = quizMetrics;
		vm.turtleList = dataService.turtlesData;
		vm.activeTurtle = {};
		vm.changeActiveTurtle = changeActiveTurtle;
		vm.activateQuiz = activateQuiz;
		vm.search = "";


		function changeActiveTurtle(index) {
			vm.activeTurtle = index;
		}

		function activateQuiz() {
			quizMetrics.changeState(true);
		}
 
	
	}

})();