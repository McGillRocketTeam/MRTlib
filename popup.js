// Get instance of the database
var db = firebase.firestore();

// Method to add content to database
function addContent() {
    // TODO: Remove test code
    db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// Get button element from the DOM
let addComponentButton = document.getElementById("addComponentButton");

// Wait for user to click the addComponentButton button
addComponentButton.onclick = function() {
    addContent();
}