/*
	Note: The sender only needs to know about the exhange
*/
const amqplib = require('amqplib');
const exchangeName = 'test-exchange'; //any*
const exchangeType = 'direct';
let connection;
let channel;

// Functions
const reportError = (error) => {
	console.log(error.stack);
	process.exit(1);
};
const createChannel = (conn) => {
	console.log('Connected to RabbitMQ... Establishing connection...');
	connection = conn;
	return connection.createChannel(); //returns promise
};
const createExchange = (chan) =>{
	channel = chan;
	return channel.assertExchange(exchangeName, exchangeType);
};

const sendMessage = () =>{
	console.log('sendMessage...');
	const passedMsg = process.argv[2];
	const msg = new Buffer(passedMsg);
	channel.publish(exchangeName,'',msg);
	return channel.close();  //return a promise
};

// Server promise chain
const server = 'amqp://admin:password@localhost//test-app';
amqplib.connect(server)
	.then(createChannel)
	.then(createExchange)
	.then(sendMessage)
	.then(process.exit, reportError); //send process.exit method reference for later invocation

