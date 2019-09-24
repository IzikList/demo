var nodemailer = require("nodemailer");
const fs = require('fs');
const emails = {
    email1html: '',
    email2html: '',
    email3html: 'trtrtr',
    email4html: '',

}


function readFiles() {
    readFile(__dirname + '/mail_investor_1.txt', 'email1html');
    readFile(__dirname + '/mail_investor_2.txt', 'email2html');
    readFile(__dirname + '/mail_policy_1.txt', 'email3html');
    readFile(__dirname + '/mail_policy_2.txt', 'email4html');
}

function readFile(fileName, varName) {
    console.log('email3html  = ' + emails['email3html']);
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) throw err;
        console.log('OK: ' + fileName);
        console.log(data)
        emails[varName] = data;
    });

}

readFiles();

function emailUtils() {

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'izik@listsettlements.com',
            clientId: '20354172772-dfngj116iqftp2mjv0u5vd35crrjiq4s.apps.googleusercontent.com',
            clientSecret: 'LzO55hPMzA0qc-SVmqf7DXSY',
            refreshToken: '1/hrtUONtW4v28nbciQpZdOWNkDoeybTTg-YdpEko8hRY',
            accessToken: 'ya29.GltZB6QcKNuspsA0q4kyw8u6kwFAwOREgYlBy7AYWbPY3cHSFUkDjMOMo_alLrfPdgGsQzqGw5nWGjNG1hneeXRWM-yR7GWF9Rke3618NdNzHfPwyqLxLSyg3d0m'
        }
    });


    function makeEmail(from, to, subject, text, html) {
        console.log(from, to, subject, text, html);
        return {
            from,
            to,
            subject,
            text,
            html: html
        }
    }

    const sender = 'LiST <invoice@listsettlements.com>' // 'LiST <izik@listsettlements.com>'; // 'LiST <invoice@listsettlements.com>';

    function sendAlarmEmail(txt) {
        let mail = makeEmail(sender, 'yaakovb@listsettlements.com', 'Someone registered', txt);
        send(mail);
    }

    function sendEmail1(to, name) {
        let txt = emails.email1html.replace('Hi Yaakov,', 'Hi ' + name + ',');
        let mail = makeEmail(sender, to, name + ', Wolcome to LiST', '', txt);
        send(mail);
    }
    function sendEmail2(to, name) {
        let txt = emails.email2html.replace('Hi Yaakov,', 'Hi ' + name + ',');
        let mail = makeEmail(sender, to, name + ', Wolcome to LiST', '', txt);
        send(mail);
    }
    function sendEmail3(to, name) {
        let txt = emails.email3html.replace('Hi Yaakov,', 'Hi ' + name + ',');
        let mail = makeEmail(sender, to, name + ', Wolcome to LiST', '', txt);
        send(mail);
    }
    function sendEmail4(to, name) {
        let txt = emails.email4html.replace('Hi Yaakov,', 'Hi ' + name + ',');
        let mail = makeEmail(sender, to, name + ', Wolcome to LiST', '', txt);
        send(mail);
    }

    function send(mail) {
        transporter.sendMail(mail, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                // see https://nodemailer.com/usage
                console.log("info.messageId: " + info.messageId);
                console.log("info.envelope: " + info.envelope);
                console.log("info.accepted: " + info.accepted);
                console.log("info.rejected: " + info.rejected);
                console.log("info.pending: " + info.pending);
                console.log("info.response: " + info.response);
            }
            transporter.close();
        });
    }


    var mail = {
        from: "LiST <invoice@listsettlements.com>",
        to: "y.modiiin@gmail.com",
        subject: "Registration successful",
        text: "You successfully registered an account at www.mydomain.com",
        html: "<p>You successfully registered an account at www.mydomain.com</p>"
    }



    // transporter.sendMail(mail, function (err, info) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         // see https://nodemailer.com/usage
    //         console.log("info.messageId: " + info.messageId);
    //         console.log("info.envelope: " + info.envelope);
    //         console.log("info.accepted: " + info.accepted);
    //         console.log("info.rejected: " + info.rejected);
    //         console.log("info.pending: " + info.pending);
    //         console.log("info.response: " + info.response);
    //     }
    //     transporter.close();
    // });

    return {
        sendEmail1,
        sendEmail2,
        sendEmail3,
        sendEmail4,
        sendAlarmEmail
    }
}

module.exports = emailUtils();


// /**
//  * @license
//  * Copyright Google Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *     https://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */
// // [START gmail_quickstart]
// const fs = require('fs');
// const readline = require('readline');
// const {google} = require('googleapis');
// const  gmail = google.gmail('v1');



// // If modifying these scopes, delete token.json.
// const SCOPES = [    'https://mail.google.com/',
//     'https://www.googleapis.com/auth/gmail.modify',
//     'https://www.googleapis.com/auth/gmail.compose',
//     'https://www.googleapis.com/auth/gmail.send'
// ];
// const data = {
//     auth: {}
// }
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = 'token.json';

// // Load client secrets from a local file.
// fs.readFile('./credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Gmail API.
//   authorize(JSON.parse(content), listLabels);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//   const {client_secret, client_id, redirect_uris} = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//       client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getNewToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     data.auth = oAuth2Client;
//     callback(oAuth2Client);
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getNewToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error retrieving access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       data.auth = oAuth2Client;
//       callback(oAuth2Client);
//     });
//   });
// }

// /**
//  * Lists the labels in the user's account.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listLabels(auth) {
//   const gmail = google.gmail({version: 'v1', auth});
//   gmail.users.labels.list({
//     userId: 'me',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const labels = res.data.labels;
//     if (labels.length) {
//       console.log('Labels:');
//       labels.forEach((label) => {
//         console.log(`- ${label.name}`);
//       });
//     } else {
//       console.log('No labels found.');
//     }
//   });
// }

// function makeBody(to, from, subject, message) {
//     var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
//         "MIME-Version: 1.0\n",
//         "Content-Transfer-Encoding: 7bit\n",
//         "to: ", to, "\n",
//         "from: ", from, "\n",
//         "subject: ", subject, "\n\n",
//         message
//     ].join('');

//     var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
//         return encodedMail;
// }

// function sendMessage(auth) {
//     var raw = makeBody('izik@listsettlements.com', 'y.modiiin@gmail.com', 'test subject', 'test message');
//     gmail.users.messages.send({
//         auth: auth,
//         userId: 'me',
//         resource: {
//             raw: raw
//         }
//     }, function(err, response) {
//         res.send(err || response)
//     });
// }

// // [END gmail_quickstart]

// module.exports = {
//   SCOPES,
//   listLabels,
//   makeBody,
//   sendMessage,
//   data
// };