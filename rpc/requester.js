var rabbit = require("wascally");
var config = require("./config.json");

const sendMessage = () =>{
	//rabbit.request returns a promise object
  return rabbit.request("rpc-req-ex", {
    type: "a.request",
    routingKey: "",
    body: {
      encrypted: "code"
    }
  });
};

const handleReply = (reply) =>{
	reply.ack();
	console.log('reply received: ', reply.body);

};


rabbit.configure(config)
  .then(sendMessage)
  .then(handleReply)
  .then(undefined, reportError);


function reportError(err){
  console.log(err.stack);
  process.exit();
}