// node js
var fs = require('fs');
var http = require('./requestsec.js');
// path = require('path'),    
// filePath = path.join(__dirname, 'start.html');

// upload file
// console.log(process.argv[3]);
var inFile = process.argv[2];

fs.readFile(inFile, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
        console.log('received data: ' + data);
        const js = csvJSON(data);
        // output file
        var outFile = process.argv[3];
        fs.writeFile(outFile, js, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");

            upload(JSON.parse(js));
        });

    } else {
        console.log(err);
    }
});




function csvJSON(csv) {

    var lines = csv.split("\n");

    var result = {};

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var obj = [];
        var currentline = lines[i].split(",");
        result[currentline[0]] = obj;

        for (var j = 1; j < headers.length; j++) {
            const providor = currentline[j];
            if(providor)
                obj.push(providor.replace('"', ''));
        }
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

upload = function (json) {
    http.post('localhost:8080', '/api/providors/addAll', json, function(a, b){
        console.log(a, b);
    })
}