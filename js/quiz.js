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
		vm.selectAnswer = selectAnswer;
		vm.finalizeAnswers = finalizeAnswers;
		vm.activeQuestion = 0;
		vm.error = false;
		vm.finalize = false;

		var numQuestionsAnswered = 0;

		function setActiveQuestion(index) {
			if(index==undefined){
				var breakOut = false;
				var quizLength = dataService.quizQuestions.length - 1;

				while (!breakOut){
					vm.activeQuestion = vm.activeQuestion < quizLength? ++vm.activeQuestion: 0;
					if(vm.activeQuestion===0){
						vm.error = true;
					}


					if(dataService.quizQuestions[vm.activeQuestion].selected===null){
						breakOut = true;
					}
				}
			}else{
				vm.activeQuestion = index;
			}
			
		}

		function questionAnswered() {

			var quizLength = dataService.quizQuestions.length;


			if(dataService.quizQuestions[vm.activeQuestion].selected !== null){
				numQuestionsAnswered++;
				if(numQuestionsAnswered >= quizLength){
					for(var i = 0; i<quizLength; i++){
						if(dataService.	quizQuestions[i].selected===null){
							setActiveQuestion(i);
							return;
						}
						vm.error =false;
						vm.finalize = true;
						return;
					}
				}
			}
			vm.setActiveQuestion();
		} 

		function selectAnswer(index) {
			dataService.quizQuestions[vm.activeQuestion].selected = index;
		}

		function finalizeAnswers() {
			vm.finalize = false;
			console.log('1');
			numQuestionsAnswered = 0;
			vm.activeQuestion = 0;
			quizMetrics.markQuiz();
						console.log('2');

			quizMetrics.changeState("quiz",false);
						console.log('4');

			quizMetrics.changeState("results",true);
						console.log('5');

		}

	}


})();