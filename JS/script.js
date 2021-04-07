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
      
    // on li click, go to next question or display score
    $('#question-page').click(function() {
        if (event.target.matches('li')) {
          var lastQuestion = questions.length-1;
    
          if (currentQuestion == lastQuestion) {
            handleQuestion(event.target.innerText);
    
            quizDone = true; // the user is done
            handleScores();
          }
    
          else {
            handleQuestion(event.target.innerText)
    
            currentQuestion++ // next question
            renderQuestion();
          }
        }
      })
    
    
      // generate questuion
      function renderQuestion() {
        var question = questions[currentQuestion];
    
        $('#question-page').show() // show question page
    
        $('#question').text(question.title) // add value to the title
    
        $('#responses').html(''); // delete all the li
    
        var responses = question.choices;
        responses.forEach((text, index) => {
          var li = document.createElement('li');
    
          li.innerText = text; // add some text to the li
          $('#responses').append(li);
        });
      }
    
    
      // handles if user selection is right or wrong
      function handleQuestion(selection) {
        var answer = questions[currentQuestion].answer;
    
        if (selection == answer) {
          score++
          showAlert('Right', 400);
        }
    
        else {
          showAlert('Wrong', 400);
        }
      }
    
    
      function setTimer() {
        var sec = 20;
        var interval = setInterval(function functionName() {
          sec--
          $('#timer').html(sec);
    
          if (sec == 0) {
            clearInterval(interval);
            handleScores();
    
            showAlert('Time is over!', 1200, 'red');
          }
    
          if (quizDone) {
            clearInterval(interval);
          }
        }, 1000)
      }
    
    
      function showAlert(text, time, bcolor) {
        $('#alert').show();
        $('#alert').text(text);
    
        // timer done show background in red
        $('#alert').css('background-color', bcolor);
    
        setTimeout(function() {
          $('#alert').hide();
        }, time);
      }
    
      $('#view-scores').click(function() {
        // $('#view-scores').html('');
    
        populateScores();
        handleScreens();
      }) // on button click show scores
    
      var localRecords = JSON.parse(localStorage.getItem('records'));
      var records;
    
      if (localRecords) {
        records = localRecords;
      }
    
      else {
        records = [];
      }
    
      function handleScores() {
        var record = {};
        record.user = currentUser;
        record.result = score;
        records.push(record);
    
        localStorage.setItem('records', JSON.stringify(records)); // save all the information to local storage
    
        // screens
        handleScreens();
    
        $('#scores-list').html(''); // erase all previous scores
    
        populateScores();
      }
    
      function populateScores() {
        $('#scores-list').empty();
    
        records.forEach(function(object) {
          $('#scores-list').append("<li>"+object.user+" - "+object.result+"/5</li>"); // add values to the list
        });
      }
    
      function handleScreens() {
        $('#start-page').hide(); // hide start page
        $('#question-page').hide(); // hide questions
        $('#highscores-page').show(); // show scores
      }
    })