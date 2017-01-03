console.info('monitoring...');


window.addEventListener('debugLauncher', function(e) {

    var port = chrome.runtime.connect({name: 'ng2-log-service-monitor'});
    port.postMessage({
        type: 'debugLauncher',
        message: e.detail,
        object: null
    });

    

    console.log(e);
});

chrome.extension.onMessage.addListener(function (message, sender) {
    console.log("In content Script Message Recieved is " + message);
    //Send needed information to background page
    chrome.extension.sendMessage("My URL is" + window.location.origin);
});