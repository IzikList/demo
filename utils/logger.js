/**
 * Created by Ilan on 31/07/2017.
 */


var Logger = function () {

    //color list at https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
    var colors = {
        "reset"     : " \x1b[0m ",
        "red"       : " \x1b[31m ",
        "green"     : " \x1b[1m\x1b[32m ",
        "yellow"    : " \x1b[33m ",
        "magenta"   : " \x1b[35m ",
        "blue"      : " \x1b[36m ",
        "white"     : " \x1b[37m ",
        "blink"     : " \x1b[7m" 
    };

    var debug = function(req, message, context){
        var timestamp = new Date();
        var callerName = arguments.callee.caller.name;
        var level = "DEBUG";
        writeLog(callerName, level, message, req, context);
    };
    
    var warning = function(req, message, context){
        var timestamp = new Date();
        var callerName = arguments.callee.caller.name;
        var level = "WARNING";
        writeLog(callerName, level, message, req, context);
    };
    
    var error = function(req, message, context){
        var timestamp = new Date();
        var callerName = arguments.callee.caller;
        var level = "ERROR";
        writeLog(callerName, level, message, req, context);
    };
    
    var route = function(req, mac){
        var timestamp = new Date();
        var callerName = arguments.callee.caller;
        var level = "ROUTE";
        var message = mac + " " + colors.green + (req.method + " ").slice(0,4) + colors.reset + ": " + req._parsedUrl.pathname;
        writeLog(callerName, level, message, req);
    };
    
    var writeLog = function(caller, level, message, req, context){
        var timestamp = new Date();
        var callName = (caller.name ? caller.name.substr(0,40) : null) || context;
        var err = new Error();
        var fileName = "";
        if (err.stack) {
            var stack = err.stack.split('\n');
            var item = stack[3];
            var file = item.substr(item.indexOf('(') > 0 ? item.indexOf('(') : 7);
            var splitPath = file.split(file.indexOf('\\') > -1 ? '\\' : '/');
            var actualName = splitPath[splitPath.length - 1];
            fileName = splitPath[splitPath.length - 2] + '/' + actualName.substr(0, actualName.lastIndexOf(":"));
        }
        var requestId = req ? ( "(" + req.requestId + ")" ) : " ";
        var sessionId = (req && req.sessionId) ? req.sessionId : "";
        var color = "";
        switch(level){
            case 'ERROR':
                color = colors.red + colors.blink;
                break;
            case 'WARNING':
                color = colors.magenta;
                break;
            case 'DEBUG':
                color = colors.yellow;
                break;
            case 'ROUTE':
                color = colors.blue;
        }
        console.log("=> " + timestamp.toLocaleString('en-AU',{"hour12": false}) + " * " + color + level + colors.reset + requestId + (sessionId != '' ? (' {s' + sessionId + '}') : '') + " [" + (callName ? (callName + " | ") : "") + fileName + "] " , message);
    };


    return {
        error: error,
        warning: warning,
        debug: debug,
        route: route
    };
};

module.exports = Logger;