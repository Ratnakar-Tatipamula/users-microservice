const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Kafka,  Partitioners } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'kafka-nodejs-starter',
    brokers: ['localhost:9092'],
  });

  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  })
  
// Send an event to the demoTopic topic


// Disconnect the producer once we're done


const consumer = kafka.consumer({ groupId: 'test-group' })





router.get('/allUsers', async(req, res) => {
     await consumer.connect()
    await consumer.subscribe({ topic: 'notifications', fromBeginning: true })
   
    User.find({}).then(async(users) => {
        res.json(users);
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
              console.log({
                value: message.value.toString(),
              })
            },
          });
    }).catch((err) => {
        throw err
    })
})

router.post('/addUser',async function(req, res){
    await producer.connect()
   
// Connect to the producer
    const new_user = req.body;
    const user_instance = new User(new_user);
    user_instance.save().then(async(newUser) => {
        res.json("New User has been added");
        await producer.send({
            topic: 'notifications',
            messages: [
              { value: newUser.name },
            ],
          });
          await producer.disconnect();
    }).catch((err) => {
        throw err
    })   
});

module.exports = router;