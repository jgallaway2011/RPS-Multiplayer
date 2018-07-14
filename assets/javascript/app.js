$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyAbLouKWlWrns9du-aRJM8I66UHegjGvVg",
    authDomain: "rps-multiplayer-99efa.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-99efa.firebaseio.com",
    projectId: "rps-multiplayer-99efa",
    storageBucket: "rps-multiplayer-99efa.appspot.com",
    messagingSenderId: "1075870865234"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  var playerOneName = "Waiting for Player 1";
  var playerTwoName = "Waiting for Player 2";
  var wins = 0;
  var losses = 0;

  database.ref("1").set({
    playerOneName: playerOneName,
    wins: wins,
    losses: losses
  });

  database.ref("2").set({
    playerTwoName: playerTwoName,
    wins: wins,
    losses: losses
  });

  $("#playerOneText").text(playerOneName);
  $("#playerTwoText").text(playerTwoName);

  $("#submit-name").on("click", function () {
    event.preventDefault();

    database.ref().on("value", function (snapshot) {


      if (playerOneName = "Waiting for Player 1") {
        var playerOneName = $("#name-input").val().trim();
        database.ref("1").update({
          playerOneName: playerOneName
        });
          $("#playerOneText").text(snapshot.playerOneName);
      } else if (snapshot.playerTwoName = "Waiting for Player 2") {
        var playerTwoName = $("#name-input").val().trim();
        database.ref("/2").update({
          playerTwoName: playerTwoName
        });
        $("#playerTwoText").text(snapshot.playerTwoName);
      } else {
        alert("Wait your turn please!")
      }
      // If any errors are experienced, log them to console.
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

  });

});
