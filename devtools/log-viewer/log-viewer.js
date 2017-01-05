$(document).ready(function(){
    //$('.collapsible').collapsible();
});

  $('body').on('click', '#show-settings', showSettings);
  $('body').on('click', '#btn-save', saveSettings);
  $('body').on('change', '#log-level-box', changedLogLevel);


var dateFormats = [
    {
        format: 'MMMM Do YYYY, h:mm:ss a',
        label: 'January 4th 2017, 4:00:32 pm'
    },
    {
        format: null,
        label: '2017-01-04T16:08:48-05:00'
    },
    {
        format: 'relative',
        label: 'a few moments ago'
    }
]

function addLog(log) {

    console.log('ADD_LOG FUNC CALLED', log);

    log.date = moment().format(dateFormats[0].format);
    vue.logs.push(log);
    setTimeout(function() {
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
        //window.scrollTo(0,document.body.scrollHeight);
    }, 0);
}

var levels = [
    {
        text: 'All',
        value: 1
    },
    {
        text: 'Debug',
        value: 2,
        active: true
    },
    {
        text: 'Info',
        value: 3
    },
    {
        text: 'Warn',
        value: 4
    },
    {
        text: 'Error',
        value: 5
    },
    {
        text: 'Fatal',
        value: 6
    }
];

All = 1,
  Debug = 2,
  Info = 3,
  Warn = 4,
  Error = 5,
  Fatal = 6

var vue = new Vue({
    el: '#vue',
    data: {
        logs: [],
        title: 'ng2-log-service monitor',
        showLogs: true
    }
});



addLog({
    message: 'Test message 1',
    namespace: 'All',
    data: {
        title: 'Monitor',
        test: [1,2,3],
        nested: {
            asdfasdf: 'adsfasdf',
            test: [2,3, 'as']
        }
    }
});

addLog({
    message: 'Test message 2',
    namespace: 'Landing Page',
    data: {
        title: 'Monitor',
        test: [1,2,3]   
    }
});


// setInterval(function() {
//     addLog({
//         message: 'New message',
//         data: {
//             hello: 'world'
//         },
//         type: 'Other'
//     })
// }, 3000);

var settings = new Vue({
    el: '#settings',
    data: {
        logLevels: levels,
        showSettings: false,
        enableLogging: true,
        expandJson: true,
        showNamespace: true,
        clearLogsAutomatically: true,
        showTimestamp: true,
        autoscrollToLatestLog: true,
        prependLogs: false,
        selectedLogLevel: 4,
        maxLogs: 40
    }
})

function changedLogLevel(e) {
    settings.selectedLogLevel = parseInt(e.value);
    console.log('here');
}

function showSettings() {
    //console.log('show settings called');
    vue.showLogs = !vue.showLogs;
    settings.showSettings = !settings.showSettings
    if(vue.showLogs) {
        setTimeout(function() {
            hljs.initHighlighting.called = false;
            hljs.initHighlighting();
        }, 0);
    }
}

function restoreSettings(data) {
    try {
        console.log('trying to restore settings');
        settings.enableLogging = data.enableLogging;
        settings.expandJson = data.expandJson;
        settings.showNamespace = data.showNamespace;
        settings.clearLogsAutomatically = data.clearLogsAutomatically;
        settings.showTimestamp = data.showTimestamp;
        settings.autoscrollToLatestLog = data.autoscrollToLatestLog;
        settings.prependLogs = data.prependLogs;
        settings.selectedLogLevel = data.selectedLogLevel;
        settings.maxLogs = data.maxLogs;
        console.log('restored!');
    }
    catch(e) {
        console.error(e);
    }
}

function saveSettings() {

    var model = {
        enableLogging: settings.enableLogging,
        expandJson: settings.expandJson,
        showNamespace: settings.showNamespace,
        clearLogsAutomatically: settings.clearLogsAutomatically,
        showTimestamp: settings.showTimestamp,
        autoscrollToLatestLog: settings.autoscrollToLatestLog,
        prependLogs: settings.prependLogs,
        selectedLogLevel: settings.selectedLogLevel,
        maxLogs: parseInt(settings.maxLogs)
    };

    try {
        chrome.storage.sync.set({
            'ng2-log-service-monitor-settings': model
        }, function() {
            console.log('saved!');
            showSettings();
        });
    }
    catch(e) {
        console.error(e);
    }
    console.log('saved settings', model);
}