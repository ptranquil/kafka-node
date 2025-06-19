const { kafka } = require("./client");

async function init(){
    const admin = kafka.admin();

    console.log('connecting.... admin')
    await admin.connect();
    console.log('admin connected!!!')

    await admin.createTopics({
        topics:[{
            topic: 'rider-updates',
            numPartitions: 2
        }]
    })

    console.log('Topic creation successfull [rider-updates]')
    console.log('disconnecting admin')
    await admin.disconnect();

}

init()