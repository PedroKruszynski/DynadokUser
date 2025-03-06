import {
  Kafka, Producer, Consumer, Partitioners,
} from 'kafkajs';
import config from '@shared/environment';

class KafkaConnection {
  private kafka: Kafka;

  private producer: Producer;

  private consumer: Consumer | null = null;

  constructor() {
    this.kafka = new Kafka({
      clientId: config.kafka.clientId,
      brokers: config.kafka.brokers,
    });

    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });
  }

  async connectProducer(): Promise<Producer> {
    await this.producer.connect();
    return this.producer;
  }

  async connectConsumer(groupId: string): Promise<Consumer> {
    this.consumer = this.kafka.consumer({ groupId });
    await this.consumer.connect();
    return this.consumer;
  }

  getProducer(): Producer {
    return this.producer;
  }

  getConsumer(): Consumer | null {
    return this.consumer;
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    if (this.consumer) {
      await this.consumer.disconnect();
    }
  }
}

export default new KafkaConnection();
