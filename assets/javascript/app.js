$(document).ready(function() {

  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyCzdKtw85lZnjf5VYD7AsuMJaWZQSI7rjU",
    authDomain: "assignment7db.firebaseapp.com",
    databaseURL: "https://assignment7db.firebaseio.com",
    projectId: "assignment7db",
    storageBucket: "assignment7db.appspot.com",
    messagingSenderId: "672762088729"
  };

  firebase.initializeApp(config);

  //Global variables

  var database = firebase.database();

  var currentTime = moment().format('LT'); //this is an attempt to eventually use the local time to alter table data


  //functions

  function clearFields() {

    $("input").each(function() {

      $(this).val("");

    });

  }



  //on-click functions

  $("#formSubmitButton").on("click", function() {

    event.preventDefault();

    // Local variables

    var userTrainName = $("#trainNameInput").val().trim();

    var userDestination = $("#destinationInput").val().trim();

    var userFrequency = $("#frequencyInput").val().trim();

    var userTrainTime = $("#trainTimeInput").val().trim();

    // object to house user input; subsequently send to firebase

    var totalUserInput = {

      Name: userTrainName,
      Destination: userDestination,
      Frequency: userFrequency,
      Time: userTrainTime,

    };

    console.log(totalUserInput);

    //upload object to firebase

    database.ref().push(totalUserInput);


    //function to clear fields after user input

    clearFields();


  }); 
  
  //function to push data that's on DB to website

  database.ref().on("child_added", function(snapshot) {

    //storing information into variables

    var databaseName = snapshot.val().Name;

    var databaseDestination = snapshot.val().Destination;

    var databaseFrequency = snapshot.val().Frequency;

    var databaseTime = snapshot.val().Time;

    //verifying results in console

    console.log(databaseName + " " + databaseDestination + " " + databaseTime + " " + databaseFrequency);

    //enter math calcuations below, for both "Time" and "Mins Away"

    databaseTime.moment()

    //var mthsPassed = moment().diff(empDate, "months");



    var newRow = $("<tr>").append( 

      $("<th>").text(databaseName), 
      $("<td>").text(databaseDestination), 
      $("<td>").text(databaseFrequency),
      $("<td>").text(), //enter new variable for math here
      $("<td>").text(), //enter new variable with math for 'minutes until'
    
    );

    $("table").append(newRow);


    }, function(errorObject) {

    console.log("The read Failed: " + errorObject.code);

  }); //close database ref function

}); // close document ready
  