window.addEventListener('logMonitorEvent', function(e) {
    var port = chrome.runtime.connect({name: 'ng2-log-service-monitor'});
    port.postMessage({
        type: 'logMonitorEvent',
        event: e.detail
    });
});