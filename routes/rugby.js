'use strict';
//var MongoClient = require('mongodb').MongoClient;
//var DB_CONN_STR = 'mongodb://localhost:27017/';
var mongodb = require('mongodb');
var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var connect = require('connect');
var http = require('http');
var debug = require('debug')('wh');
var app = connect();
var format = function (input) { return JSON.stringify(input, null, 2); };
var port = 8888;

// Parse JSON requests into `req.body`.
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Print all incoming requests, then respond to them.
app.use(function (req, res) {
    //   debug('incoming webhook', req.method, req.url, format(req.body.after));
    //   debug('incoming webhook', req.method, req.url, format(req.body.commits));
    console.log('repository name :', req.body.repository.name);
    console.log('repository ID :', req.body.repository.id);
    console.log('pusher name :', req.body.pusher.name);
    console.log('before ID :', req.body.before);
    console.log('after ID :', req.body.after);
    console.log('date :', req.body.head_commit.timestamp);
    res.end('OK\'');

    var repositoryName = req.body.repository.name;
    var repositoryID = req.body.repository.id;
    var pusherName = req.body.pusher.name;
    var beforeID = req.body.before;
    var afterID = req.body.after;
    var dateTime = req.body.head_commit.timestamp;

    var db = new mongodb.Db('webhook', mongodbServer);

    db.open(function () {
        /* Select 'contact' collection */
        db.collection('rugby', function (err, collection) {
            /* Insert a data */
            collection.insert({
                repositoryName: req.body.repository.name,
                repositoryID: req.body.repository.id,
                pusherName: req.body.pusher.name,
                beforeID: req.body.before,
                afterID: req.body.after,
                dateTime: req.body.head_commit.timestamp
            }, function (err, data) {
                if (data) {
                    console.log('完成插入');
                } else {
                    console.log('Failed to Insert');
                }
            });
        });
    });


});

// create node.js http server and listen on port 3009
var server = http.createServer(app);
server.on('error', function (err) {
    debug('server error', err);
});
server.listen(port, function () {
    debug('Respoke webhook server is listening on port', port);
});
