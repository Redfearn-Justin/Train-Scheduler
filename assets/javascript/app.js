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
  
      // variables
  
      var userTrainName = $("#trainNameInput").val().trim();
  
      var userDestination = $("#destinationInput").val().trim();
  
      //taking the time value and formatting it to epoch time, and "HH:mm" standard
  
      var userTrainTime = moment( $("#trainTimeInput").val().trim(), "HH:mm").format("X"); // might need to append
  
      //=============================================
  
      var userFrequency = $("#frequencyInput").val().trim();
  
  
      // object to house user input; subsequently send to firebase
  
      var totalUserInput = {
        Name: userTrainName,
        Destination: userDestination,
        Time: userTrainTime,
        Frequency: userFrequency,
      };
  
      console.log(totalUserInput);
  
      //upload object to firebase
  
      database.ref().push(totalUserInput);
  
  
      //function to clear fields after user input
  
      clearFields();
  
  
      //function to push data that's on DB to website
  
      database.ref().on("child_added", function(snapshot) {
  
        //storing information into variables
  
        var databaseName = snapshot.val().Name;
  
        var databaseDestination = snapshot.val().Destination;
  
        var databaseTime = snapshot.val().Time;
  
        var databaseFrequency = snapshot.val().Frequency;
  
        //verifying results in console
  
        console.log(databaseName + " " + databaseDestination + " " + databaseTime + " " + databaseFrequency);
  
        //enter math calcuations below, to get the difference between
  
  
      });
  
      //add error functionality to above function
  
  
  
    });
  
    // OTHER NOTES
  
  
    //   Create the new row
    // var newRow = $("<tr>").append(
    //   $("<td>").text(empName),
    //   $("<td>").text(empRole),
    //   $("<td>").text(empStartPretty),
    //   $("<td>").text(empMonths),
    //   $("<td>").text(empRate),
    //   $("<td>").text(empBilled)
    // );
    //
    // // Append the new row to the table
    // $("#employee-table > tbody").append(newRow);
  });
  