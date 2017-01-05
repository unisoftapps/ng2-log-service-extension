console.info('monitoring...');


window.addEventListener('logMonitorEvent', function(e) {

    console.log('got it!', e);
    var port = chrome.runtime.connect({name: 'ng2-log-service-monitor'});
    port.postMessage({
        type: 'logMonitorEvent',
        event: e.detail
    });
});


window.addEventListener('debugLauncher', function(e) {

    var port = chrome.runtime.connect({name: 'ng2-log-service-monitor'});
    port.postMessage(e.detail);

    console.log(e);
});

chrome.extension.onMessage.addListener(function (message, sender) {
    console.log("In content Script Message Recieved is " + message);
    //Send needed information to background page
    chrome.extension.sendMessage("My URL is" + window.location.origin);
});