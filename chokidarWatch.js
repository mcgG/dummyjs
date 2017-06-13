var chokidar = require('chokidar');
var fs = require('fs');
var userDAO = require('./DAO/userDAO');

var watcher = null;
var ready = false;

var logfile = 'log.log';
function fsExistsSync() {
    try {
        fs.accessSync(logfile, fs.F_OK);    
    } catch (e) {
        fs.writeFile(logfile, 'w', (err)=>{
            if (err) {
                console.log(err)
                return false    
            }
            console.log('File created /log.log');
        });       
    }
}

var writeStream = fs.createWriteStream(logfile);

//module.exports.watch = ()=>{
    
    function addFileListener(path_) {
        if (ready) {
            var msg = 'File ' + path_ + ' has been added ['+new Date+']\n'; 
            console.log(msg);    
            fs.appendFileSync(logfile, msg);
            userDAO.add({
                fileName: path_.split('/').reverse()[0],
                path: path_
            });
        }    
    }    

    function addDirectoryListener(path) {
        if (ready) {
            var msg = 'Directory ' + path + ' has been added ['+new Date+']\n';
            console.log(msg);
            fs.appendFileSync(logfile, msg);
        }    
    }

    function fileChangeListener(path_) {
        var msg = 'File ' + path_ + ' has been changed ['+new Date+']\n';
        console.log(msg);
        fs.appendFileSync(logfile, msg);
    }

    function fileRemovedListener(path_) {
        var msg = 'File ' + path_ + ' has been removed ['+new Date+']\n';
        console.log(msg);
        fs.appendFileSync(logfile, msg);
    }
    function directoryRemovedListener(path) {
        var msg = 'Directory ' + path + ' has been removed ['+new Date+']\n'; 
        console.log(msg);
        fs.appednFileSync(logfile, msg);
    }

    if (!watcher) {
        watcher = chokidar.watch('./uploads');    
    }
    watcher
        .on('add', addFileListener)
        .on('addDir', addDirectoryListener)
        .on('change', fileChangeListener)
        .on('unlink', fileRemovedListener)
        .on('unlinkDir', directoryRemovedListener)
        .on('error', (err)=>{
            console.log('Error happened', err);    
        })
        .on('ready', ()=>{
            console.log('Initial scan complete. Ready for changes.');
            ready = true;
        })
//} 
