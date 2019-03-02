To have launchd start rabbitmq now and restart at login:
  brew services start rabbitmq
Or, if you don't want/need a background service you can just run:
  rabbitmq-server

== RabbitMQ ==
Channel oriented queue system based on AMQP.NODE specification

== Dictionary ==
Connections -> Expensive via TCP
Channel -> Where the work is done (wrapper, with AMP Protocol)
Exchange -> Message Router
Flow: Message -> Exchange -> Queue -> Delivered
Queue -> Message Inbox where messages pile-up
Binding between Exchange and a Queue
Virtual Hosts - Application sandbox

== Access the Management Interface ==
http://localhost:15672/#/

== Add CTL to PATH (global commands) ==
$ export PATH=/usr/local/sbin:$PATH

== Getting Started ==
1. Create a VHOST and a USER
2. Grant USER permissions to access that VHOST
3. Create a queue and setup a binding to an exchange
	Durability: durable *(allow the queue to keep restart automatically when the server is down)
	Name: 'test-q'
4. Setup an exchange
	amq.direct *(simple exchange type)
5. Bind to 'test-q'
6. Publish a Message through the queue's exchange
*Please note that this the binding between the queue and the exchange does not have a binding key
	Delivery Method: Persistent (will survive the server going down)
	Payload: 'test'

7.Check for messages in the queue
	There is 1 ready message, but 0 acknowledged (ie. the message has been processed)
	Message will be deleted from the queue after being acknowledged

8. Open queue to analyze the message
	Consumers -> applications waiting for the messages
	Bindings -> 1 binding to the AMQ Direct	Exchange
	Get messages > Requeue -> behavior after a message is taken out of the queue to analyze

9. By clicking GET Message, it will just clear the queue by poping out the 1 message

10. Deliver a message through an exchange to this queue..

11. Public Message -> Set a routing key in the AMQ.DIRECT exchange, add some payload
	Message published, but not routed. 

12. Add another queue (in order to use routing keys..)
	Go to the exchange, pick AMQ.DIRECT and setup a binding with a routing key
	Publish a message with a routing key. Check which queue has the message being dropped on

== AMQP NodeJS RabbitMQ Connecting Library ==
Low level driver for RabbitMQ


== CLI via rabbitmqctl ==
> rabbitmqctl add_user "test" "password"
> rabbitmqctl add_vhost "/test-app"
> rabbitmqctl set_permissions -p '/test-app' 'admin' '.*' '.*' '.*'
> rabbitmqctl set_user_tags 'admin' 'Management'

== Consumers ==

== Senders ==
Please do note that the senders only know about exchanges, they don't know about queues. Queues are on the consumer/receiver side.

== Abstractions to Work With ==
RabbitMQ
	AMQ
		AMQLib.Node
			Wascally (interface code)

== Consumer Not Receiving the Message ==
If a consumer dies before acknowledging the message (ie, not consuming anymore), the message is brought up to a ready state again to be consumed (even if the consumer which died has consumed the message).
Note: If you dont aknowledge, the receiver will be getting the message again at all times

> Best practice: Only acknowledge the consumed message after all processing has been completed.

== Architecture ==
[ RabbitMQ] >>> amqp connection >>> hosts
[ RabiitMQ]	>>> amqp lib [ interface: wascally] >>> hosts

== RPC == 
Remote Procedure Calls via RabbitMQ
Wascally creates response queues -> Queue 4bf8f7f0-b544-11e6-a042-3b515d14db9f.response.queue in virtual host /test-app
These are reply queues (with gui names as prefix).

www.enterpriseintegrationpatterns.com
Messaging patterns and practices for enterprise apps.

REQUEST <-> REPLY (analogous to browser communication with a web server on GET operations)

[ REQUESTOR ] ->>>> request (via queue Exchange) >>>>>> [ REPLIER ] 
						<<<<<	reply (via queue Exchange) <<<<<<< 

*Usually via a correlation ID
AMQP does not provide an interface to easily use correlation ID's.
Wascally setups a reply-to queue every time a message is send via an exchange queue.
Used commonly for 2 node processes to exchange information.

== Sending Emails ==
MandrillApp



				
