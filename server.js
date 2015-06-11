var restify = require('restify');
var miniQ = require('./miniQ.js');

var miniQ_obj = new miniQ();

var port = process.env.port || 1337;

var server = restify.createServer({
    name: 'miniQ',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/messages', function (req, res, next) {
    res.send(miniQ_obj.getMessages());
    return next();
});

server.post('/messages', function (req, res, next) {
    res.send(miniQ_obj.addMessage(req.params.message));
    return next();
});

server.del('/message/:id', function (req, res, next) {
    res.send(miniQ_obj.deleteMesage(id));
    return next();
});

server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
});