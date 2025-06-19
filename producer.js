const { kafka } = require("./client");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init(){
    const producer = kafka.producer();

    console.log('Connecting.... to kafka')
    await producer.connect()
    console.log('Kafka connection successfull!!')

    
    rl.setPrompt('> ')
    rl.prompt();
    
    rl.on("line", async function (line) {
        const [riderName, location] = line.split(' ');
        // console.log('Sending messages.......')
        await producer.send({
            topic: 'rider-updates',
            messages:[
                {
                    partition: location.toLowerCase() === 'north' ? 0 : 1,
                    key: 'location-updates' ,
                    value: JSON.stringify({
                        name: riderName,
                        location
                    })
                }
            ]
        })
    }).on("close", async function (){
        console.log('disconnecting producer..')
        await producer.disconnect();
    })

}

init()