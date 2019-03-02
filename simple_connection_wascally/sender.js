var rabbit = require("wascally");
var config = require("./config.json");

rabbit.configure(config)
  .then(function(){
    rabbit.publish("crypto-ex.1", {
      type: "crypto.message.type",
      routingKey: "",
      body: {
        encrypted: "code"
      }
    });
    console.log('message sent via wascally');    
  })
  .then(undefined, reportError);

function reportError(err){
  console.log(err.stack);
  process.exit();
}