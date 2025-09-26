import { createConsumer } from '@pkg/kafka';
import { Topics } from '@pkg/kafka/topics';
import { executeZapRun } from '@pkg/core';

async function main() {
    const consumer = await createConsumer('main-worker');
    await consumer.subscribe({ topic: Topics.ZapEvents, fromBeginning: true });
    
    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const zapRunId = message.value?.toString();
                
                if (!zapRunId) {
                    console.error('Received message with no value');
                    return;
                }
                
                console.log(`Processing ZapRun: ${zapRunId}`);
                
                // Execute the actual workflow
                const result = await executeZapRun(zapRunId);
                console.log(`Successfully processed ZapRun: ${zapRunId}`, result);
                
                // Commit the offset to mark message as processed
                await consumer.commitOffsets([{ 
                    topic: Topics.ZapEvents,
                    partition: partition, 
                    offset: (Number(message.offset) + 1).toString() 
                }]);
                
            } catch (error) {
                console.error('Error processing message:', error);
                // Don't commit offset on error - message will be retried
            }
        }           
    });
}   
main();