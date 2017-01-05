console.log('background here!');

// var port = chrome.runtime.connect({name: 'ng2-log-service-monitor'});

// port.onMessage.addListener(function(msg) {
//     console.log('got message in background.js!', msg);
// });



var ports = [];

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name !== "ng2-log-service-monitor") return;
    console.log('port name: '+port.name);
    ports.push(port);
    // Remove port when destroyed (eg when devtools instance is closed)
    port.onDisconnect.addListener(function() {
        var i = ports.indexOf(port);
        if (i !== -1) ports.splice(i, 1);
    });
    port.onMessage.addListener(function(msg) {
        // Received message from devtools. Do something:
        console.log('got message inside background.js!', msg.event);
        notifyDevtools(msg.event);
    });
});
// Function to send a message to all devtools.html views:
function notifyDevtools(msg) {
    console.log('notify dev tools', ports);
    ports.forEach(function(port) {
        port.postMessage(msg);
    });
}

// chrome.runtime.onConnect.addListener(function(port) {

//     console.assert(port.name === 'ng2-log-service-monitor');

//     port.onMessage.addListener(function(msg) {
//         console.log('got message inside background.js!', msg);
//     });

// });