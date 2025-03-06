import config from '@shared/environment';
import KafkaConnection from '@shared/infra/kafka';

async function startConsumer() {
  console.log('Kafka Consumer is starting...');

  const consumer = await KafkaConnection.connectConsumer(config.kafka.consumerGroup);

  await Promise.all(
    config.kafka.topics.map(async (topicFromEnv) => {
      await consumer.subscribe({ topic: topicFromEnv, fromBeginning: true });
    }),
  );

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `
        [Kafka] Received message from topic ${topic} - partition ${partition}:`,
        message.value?.toString(),
      );
    },
  });
}

startConsumer().catch((error) => {
  console.error('Error in Kafka Consumer:', error);
});
