console.log('log viewere js here!');

var logs = [];

logs.push({
    message: 'Test message',
    object: {
        test: [1,2,3]
    }
})

function addLog(log) {
    console.log('Adding log!', log);
    logs.push(log);
}