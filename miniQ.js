var uuid = require('uuid');

var messageHideInterval = 60000; //milli seconds

function miniQ() {
    this.message_map = {};
    this.processing_map = {};
    this.addMessage = function (message_string) {
        var id = uuid.v4();
        this.message_map[id] = message_string;
        return id;
    }
    this.getMessages = function () {
        var return_message_map = {};
        for (var each_key in this.message_map) {
            this.processing_map[each_key] = this.message_map[each_key];
            delete this.message_map[each_key];
            return_message_map[each_key] = this.processing_map[each_key];
            this.returnMessage(each_key);
        }
        return return_message_map;
    }
    this.returnMessage = function (id) {
        var context = this;
        setTimeout(function () { if (id in context.processing_map) { context.message_map[id] = context.processing_map[id] }; delete context.processing_map[id]; }, messageHideInterval);
    }
    this.deleteMesage = function (id) {
        return (delete this.processing_map[id]) || (delete this.message_map[id]);
    }
}

module.exports = miniQ;