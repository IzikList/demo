var Logger = require('../utils/logger.js')();
var url = require('url');



var req = function (secure) {
    var https = secure ? require('https') : require('http');
    return {
        postWithHeaders: function (host, path, data, headers, callback) {
            if (typeof data != 'string')
                data = JSON.stringify(data);

            var str = '';
            var options = {
                host: host,
                path: path,
                method: 'POST',
                headers: {
                    'Content-Length': Buffer.byteLength(data),
                    'content-type': 'application/json'
                }
            };
            if(! secure){
                const myURL = new URL('http://' + host);
                if(myURL.port) { 
                    options.port = myURL.port;
                    options.host = myURL.hostname;
                }
            }

            if (headers) {
                options.headers = headers;
            }

            var req = https.request(options, function (t) {
                console.log(req);
                // Logger.debug(typeof req!== 'undefined'? req:null,t);
                t.on('data', function (chunk) {
                    str += chunk;
                });
                t.on('end', function () {
                    if (callback)
                        callback(false, str);
                });
                t.on('error', function (err) {
                    Logger.error(typeof req !== 'undefined' ? req : null, err);
                    if (callback)
                        callback(err, err);
                })
            });

            req.on('error', function (err) {
                Logger.error(typeof req !== 'undefined' ? req : null, err);
                if (callback)
                    callback(err, err);
            });
            req.write(data);
            req.end();

        },
        post: function (host, path, data, callback) {
            this.postWithHeaders(host, path, data, null, callback);
        },
        getWithHeaders: function (host, path, headers, callback) {
            var options = {
                host: host,
                path: path
            };
            if (headers) {
                options.headers = headers;
            }
            https.get(options, function (res) {
                var body = '';
                res.on('data', function (chunk) {
                    body += chunk;
                });
                res.on('end', function () {
                    //console.log(body);
                    if (callback) {
                        callback(undefined, body);
                    }
                });
            }).on('error', function (e) {
                console.log("Got error: " + e.message);
                if (callback) {
                    callback(e)
                }
            });



        },
        get: function (host, path, callback) {
            this.getWithHeaders(host, path, undefined, callback);
        },
        put: function (host, path, data, callback) {
            this.putWithHeaders(host, path, data, null, callback)
        },
        putWithHeaders: function (host, path, data, headers, callback) {
            if (typeof data != 'string')
                data = JSON.stringify(data);

            var str = '';
            var options = {
                host: host,
                path: path,
                method: 'PUT',
                headers: {
                    'Content-Length': Buffer.byteLength(data),
                    'content-type': 'application/json'
                }
            };

            if (headers) {
                options.headers = headers;
            }

            var req = https.request(options, function (t) {
                // Logger.debug(typeof req!== 'undefined'? req:null,t);
                t.on('data', function (chunk) {
                    str += chunk;
                });
                t.on('end', function () {
                    if (callback)
                        callback(false, str);
                });
                t.on('error', function (err) {
                    Logger.error(typeof req !== 'undefined' ? req : null, err);
                    if (callback)
                        callback(err, err);
                })
            });

            req.on('error', function (err) {
                Logger.error(typeof req !== 'undefined' ? req : null, err);
                if (callback)
                    callback(err, err);
            });
            req.write(data);
            req.end();

        }
    }
}

module.exports = req();