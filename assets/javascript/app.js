var playerOneName = "Waiting for Player 1";
var playerTwoName = "Waiting for Player 2";
var wins = 0;
var losses = 0;

var config = {
    apiKey: "AIzaSyCx-Bch_24M73NNlmrMeNn8OqeYBnQwRXM",
    authDomain: "timetable-e2d39.firebaseapp.com",
    databaseURL: "https://timetable-e2d39.firebaseio.com",
    projectId: "timetable-e2d39",
    storageBucket: "timetable-e2d39.appspot.com",
    messagingSenderId: "364187128718"
  };

firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();


database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored, update our client-side variables
  if (snapshot.child("playerOneName").exists() && snapshot.child("playerTwoName").exists()) {
    // Set the variables for highBidder/highPrice equal to the stored values.
    playerOneName = snapshot.val().playerOneName;
    playerTwoName = snapshot.val().playerTwoName;
  }

  // If Firebase does not have highPrice and highBidder values stored, they remain the same as the
  // values we set when we initialized the variables.
  // In either case, we want to log the values to console and display them on the page.
  console.log(playerOneName);
  console.log(playerTwoName);
  $("#playerOneText").text(playerOneName);
  $("#playerTwoText").text(playerTwoName);

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#submit-name").on("click", function(event) {
  event.preventDefault();

  if (snapshot.child("playerTwoName").exists()) {
    var playerTwoName = $("#name-input").val().trim();
    console.log(playerTwoName);
    database.ref().set({
      playerTwoName : playerTwoName,
      wins : wins,
      losses : losses
    });
  } else if (snapshot.child("playerOneName").exists() && snapshot.child("playerTwoName").exists()) {
     alert("Wait your turn!")
  } else {
    var playerOneName = $("#name-input").val().trim();
    console.log(playerOneName);
    database.ref().set({
      playerOneName : playerOneName,
      wins : wins,
      losses : losses
    });
  }
});