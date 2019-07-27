// Get instance of the database
var db = firebase.firestore();

// Test function 
function debug_add() {
    db.collection("components").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log('${doc.id} => ${doc.data()}');
        });
    });
}

function addComponentToFirestoreDB_DIGIKEY(component) {
    db.collection("components").doc(component.man_part_number).set({
        man_part_number: component.man_part_number,
        inserted_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        updated_timestamp: null
    }, {merge: true})
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        debug_add();        

    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// Method to add content to database
function addComponent_DIGIKEY() {
    chrome.storage.sync.get(['component_DIGIKEY'], (result) => {
        let component = result.component_DIGIKEY;
        addComponentToFirestoreDB_DIGIKEY(component);
    });
}

// Get button element from the DOM
let addComponentButton = document.getElementById("addComponentButton");

// Wait for user to click the addComponentButton button
addComponentButton.onclick = () => {
    addComponent_DIGIKEY();
}