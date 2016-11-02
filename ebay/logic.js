// Initialize Firebase
  	var config = {
    	apiKey: "AIzaSyCGhngM5f29qRCDhO7bQXxVB3c4m-sOOHI",
    	authDomain: "new-project-5e1e6.firebaseapp.com",
    	databaseURL: "https://new-project-5e1e6.firebaseio.com",
    	storageBucket: "new-project-5e1e6.appspot.com",
    	messagingSenderId: "913310847677"
  	};
  	firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-("

var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// 
// At the initial load, get a snapshot of the current data.
database.ref().on("value", function(snapshot) {

	// If Firebase has a highPrice and highBidder stored (first case)
	if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

		// Set the initial variables for highBidder equal to the stored values.
		var initialBid = snapshot.val().highPrice;
		var initialBidder = snapshot.val().highBidder;

		// Change the HTML to reflect the initial value
		$("#highestBidder").html(snapshot.val().highBidder);
		$("#highestPrice").html(snapshot.val().highPrice);

		// Print the initial data to the console.
		console.log(snapshot.val());

	}

	// Keep the initial variables for highBidder equal to the initial values
	else{

		var highPrice = initialBid;
		var highBidder = initialBidder;

		// Change the HTML to reflect the initial value
		$("#highestBidder").html(snapshot.val().highBidder);
		$("#highestPrice").html(snapshot.val().highPrice);

		// Print the initial data to the console.
		console.log(snapshot.val());

	}



// If any errors are experienced, log them to console. 
}, function (errorObject) {

  	console.log("The read failed: " + errorObject.code);

});

// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#submitBid").on("click", function() {

	// Get the input values
	var bidderName = $("#bidderName").val().trim();
	var bidderPrice = $("#bidderPrice").val().trim();

	// Log the Bidder and Price (Even if not the highest)
	console.log(bidderName);
	console.log(bidderPrice);

	if(bidderPrice > highPrice) {

		// Alert 
		alert("You are now the highest bidder.");

		// Save the new price in Firebase
		database.ref().set({
			highBidder: bidderName,
			highPrice: bidderPrice
		})

		// Log the new High Price
		console.log(bidderPrice);

		// Store the new high price and bidder name as a local variable (could have also used the firebase variable)
		var highestBidder = bidderName;
		var highestPrice = bidderPrice;

		// Change the HTML to reflect the new high price and bidder
		$("#highestBidder").html(highestBidder);
		$("#highestPrice").html(highestPrice);


	}

	else{

		// Alert
		alert("Sorry that bid is too low. Try again.");	
	}

	// Return False to allow "enter"
	return false;
});