$(document).ready(function() {
    var currentQuestion = 0;
    var quizDone = false; // tells the timer if the user is done
  
    var currentUser = '';
    var score = 0;
  
  
    // when the start button is clicked, start the quiz
    $('#start-button').click(function() {
      $('#start-page').hide(); // hide start page
  
      startQuiz();
    })
  
    // on goAgain click, start quiz again
    $('#replay-button').click(function() {
      $('#highscores-page').hide(); // hide scores
  
      // reset all values
      quizDone = false;
      currentQuestion = 0;
      score = 0;
      $('#user-name-input').text('');
  
      startQuiz(); // restart quiz
    })
  
    $('#home-button').click(function() {
      $('#highscores-page').hide(); // hide scores
      $('#start-page').show(); // show start page
  
      // reset all values
      quizDone = false;
      currentQuestion = 0;
      score = 0;
      $('#user-name-input').text('');
    })
  
  
    function startQuiz() {
      handleName();
    }
  
    // ask the user for its name
    function handleName() {
      $('#name-page').css('display', 'flex');
  
      $('#name-page').on('keypress', function(event) {
        if (event.which == 13) { // if enter key is clicked
          if (event.target.value) {
            currentUser = event.target.value; // save current user
            $('#name-page').hide(); // hide page
  
            renderQuestion(); // start quiz
            setTimer();
          }
        }
      })
    }