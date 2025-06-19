const { kafka } = require("./client");
const groupId = process.argv[2]
async function init(){
    const consumer = kafka.consumer({
        groupId
    });

    await consumer.connect();
    await consumer.subscribe({
        topic: 'rider-updates',
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log(`Message Received :::: ${topic} : PARTITION: ${partition}, message: `,message.value.toString())
        }
    })

}

init()