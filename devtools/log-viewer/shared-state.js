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

var dateFormats = [
    {
        format: 'MMMM Do YYYY, h:mm:ss a',
        text: 'January 4th 2017, 4:00:32 pm',
        value: 1,
        id: 'dateformat-full'
    },
    {
        format: null,
        text: '2017-01-04T16:08:48-05:00',
        value: 2,
        id: 'dateformat-iso'        
    }
]


var sharedState = {
    firstTime: true,
    scrollbarAtBottom: false,
    logs: [],
    filteredLogs: function() {
        var selectedLogLevel = this.settings.selectedLogLevel;
        var results = this.logs.filter(function(log) {
            return (log.level >= selectedLogLevel);
        });
        return results;
    },
    showLogs: true,
    dateFormats: dateFormats,
    logLevels: levels,
    settings: {
        expandJson: true,
        showNamespace: true,
        showLogLevel: true,
        showTimestamp: true,
        prependLogs: false,
        selectedLogLevel: 1,
        selectedDateFormat: 1,
        maxLogs: 40
    }
};


function addLog(log) {

    //console.log('ADD_LOG FUNC CALLED', log);

    log.date = moment().format(dateFormats[0].format);
    log.dateIso = moment().format();

    log.levelLabel = levels.filter(function(l) {
        return (l.text === log.level || l.value === log.level)
    })[0];

    if(!log.levelLabel) {
        log.levelLabel = levels[0];
    }

    // prepend log or append them
    if(sharedState.settings.prependLogs) {
        sharedState.logs.unshift(log);
    }
    else {
        sharedState.logs.push(log);
    }

    setTimeout(function() {

        $('code').each(function(i, block) {
            if(!$(block).hasClass('hljs')) {
                hljs.highlightBlock(block);
            }
        });

        if(!sharedState.settings.prependLogs) {
            if($('#logs').height() > $(window).height() && sharedState.firstTime) {
            //console.log('YES');
            sharedState.firstTime = false;
            window.scrollTo(0,document.body.scrollHeight);}
            if(sharedState.scrollbarAtBottom) {
                window.scrollTo(0,document.body.scrollHeight);
            }
        }

    }, 0);
}

// initial setup for debugging purposes


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


var INTERVAL = 2000;

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