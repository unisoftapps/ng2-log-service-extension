

$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('select').material_select();
  });


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
    log.date = moment().format(dateFormats[0].format);
    vue.logs.push(log);
    setTimeout(function() {
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
        //window.scrollTo(0,document.body.scrollHeight);
    }, 0);
}
// All = 1,
//   Debug = 2,
//   Info = 3,
//   Warn = 4,
//   Error = 5,
//   Fatal = 6

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
        showLogs: false
    }
});



addLog({
    message: 'Test message 1',
    type: 'All',
    data: {
        title: 'Monitor',
        test: [1,2,3],
        type: 'All'
    }
});

addLog({
    message: 'Test message 2',
    type: 'Landing Page',
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
        showSettings: true,
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
}

function showSettings() {
    console.log('show settings called');
    vue.showLogs = !vue.showLogs;
    settings.showSettings = !settings.showSettings
    if(vue.showLogs) {
        setTimeout(function() {
            hljs.initHighlighting.called = false;
            hljs.initHighlighting();
        }, 0);
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

    chrome.storage.sync.set({
        'ng2-log-service-monitor-settings': model
    }, function() {
        console.log('saved!');
    });

    console.log('saved settings', model);
}