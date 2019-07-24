// Rules
var rule1 = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.digikey.ca', schemes: ['https'] }, 
        })
    ],
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

// Background script
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([rule1]);
    });
});