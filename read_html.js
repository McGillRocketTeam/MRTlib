// Methods to get web page content by searching the corresponding tag name

/**
 * Method to get the manufacturer part number from Digikey Electronics
 * @returns {String}
 */
function getComponent_DIGIKEY() {
    let manPartNumber = document.querySelector("#product-overview tr:nth-child(3) td").innerText;
    let manufacturer = document.querySelector("#product-overview tbody tr td h2 span a span[itemprop='name']").innerText;
    let category = document.querySelector(".breadcrumbs").querySelectorAll("a")[1].innerText;
    let description = document.querySelector("#product-overview tbody tr td h3[itemprop='description']").innerText;
    return {man_part_number: manPartNumber, manufacturer: manufacturer, category: category, description: description};
}

window.onload = function () {
  let component_DIGIKEY = getComponent_DIGIKEY();

  // Read from webpage and store product details in js variables
  chrome.storage.sync.set({'component_DIGIKEY': component_DIGIKEY}, function() {
      console.log('DIGIKEY component is: ' + JSON.stringify(component_DIGIKEY));
  });
}
