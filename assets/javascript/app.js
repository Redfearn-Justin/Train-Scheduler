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

    //upload object to firebase

    database.ref().push(totalUserInput);


    //function to clear fields after user input

    clearFields();


  });

  //function to push data that's on DB, to website

  database.ref().on("child_added", function(snapshot) {

    //storing information from DB into variables

    var databaseName = snapshot.val().Name;

    var databaseDestination = snapshot.val().Destination;

    var databaseFrequency = snapshot.val().Frequency;

    var databaseTime = snapshot.val().Time;


    //enter math calcuations below, for both "Time" and "Mins Away"

    var timeConvert = moment(databaseTime, "HH:mm"); //turn the time value into the desired format

    var timeDifference = moment().diff(moment(timeConvert), "minutes"); // this is to get the time difference from the databaseTime variable - in minutes

    var modulusRemainder = timeDifference % databaseFrequency; //this is to get the modulus remainder from the time difference, based on the frequency input

    var minsAway = databaseFrequency - modulusRemainder; // this is to get the "mins away" the train is by subtracting the modulus remainder from the database frequency input

    var nextArrivalTime = moment().add(minsAway, "minutes"); // add the time difference, in minute format, to the variable


    var newEntry = $("<tr>").append(

      $("<th>").text(databaseName),
      $("<td>").text(databaseDestination),
      $("<td>").text(databaseFrequency),
      $("<td>").text(moment(nextArrivalTime).format("HH:mm")), //formatting the time to read in 24-hour format
      $("<td>").text(minsAway),

    );

    $("table").append(newEntry);


    }, function(errorObject) {

    console.log("The read Failed: " + errorObject.code);

  }); //close database ref function

}); // close document ready