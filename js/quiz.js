(function(){

	angular
	.module("turtleFacts")
	.controller("quizCtrl", quizCtrl);

	quizCtrl.$inject = ['quizMetrics', 'dataService'];

	function quizCtrl(quizMetrics, dataService) {
		var vm = this;
		
		vm.quizMetrics = quizMetrics;
		vm.dataService = dataService;
		vm.questionAnswered = questionAnswered;
		vm.setActiveQuestion = setActiveQuestion;
		vm.activeQuestion = 0;

		var numQuestionsAnswered = 0;

		function setActiveQuestion() {
			var breakOut = false;
			var quizLength = dataService.quizQuestions.length - 1;

			while (!breakOut){
				vm.activeQuestion = vm.activeQuestion < quizLength? ++vm.activeQuestion: 0;


				if(dataService.quizQuestions[vm.activeQuestion].selected===null){
					breakOut = true;
				}
			}
		}

		function questionAnswered() {

			var quizLength = dataService.quizQuestions.length;


			if(dataService.quizQuestions[vm.activeQuestion].selected !== null){
				numQuestionsAnswered++;
				if(numQuestionsAnswered >= quizLength){

				}
			}
			vm.setActiveQuestion();
		} 

	}


})();