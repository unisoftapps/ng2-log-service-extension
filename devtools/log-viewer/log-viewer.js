$(document).ready(function() {
    $(".dropdown-button").dropdown();
});

$('body').on('click', '.close-filter', function() {
    sharedState.filterValue = null;
    vue.searchValue = null;    
});

$('body').on('keyup', '#search', function() {

    if(sharedState.filterTimeout) {
        clearTimeout(sharedState.filterTimeout);
    }

    sharedState.filterTimeout = setTimeout(function() {
        sharedState.filterValue = vue.searchValue.trim();
        if(sharedState.filterValue === '') {
            sharedState.filterValue = null;
        }
        //console.log(sharedState.filterValue);
    }, sharedState.filterDelay);

});

$('body').on('click', '#show-settings', showSettings);
$('body').on('click', '#btn-save', saveSettings);
$('body').on('change', '#log-level-box', changedLogLevel);
$('body').on('click', '#clear-logs', function() {
    sharedState.logs = [];
    sharedState.firstTime = true;
});
$('body').on('click', '.selectable-level', function(e) {
    var value = parseInt($(e.currentTarget).attr('data-value'));
    sharedState.settings.selectedLogLevel = value;
});


var vue = new Vue({
    el: '#vue',
    data: {
        sharedState: sharedState,
        title: 'monitor',
        searchValue: null
    },
    computed: {
        filteredLogs: function() {
            setTimeout(function() {
                $('code').each(function(i, block) {
                    if(!$(block).hasClass('hljs')) {
                        hljs.highlightBlock(block);
                    }
                });
            }, 0);            
            return sharedState.filteredLogs();
        },
        activeLogLevel: function() {

            var match = sharedState.logLevels.filter(function(level) {
                return level.value === sharedState.settings.selectedLogLevel;
            })[0];

            return match;
        }
    }
});

var settings = new Vue({
    el: '#settings',
    data: {
        sharedState: sharedState
    }
});

function changedLogLevel(e) {
    settings.selectedLogLevel = parseInt(e.value);
    console.log('here');
}

function showSettings() {
    sharedState.showLogs = !sharedState.showLogs;
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
        expandJson: sharedState.settings.expandJson,
        showNamespace: sharedState.settings.showNamespace,
        showLogLevel: sharedState.settings.showLogLevel,
        showTimestamp: sharedState.settings.showTimestamp,
        prependLogs: sharedState.settings.prependLogs,
        selectedLogLevel: sharedState.settings.selectedLogLevel,
        selectedDateFormat: sharedState.settings.selectedDateFormat,
        maxLogs: parseInt(sharedState.settings.maxLogs)
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
        showSettings();
    }
    console.log('saved settings', model);
}


$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       //alert("bottom!");
       sharedState.scrollbarAtBottom = true;
   }
   else {
       sharedState.scrollbarAtBottom = false;       
   }
});