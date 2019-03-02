/*
	Requirements:
	1. Connection to RabbitMQ via amqplib
	2. Create a Channel
	3. Create an Exchange
	4. Create a Queue
	5. Bind Exchange to the Queue
	6. Consume data from the queue
*/
const amqplib = require('amqplib');
const queueName = 'test-q';
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
const createQueue = () =>{
	console.log('creating queue...');
	return channel.assertQueue(queueName);
};
const bindExQueue = () => {
	console.log('binding exchange to queue...');
	return channel.bindQueue(queueName,exchangeName,''); //3rd parameter = routing key
};
const consumeMessages = () =>{
	console.log('consuming...');
	channel.consume(queueName, (message)=>{
		if(!message) { return; }		
		console.log(message.content.toString()); //note: message.content is a buffer
		channel.ack(message);
	});
};

// Server promise chain
const server = 'amqp://admin:password@localhost//test-app';
amqplib.connect(server)
	.then(createChannel)
	.then(createExchange)
	.then(createQueue)
	.then(bindExQueue)
	.then(consumeMessages)
	.then(undefined, reportError);

