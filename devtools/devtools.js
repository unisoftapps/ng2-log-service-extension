chrome.devtools.panels.create('Monitor', 
    'icon.png',
    'devtools/log-viewer/log-viewer.html', 
    function(panel) {
        console.log('panel created!', panel);

        var _window; // Going to hold the reference to panel.html's `window`

        var data = [];
        var port = chrome.runtime.connect({
            name: 'ng2-log-service-monitor'
        });
        port.onMessage.addListener(function(msg) {

            console.log('i got a message!', msg);

            // Write information to the panel, if exists.
            // If we don't have a panel reference (yet), queue the data.
            if (_window) {
                _window.addLog(msg);
            } else {
                data.push(msg);
            }
        });

        panel.onShown.addListener(function tmp(panelWindow) {
            console.log('onShown');
            
            panel.onShown.removeListener(tmp); // Run once only
            _window = panelWindow;

            // Release queued data
            var msg;
            while (msg = data.shift()) 
                _window.addLog(msg);
            // Just to show that it's easy to talk to pass a message back:
            _window.respond = function(msg) {
                port.postMessage(msg);
            };
        });

    }
);