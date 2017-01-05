var INTERVAL = 2000;

var state = {
    firstTime: true,
    scrollbarAtBottom: false
};

$(document).ready(function() {
    //$('.collapsible').collapsible();
});

$('body').on('click', '#show-settings', showSettings);
$('body').on('click', '#btn-save', saveSettings);
$('body').on('change', '#log-level-box', changedLogLevel);
$('body').on('click', '#clear-logs', function() {
    vue.logs = [];
    state.firstTime = true;
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

    //console.log('ADD_LOG FUNC CALLED', log);

    log.date = moment().format(dateFormats[0].format);
    log.levelLabel = levels.filter(function(l) {
        return (l.text === log.level || l.value === log.level)
    })[0];

    if(!log.levelLabel) {
        log.levelLabel = levels[0];
    }

    // prepend log or append them
    if(settings.prependLogs) {
        vue.logs.unshift(log);
    }
    else {
        vue.logs.push(log);
    }

    setTimeout(function() {

        $('code').each(function(i, block) {
            if(!$(block).hasClass('hljs')) {
                hljs.highlightBlock(block);
            }
        });

        if(!settings.prependLogs) {
            if($('#logs').height() > $(window).height() && state.firstTime) {
            //console.log('YES');
            state.firstTime = false;
            window.scrollTo(0,document.body.scrollHeight);            
        }

            if(state.scrollbarAtBottom) {
                window.scrollTo(0,document.body.scrollHeight);
            }
        }

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

var vue = new Vue({
    el: '#vue',
    data: {
        logs: [],
        title: 'monitor',
        showLogs: true
    }
});

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
        prependLogs: true,
        selectedLogLevel: 1,
        maxLogs: 40
    }
});

addLog({
    message: 'Test message 1',
    namespace: 'All',
    level: 1,
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
    level: 2
});

addLog({
    message: 'Test message 2',
    namespace: 'Landing Page',
    level: 3
});

addLog({
    message: 'Test message 2',
    namespace: 'Landing Page',
    level: 4
});

addLog({
    message: 'Test message 2',
    namespace: 'Landing Page',
    level: 5
});


addLog({
    message: 'O Crap',
    namespace: 'Landing Page',
    level: 6
});

// addLog({
//     message: 'Test message 2',
//     namespace: 'Landing Page',
//     data: {
//         title: 'Monitor',
//         test: [1,2,3]   
//     }
// });

// addLog({
//     message: 'Test message 2',
//     namespace: 'Landing Page',
//     data: {
//         title: 'Monitor',
//         test: [1,2,3]   
//     }
// });


setInterval(function() {
    addLog({
        level: 2,
        message: 'A crazy message right here',
        data: {
            hello: 'world',
            test: 234234234,
            a: null,
            b: {
                c: []
            }
        },
        namespace: 'Some:Cool:Namespace'
    })
}, INTERVAL);



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


$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       //alert("bottom!");
       state.scrollbarAtBottom = true;
   }
   else {
       state.scrollbarAtBottom = false;       
   }
   //console.log(state.scrollbarAtBottom);
});