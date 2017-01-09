let fs = require('fs-extra');
let dist_path = 'dist';

// create and empty the dist folder first
fs.emptyDirSync(dist_path);

// copy required dirs and their contents
fs.copySync('background-scripts', dist_path+'/background-scripts');
fs.copySync('content-scripts', dist_path+'/content-scripts');
fs.copySync('css', dist_path+'/css');
fs.copySync('devtools', dist_path+'/devtools');
fs.copySync('fonts', dist_path+'/fonts');
fs.copySync('js', dist_path+'/js');


// copy require files
fs.copySync('icon.png', dist_path+'/icon.png');
fs.copySync('manifest.json', dist_path+'/manifest.json');
