var rabbit = require("wascally");
var config = require("./config.json");

rabbit.configure(config)
  .then(function(){
    rabbit.handle("a.request", handleMessage);
    rabbit.startSubscription("rpc-req-q");
  })
  .then(undefined, reportError);

function reportError(err){
  console.log(err.stack);
  process.exit();
}

function handleMessage(msg){
  var body = msg.body;
  console.log("received a message");
  console.log(body);
  msg.reply({
    decrypted: body.encrypted
  });
}