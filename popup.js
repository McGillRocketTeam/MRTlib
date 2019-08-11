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

/**
 * Method to add DIGIKEY object component to database collection
 * @param {Object} component 
 * @param {int} quantity 
 * @param {String} value
 * @param {String} package
 */
function addComponentToFirestoreDB_DIGIKEY(component, quantity, value, package) {
    db.collection("components").doc(component.man_part_number).set({
        man_part_number: component.man_part_number,
        manufacturer: component.manufacturer,
        category: component.category,
        value: value,
        package: package,
        description: component.description,
        quantity: quantity,
        date_created: firebase.firestore.FieldValue.serverTimestamp(),
        user: firebase.auth.user
    }, {merge: true})
    .then(function(docRef) {
        console.log("Document successfully written!");
        debug_add();  
        alert("Component successfully added to database!");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        alert("Error adding component to database! Remember, you must have a valid McGill student email address and you must have verified your email address using the link that was sent.");
    });
}

/**
 * Method to retrieve data from chrome storage and add object to DB
 * @param {int} quantity 
 * @param {String} value
 * @param {String} package
 */
function addComponent_DIGIKEY(quantity, value, package) {
    chrome.storage.sync.get(['component_DIGIKEY'], (result) => {
        let component = result.component_DIGIKEY;
        addComponentToFirestoreDB_DIGIKEY(component, quantity, value, package);
    });
}

// Get button element from the DOM
let addComponentButton = document.getElementById("addComponentButton");

// Wait for user to click the addComponentButton button
addComponentButton.onclick = () => {
    let quantity = document.getElementById("componentQuantity").value;
    let value = document.getElementById("componentValue").value;
    let package = document.getElementById("componentPackage").value;
    
    // Check to see if package variable was assigned a value
    if (package == "") {
        package = "null_string";
    }
    
    try {
        if (quantity > 0 && value != "") {
            addComponent_DIGIKEY(quantity, value, package);
        } else {
            alert("Remember, you must enter a valid component quantity and value!");
        }
    
        // Reset the form
        document.getElementById("input-form").reset();
    } catch (error) {
        console.log(error);
        alert("There was an unknown error. Please try again.");
    }


}