import { createConsumer } from '@pkg/kafka';
import { Topics } from '@pkg/kafka/topics';

async function main() {
    const consumer = await createConsumer('main-worker');
    await consumer.subscribe({ topic: Topics.ZapEvents, fromBeginning: true });
    await consumer.run({
        autoCommit:false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value?.toString(),
            });
            await consumer.commitOffsets([{ 
                topic:Topics.ZapEvents,
                partition:partition, 
                offset: (Number(message.offset) + 1).toString() }]);
        }           
    });
    
}   
main();