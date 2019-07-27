// Methods to get web page content by searching the corresponding tag name

/**
 * Method to get the manufacturer part number from Digikey Electronics
 * @returns {String}
 */
function getComponent_DIGIKEY() {
    let manPartNumber = document.querySelector("#product-overview tr td meta[itemprop='name']").getAttribute('content');
    return {man_part_number: manPartNumber};
}

let component_DIGIKEY = getComponent_DIGIKEY();

// Read from webpage and store product details in js variables
chrome.storage.sync.set({'component_DIGIKEY': component_DIGIKEY}, function() {
    console.log('DIGIKEY component is: ' + JSON.stringify(component_DIGIKEY));
});



