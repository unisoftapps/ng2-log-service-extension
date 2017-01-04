

$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.modal').modal();
  });

function addLog(log) {
    log.date = moment().format();
    vue.logs.push(log);
    setTimeout(function() {
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
        //window.scrollTo(0,document.body.scrollHeight);
    }, 0);
}

var vue = new Vue({
    el: '#vue',
    data: {
        logs: [],
        title: 'ng2-log-service monitor'
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
// }, 1000);