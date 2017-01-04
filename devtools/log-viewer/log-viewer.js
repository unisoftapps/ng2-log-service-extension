

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
        label: 'All',
        value: 1
    },
    {
        label: 'Debug',
        value: 2
    },
    {
        label: 'Info',
        value: 3
    },
    {
        label: 'Warn',
        value: 4
    },
    {
        label: 'Error',
        value: 5
    },
    {
        label: 'Fatal',
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

var settings = new Vue({
    el: '#settings',
    data: {
        logLevels: levels,
        showSettings: false
    }
})

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
